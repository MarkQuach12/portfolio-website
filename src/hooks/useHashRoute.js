import { useEffect, useState } from "react";

/** Returns the post slug for `#/writing/<slug>`, or null on the home page. */
function parse() {
  const match = window.location.hash.match(/^#\/writing\/([^/?#]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

export function useHashRoute() {
  const [postSlug, setPostSlug] = useState(parse);

  useEffect(() => {
    const onChange = () => setPostSlug(parse());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return postSlug;
}
