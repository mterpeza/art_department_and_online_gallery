import { useEffect, useRef } from "react";
import { trackScrollDepth } from "../utils/analytics";

const MILESTONES = [25, 50, 75, 90];

/**
 * Fires a `scroll_depth` GA4 event at 25%, 50%, 75%, and 90% scroll milestones.
 * Milestones reset when `pagePath` changes (i.e., on route navigation).
 *
 * @param {string} pagePath - current route pathname, used to reset milestones on navigation
 */
export function useScrollDepth(pagePath) {
  const firedRef = useRef(new Set());

  // Reset fired set on page change
  useEffect(() => {
    firedRef.current = new Set();
  }, [pagePath]);

  useEffect(() => {
    const handleScroll = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const docHeight = doc.scrollHeight - doc.clientHeight;
      if (docHeight <= 0) return;

      const pct = Math.floor((scrollTop / docHeight) * 100);

      for (const milestone of MILESTONES) {
        if (pct >= milestone && !firedRef.current.has(milestone)) {
          firedRef.current.add(milestone);
          trackScrollDepth(milestone, pagePath);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pagePath]);
}
