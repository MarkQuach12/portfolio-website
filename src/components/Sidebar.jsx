import { profile, sections } from "../data/profile";

export default function Sidebar({ activeId, onCollapse, onNavigate }) {
  return (
    <aside className="side" aria-label="Page sections">
      <nav className="sidebar">
        <div className="sb-head">
          <span>
            <span className="sb-avatar">{profile.name[0]}</span>
            {profile.name}
          </span>
          <button className="btn btn-ghost" onClick={onCollapse} aria-label="Collapse sidebar" title="Collapse sidebar">
            «
          </button>
        </div>
        <div className="sb-label">Portfolio</div>
        {sections.map((s) => (
          <a
            key={s.id}
            className="sb-item"
            href={`#${s.id}`}
            aria-current={activeId === s.id ? "true" : undefined}
            onClick={onNavigate}
          >
            <span className="sb-emoji" aria-hidden="true">{s.emoji}</span>
            {s.label}
          </a>
        ))}
        <div className="sb-label">Elsewhere</div>
        <a className="sb-item" href={profile.github.url} target="_blank" rel="noreferrer">
          <span className="sb-emoji" aria-hidden="true">🐙</span>GitHub
        </a>
        <a className="sb-item" href={profile.linkedin.url} target="_blank" rel="noreferrer">
          <span className="sb-emoji" aria-hidden="true">🔗</span>LinkedIn
        </a>
        <div className="sb-foot caption">{profile.location}</div>
      </nav>
    </aside>
  );
}
