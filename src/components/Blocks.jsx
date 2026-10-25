export function Tag({ label, color }) {
  return (
    <span className="tag" data-color={color === "gray" ? undefined : color}>
      {label}
    </span>
  );
}

export function Tags({ tags }) {
  return (
    <div className="tags">
      {tags.map((t) => (
        <Tag key={t.label} {...t} />
      ))}
    </div>
  );
}

export function Callout({ icon, color, children }) {
  return (
    <div className="callout" data-color={color}>
      <div className="callout-icon" aria-hidden="true">
        {icon}
      </div>
      <div className="callout-body">{children}</div>
    </div>
  );
}

export function Toggle({ summary, defaultOpen = false, children }) {
  return (
    <details className="toggle" open={defaultOpen}>
      <summary>
        <span>{summary}</span>
      </summary>
      <div className="toggle-body">{children}</div>
    </details>
  );
}

export function SectionHeading({ id, emoji, children }) {
  return (
    <h2 className="h2" id={id}>
      <span aria-hidden="true">{emoji}</span> {children}
    </h2>
  );
}

export function ViewBar({ views, count }) {
  return (
    <div className="viewbar">
      {views.map((v, i) => (
        <span key={v} aria-current={i === 0 ? "true" : undefined}>
          {v}
        </span>
      ))}
      {count && <span className="count">{count}</span>}
    </div>
  );
}

export function BulletList({ items }) {
  return (
    <ul className="list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

/** Table view of role records, with an optional toggle of highlights per record. */
export function RecordTable({ records, firstColumn = "Role", secondColumn = "Company" }) {
  const withHighlights = records.filter((r) => r.highlights?.length);
  return (
    <>
      <ViewBar views={["⊞ Table"]} count={`${records.length} entries`} />
      <div className="table-wrap">
        <table className="db">
          <thead>
            <tr>
              <th><span className="glyph">Aa</span>{firstColumn}</th>
              <th><span className="glyph">≡</span>{secondColumn}</th>
              <th><span className="glyph">#</span>Years</th>
              <th><span className="glyph">◉</span>Tags</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={`${r.role}-${r.org}`}>
                <td>{r.role}</td>
                <td>{r.org}</td>
                <td className="nowrap">{r.years}</td>
                <td><Tags tags={r.tags} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {withHighlights.length > 0 && (
        <div style={{ marginTop: "var(--space-2)" }}>
          {withHighlights.map((r) => (
            <Toggle key={`${r.role}-${r.org}`} summary={`${r.role} · ${r.org}`}>
              <BulletList items={r.highlights} />
            </Toggle>
          ))}
        </div>
      )}
    </>
  );
}
