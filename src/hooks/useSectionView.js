import { useEffect } from "react";
import { trackSectionView } from "../utils/analytics";

/**
 * Fires a `section_view` GA4 event once when the element attached to `ref`
 * scrolls into view (at least 30% visible). Fires at most once per mount.
 *
 * @param {React.RefObject} ref - ref attached to the section DOM element
 * @param {string} sectionName - human-readable section identifier
 * @param {string} page - current pathname (e.g. "/", "/portfolio")
 */
export function useSectionView(ref, sectionName, page) {
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trackSectionView(sectionName, page);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, sectionName, page]);
}
