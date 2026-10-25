// Pure helpers that turn Notion API objects into the compact JSON the site renders.

const NOTION_COLORS = new Set(["gray", "brown", "orange", "yellow", "green", "blue", "purple", "pink", "red"]);

export function tagColor(color) {
  return NOTION_COLORS.has(color) ? color : "gray";
}

export function plainText(richText = []) {
  return richText.map((t) => t.plain_text).join("");
}

export function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function simplifyRichText(richText = []) {
  return richText.map((t) => {
    const span = { text: t.plain_text };
    const href = t.href ?? t.text?.link?.url;
    if (href) span.href = href;
    const a = t.annotations ?? {};
    for (const key of ["bold", "italic", "strikethrough", "underline", "code"]) {
      if (a[key]) span[key] = true;
    }
    if (a.color && a.color !== "default") span.color = a.color;
    return span;
  });
}

function findProp(properties, type, namePattern) {
  const entries = Object.entries(properties).filter(([, p]) => p.type === type);
  if (namePattern) {
    const named = entries.find(([name]) => namePattern.test(name));
    if (named) return named[0];
  }
  return entries[0]?.[0];
}

/** Picks which database properties hold each post field, by type and name. */
export function detectSchema(properties) {
  const published =
    findProp(properties, "checkbox", /publish/i) ??
    findProp(properties, "status", /status/i) ??
    findProp(properties, "select", /status/i);
  return {
    title: findProp(properties, "title"),
    date: findProp(properties, "date", /date|publish/i),
    slug: Object.keys(properties).find((n) => /slug/i.test(n) && properties[n].type === "rich_text"),
    summary: Object.keys(properties).find(
      (n) => /summary|description|excerpt/i.test(n) && properties[n].type === "rich_text",
    ),
    tags: findProp(properties, "multi_select", /tag/i),
    published,
    publishedType: published ? properties[published].type : undefined,
  };
}

/** Query filter that keeps only published pages, or undefined to include all. */
export function publishedFilter(schema) {
  const { published, publishedType } = schema;
  if (!published) return undefined;
  if (publishedType === "checkbox") return { property: published, checkbox: { equals: true } };
  return { property: published, [publishedType]: { equals: "Published" } };
}

export function pageToPost(page, schema) {
  const p = page.properties;
  const title = plainText(p[schema.title]?.title) || "Untitled";
  const slug = slugify(plainText(p[schema.slug]?.rich_text)) || slugify(title) || page.id.replace(/-/g, "");
  return {
    id: page.id,
    slug,
    title,
    date: p[schema.date]?.date?.start ?? page.created_time.slice(0, 10),
    summary: plainText(p[schema.summary]?.rich_text),
    tags: (p[schema.tags]?.multi_select ?? []).map((t) => ({ label: t.name, color: tagColor(t.color) })),
    icon: page.icon?.type === "emoji" ? page.icon.emoji : null,
  };
}

/**
 * Converts one Notion block (with `children` already attached) to a compact block.
 * `resolveImage(block)` returns the URL to render for image blocks.
 * Returns null for block types the site does not render.
 */
export async function simplifyBlock(block, resolveImage) {
  const data = block[block.type] ?? {};
  const children = block.children?.length
    ? (await Promise.all(block.children.map((c) => simplifyBlock(c, resolveImage)))).filter(Boolean)
    : undefined;
  const base = (type, extra = {}) => ({ type, ...extra, ...(children ? { children } : {}) });

  switch (block.type) {
    case "paragraph":
    case "bulleted_list_item":
    case "numbered_list_item":
    case "quote":
    case "toggle":
      return base(block.type, { text: simplifyRichText(data.rich_text) });
    case "heading_1":
    case "heading_2":
    case "heading_3":
      return base(data.is_toggleable ? "toggle" : block.type, { text: simplifyRichText(data.rich_text) });
    case "to_do":
      return base("to_do", { text: simplifyRichText(data.rich_text), checked: Boolean(data.checked) });
    case "callout":
      return base("callout", {
        text: simplifyRichText(data.rich_text),
        icon: data.icon?.type === "emoji" ? data.icon.emoji : "💡",
        color: data.color?.replace(/_background$/, ""),
      });
    case "code":
      return { type: "code", code: plainText(data.rich_text), language: data.language };
    case "divider":
      return { type: "divider" };
    case "image":
      return { type: "image", src: await resolveImage(block), caption: simplifyRichText(data.caption) };
    case "bookmark":
    case "embed":
    case "link_preview":
      return data.url ? { type: "bookmark", url: data.url } : null;
    case "table":
      return {
        type: "table",
        header: Boolean(data.has_column_header),
        rows: (block.children ?? []).map((row) => row.table_row.cells.map(simplifyRichText)),
      };
    case "column_list":
    case "column":
    case "synced_block":
      return children ? { type: "group", children } : null;
    default:
      return null;
  }
}
