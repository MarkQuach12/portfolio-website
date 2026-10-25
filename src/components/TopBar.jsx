import { profile } from "../data/profile";

export default function TopBar({ crumb, theme, onToggleTheme, onOpenSidebar }) {
  return (
    <div className="topbar">
      <button className="btn btn-ghost open-sidebar" onClick={onOpenSidebar} aria-label="Open sidebar" title="Open sidebar">
        »
      </button>
      <div className="crumbs">
        <span aria-hidden="true">{profile.icon}</span>
        <a href="#">{profile.name}</a>
        {crumb && (
          <>
            <span className="sep">/</span>
            <span className="muted">{crumb}</span>
          </>
        )}
      </div>
      <div className="right">
        <button className="btn" onClick={onToggleTheme} aria-label="Toggle colour theme">
          ◐ {theme === "dark" ? "Light" : "Dark"}
        </button>
      </div>
    </div>
  );
}
