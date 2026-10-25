// Pulls published posts from a Notion database into src/content/writing.json.
// Usage: NOTION_TOKEN=... NOTION_WRITING_DATABASE_ID=... npm run sync:writing
import { existsSync, readFileSync } from "node:fs";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { detectSchema, pageToPost, publishedFilter, simplifyBlock } from "./notion-transform.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_FILE = join(ROOT, "src/content/writing.json");
const IMAGE_DIR = join(ROOT, "public/writing");
const API = "https://api.notion.com/v1";
const NOTION_VERSION = "2022-06-28";

loadEnvFile(join(ROOT, ".env.local"));

const token = process.env.NOTION_TOKEN;
const databaseId = process.env.NOTION_WRITING_DATABASE_ID;

if (!token || !databaseId) {
  console.log("[sync:writing] NOTION_TOKEN or NOTION_WRITING_DATABASE_ID not set; keeping existing writing.json.");
  process.exit(0);
}

function loadEnvFile(path) {
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (match && !(match[1] in process.env)) process.env[match[1]] = match[2].replace(/^(['"])(.*)\1$/, "$2");
  }
}

async function notion(path, { method = "GET", body } = {}) {
  for (let attempt = 0; ; attempt++) {
    const res = await fetch(`${API}${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Notion-Version": NOTION_VERSION,
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (res.status === 429 && attempt < 5) {
      const wait = Number(res.headers.get("retry-after") ?? 1) * 1000;
      await new Promise((r) => setTimeout(r, wait));
      continue;
    }
    if (!res.ok) throw new Error(`Notion ${method} ${path} failed: ${res.status} ${await res.text()}`);
    return res.json();
  }
}

async function paginate(fetchPage) {
  const results = [];
  let cursor;
  do {
    const page = await fetchPage(cursor);
    results.push(...page.results);
    cursor = page.has_more ? page.next_cursor : undefined;
  } while (cursor);
  return results;
}

async function fetchBlockTree(blockId) {
  const blocks = await paginate((cursor) =>
    notion(`/blocks/${blockId}/children?page_size=100${cursor ? `&start_cursor=${cursor}` : ""}`),
  );
  for (const block of blocks) {
    // Child pages are separate documents, not part of this post.
    if (block.has_children && block.type !== "child_page") block.children = await fetchBlockTree(block.id);
  }
  return blocks;
}

const EXTENSIONS = { "image/png": ".png", "image/jpeg": ".jpg", "image/gif": ".gif", "image/webp": ".webp", "image/svg+xml": ".svg" };

// Notion-hosted file URLs expire after an hour, so they are downloaded into public/.
function imageResolver(slug) {
  return async (block) => {
    const image = block.image;
    if (image.type === "external") return image.external.url;
    const res = await fetch(image.file.url);
    if (!res.ok) throw new Error(`Image download failed for block ${block.id}: ${res.status}`);
    const type = res.headers.get("content-type")?.split(";")[0];
    const ext = EXTENSIONS[type] ?? (extname(new URL(image.file.url).pathname) || ".png");
    const name = `${block.id.replace(/-/g, "")}${ext}`;
    await mkdir(join(IMAGE_DIR, slug), { recursive: true });
    await writeFile(join(IMAGE_DIR, slug, name), Buffer.from(await res.arrayBuffer()));
    return `/writing/${slug}/${name}`;
  };
}

async function main() {
  const database = await notion(`/databases/${databaseId}`);
  const schema = detectSchema(database.properties);
  const filter = publishedFilter(schema);
  console.log(
    `[sync:writing] Using title="${schema.title}", date="${schema.date ?? "created time"}", ` +
      `published="${schema.published ?? "(all pages)"}".`,
  );

  const pages = await paginate((cursor) =>
    notion(`/databases/${databaseId}/query`, {
      method: "POST",
      body: { page_size: 100, ...(filter ? { filter } : {}), ...(cursor ? { start_cursor: cursor } : {}) },
    }),
  );

  await rm(IMAGE_DIR, { recursive: true, force: true });
  const posts = [];
  const slugs = new Set();
  for (const page of pages) {
    const post = pageToPost(page, schema);
    if (slugs.has(post.slug)) post.slug = `${post.slug}-${page.id.slice(0, 6)}`;
    slugs.add(post.slug);
    const tree = await fetchBlockTree(page.id);
    const resolveImage = imageResolver(post.slug);
    post.blocks = (await Promise.all(tree.map((b) => simplifyBlock(b, resolveImage)))).filter(Boolean);
    posts.push(post);
    console.log(`[sync:writing] ${post.date}  ${post.title}`);
  }

  posts.sort((a, b) => b.date.localeCompare(a.date));
  await mkdir(dirname(OUT_FILE), { recursive: true });
  await writeFile(OUT_FILE, `${JSON.stringify({ syncedAt: new Date().toISOString(), posts }, null, 2)}\n`);
  console.log(`[sync:writing] Wrote ${posts.length} post(s) to src/content/writing.json.`);
}

main().catch((err) => {
  console.error(`[sync:writing] ${err.message}`);
  process.exit(1);
});
