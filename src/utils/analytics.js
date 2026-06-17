/**
 * Central analytics helpers.
 * All functions are no-ops when GA4 is not loaded (gtag not on window).
 */

/**
 * Fire any GA4 event by name with optional parameters.
 * @param {string} name - GA4 event name
 * @param {object} params - event parameters
 */
export function trackEvent(name, params = {}) {
  if (typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}

/**
 * Track a navigation link click (use GA4 event name "navigation_click").
 * @param {string} destination - the link's target path or label
 * @param {string} [label] - optional human-readable label
 */
export function trackNavClick(destination, label) {
  trackEvent("navigation_click", {
    destination,
    link_text: label || destination,
  });
}

/**
 * Track a homepage portfolio thumbnail click.
 * @param {string} label - thumbnail title ("Artwork/Portfolio", etc.)
 * @param {string} destination - href value
 */
export function trackThumbnailClick(label, destination) {
  trackEvent("portfolio_thumbnail_click", { label, destination });
}

/**
 * Track when a shop product gallery is opened (GA4 "view_item").
 * @param {string} itemId - product id
 * @param {string} itemName - product name
 */
export function trackProductView(itemId, itemName) {
  trackEvent("view_item", {
    items: [{ item_id: itemId, item_name: itemName }],
  });
}

/**
 * Track a contact/inquiry link click.
 * @param {string} context - where the link was clicked ("navbar", "shop_card", etc.)
 */
export function trackContactClick(context) {
  trackEvent("contact_click", { context });
}

/**
 * Track a sticker submission result.
 * @param {string} status - "approved" | "pending" | "rejected" | "error"
 */
export function trackStickerSubmit(status) {
  trackEvent("sticker_submit", { status });
}

/**
 * Track when the user starts drawing on the sticker canvas (first interaction).
 */
export function trackStickerDrawStart() {
  trackEvent("sticker_draw_start");
}

/**
 * Track theme toggle.
 * @param {string} theme - "dark" | "light"
 */
export function trackThemeToggle(theme) {
  trackEvent("theme_toggle", { theme });
}

/**
 * Track scroll depth milestones (25 / 50 / 75 / 90).
 * @param {number} percent - milestone value
 * @param {string} page - current pathname
 */
export function trackScrollDepth(percent, page) {
  trackEvent("scroll_depth", { percent, page });
}

/**
 * Track when a page section scrolls into view.
 * @param {string} sectionName - section identifier
 * @param {string} page - current pathname
 */
export function trackSectionView(sectionName, page) {
  trackEvent("section_view", { section_name: sectionName, page });
}
