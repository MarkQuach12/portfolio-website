/** Renders the compact block JSON produced by scripts/sync-notion.mjs. */

function RichText({ spans = [] }) {
  return spans.map((s, i) => {
    let node = s.code ? <code className="inline">{s.text}</code> : s.text;
    if (s.bold) node = <strong>{node}</strong>;
    if (s.italic) node = <em>{node}</em>;
    if (s.strikethrough) node = <s>{node}</s>;
    if (s.underline) node = <u>{node}</u>;
    if (s.color) {
      const isBackground = s.color.endsWith("_background");
      const color = s.color.replace(/_background$/, "");
      node = (
        <span
          data-color={color}
          style={isBackground ? { background: "var(--tint)", borderRadius: "var(--radius-sm)" } : { color: "var(--ink)" }}
        >
          {node}
        </span>
      );
    }
    if (s.href) {
      const external = /^https?:/.test(s.href);
      node = (
        <a href={s.href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
          {node}
        </a>
      );
    }
    return <span key={i}>{node}</span>;
  });
}

/** Groups consecutive list items so they render inside one <ul>/<ol>. */
function groupLists(blocks) {
  const out = [];
  for (const block of blocks) {
    const listType = { bulleted_list_item: "ul", numbered_list_item: "ol", to_do: "todo" }[block.type];
    const last = out[out.length - 1];
    if (listType && last?.listType === listType) last.items.push(block);
    else if (listType) out.push({ listType, items: [block] });
    else out.push(block);
  }
  return out;
}

function Children({ blocks }) {
  return blocks?.length ? <NotionBlocks blocks={blocks} /> : null;
}

function Block({ block }) {
  switch (block.type) {
    case "paragraph":
      return (
        <>
          <p className="p">{block.text.length ? <RichText spans={block.text} /> : " "}</p>
          {block.children && <div style={{ paddingLeft: 26 }}><Children blocks={block.children} /></div>}
        </>
      );
    case "heading_1":
      return <h2 className="h2"><RichText spans={block.text} /></h2>;
    case "heading_2":
      return <h3 className="h3"><RichText spans={block.text} /></h3>;
    case "heading_3":
      return <h4 className="h4"><RichText spans={block.text} /></h4>;
    case "quote":
      return (
        <blockquote className="quote">
          <RichText spans={block.text} />
          <Children blocks={block.children} />
        </blockquote>
      );
    case "callout":
      return (
        <div className="callout" data-color={block.color && block.color !== "default" ? block.color : undefined}>
          <div className="callout-icon" aria-hidden="true">{block.icon}</div>
          <div className="callout-body">
            <RichText spans={block.text} />
            <Children blocks={block.children} />
          </div>
        </div>
      );
    case "toggle":
      return (
        <details className="toggle">
          <summary><span><RichText spans={block.text} /></span></summary>
          <div className="toggle-body"><Children blocks={block.children} /></div>
        </details>
      );
    case "code":
      return <pre className="code"><code>{block.code}</code></pre>;
    case "divider":
      return <hr className="divider" />;
    case "image":
      return (
        <figure className="image">
          <img src={block.src} alt={block.caption.map((s) => s.text).join("")} loading="lazy" />
          {block.caption.length > 0 && (
            <figcaption className="caption"><RichText spans={block.caption} /></figcaption>
          )}
        </figure>
      );
    case "bookmark":
      return (
        <p className="p">
          <a href={block.url} target="_blank" rel="noreferrer">{block.url}</a>
        </p>
      );
    case "table":
      return (
        <div className="table-wrap">
          <table className="db">
            <tbody>
              {block.rows.map((cells, r) => (
                <tr key={r}>
                  {cells.map((cell, c) => {
                    const Cell = block.header && r === 0 ? "th" : "td";
                    return <Cell key={c}><RichText spans={cell} /></Cell>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "group":
      return <Children blocks={block.children} />;
    default:
      return null;
  }
}

export default function NotionBlocks({ blocks }) {
  return groupLists(blocks).map((item, i) => {
    if (!item.listType) return <Block key={i} block={item} />;
    const List = item.listType === "ol" ? "ol" : "ul";
    return (
      <List key={i} className="list" style={item.listType === "todo" ? { listStyle: "none", paddingLeft: 2 } : undefined}>
        {item.items.map((li, j) => (
          <li key={j}>
            {item.listType === "todo" && (
              <input type="checkbox" checked={li.checked} readOnly disabled style={{ marginRight: 8 }} />
            )}
            <RichText spans={li.text} />
            <Children blocks={li.children} />
          </li>
        ))}
      </List>
    );
  });
}
