import Cover from "../components/Cover";
import NotionBlocks from "../components/NotionBlocks";
import { Callout, Tags } from "../components/Blocks";
import { formatDate } from "../content/formatDate";

export default function PostPage({ post }) {
  if (!post) {
    return (
      <div className="column" style={{ paddingTop: "var(--space-8)" }}>
        <Callout icon="🔍">
          That post couldn’t be found. <a href="#writing">Back to writing</a>
        </Callout>
      </div>
    );
  }

  return (
    <>
      <Cover />
      <article className="column">
        <div className="page-icon" aria-hidden="true">{post.icon ?? "📄"}</div>
        <h1 className="page-title">{post.title}</h1>
        <div className="post-meta">
          <span className="caption">{formatDate(post.date)}</span>
          {post.tags.length > 0 && <Tags tags={post.tags} />}
        </div>
        {post.summary && <p className="page-subtitle">{post.summary}</p>}
        <hr className="divider" />
        <NotionBlocks blocks={post.blocks} />
        <div className="foot caption">
          <a href="#writing">← All writing</a>
        </div>
      </article>
    </>
  );
}
