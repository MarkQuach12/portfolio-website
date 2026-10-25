import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import { profile, sections } from "./data/profile";
import writing from "./content/writing.json";
import { useActiveSection } from "./hooks/useActiveSection";
import { useHashRoute } from "./hooks/useHashRoute";
import { useTheme } from "./hooks/useTheme";

const sectionIds = sections.map((s) => s.id);
const isMobile = () => window.matchMedia("(max-width: 900px)").matches;

function App() {
  const { theme, toggleTheme } = useTheme();
  const postSlug = useHashRoute();
  const post = postSlug ? writing.posts.find((p) => p.slug === postSlug) : null;
  const activeId = useActiveSection(sectionIds, !postSlug);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.title = postSlug ? `${post?.title ?? "Not found"} · ${profile.name}` : profile.name;
    if (postSlug) window.scrollTo(0, 0);
    // Leaving a post via a section link: the target only exists once the home page renders.
    else if (window.location.hash.length > 1) document.getElementById(window.location.hash.slice(1))?.scrollIntoView();
  }, [postSlug, post]);

  const openSidebar = () => (isMobile() ? setMobileOpen(true) : setCollapsed(false));
  const closeSidebar = () => (isMobile() ? setMobileOpen(false) : setCollapsed(true));

  return (
    <div className="app" data-collapsed={collapsed || undefined} data-mobile-open={mobileOpen || undefined}>
      <Sidebar
        activeId={postSlug ? "writing" : activeId}
        onCollapse={closeSidebar}
        onNavigate={() => setMobileOpen(false)}
      />
      <div className="scrim" onClick={() => setMobileOpen(false)} />
      <main style={{ minWidth: 0 }}>
        <TopBar
          crumb={postSlug ? post?.title ?? "Writing" : "Portfolio"}
          theme={theme}
          onToggleTheme={toggleTheme}
          onOpenSidebar={openSidebar}
        />
        {postSlug ? <PostPage post={post} /> : <HomePage />}
      </main>
    </div>
  );
}

export default App;
