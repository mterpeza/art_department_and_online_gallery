import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CONTACT_MAILTO } from "../utils/contact";
import { trackNavClick, trackContactClick } from "../utils/analytics";

export default function Navbar({ cart = [], theme, toggleTheme, breadcrumb }) {
  const cartCount = Array.isArray(cart) ? cart.length : 0;
  const isDark = theme === "dark";
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuTouchStartRef = useRef(null);

  const activeGlowStyle = isDark
    ? { textShadow: "0 0 10px rgba(108, 235, 228, 0.85)" }
    : undefined;
  const isNavActive = (path) => {
    if (path === "/store") {
      return location.pathname === "/store" || location.pathname === "/shop";
    }
    return location.pathname === path;
  };
  const isHomeActive = location.pathname === "/";

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleMobileMenuTouchStart = (event) => {
    const touch = event.touches[0];
    if (!touch) return;
    mobileMenuTouchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
    };
  };

  const handleMobileMenuTouchEnd = (event) => {
    const start = mobileMenuTouchStartRef.current;
    const touch = event.changedTouches[0];
    mobileMenuTouchStartRef.current = null;
    if (!start || !touch) return;

    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;
    const isUpwardSwipe = deltaY < -40 && Math.abs(deltaY) > Math.abs(deltaX);

    if (isUpwardSwipe) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-white">
      <nav className="container mx-auto grid grid-cols-3 items-center px-4 py-4">
        {/* Left column */}
        <div className="flex items-center">
          {/* Mobile: hamburger */}
          <button
            type="button"
            className="md:hidden flex items-center px-2 py-1 border border-gray-400 dark:border-gray-500 rounded text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:border-gray-600 dark:hover:border-white focus:outline-none"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav-menu"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          {/* Desktop: nav links */}
          <div className="hidden md:flex items-center space-x-5">
            <Link
              className={`transition-colors px-1 text-sm lg:text-base ${isNavActive("/portfolio") ? (isDark ? "text-[#6cebe4] font-bold" : "text-[#ff4000] font-bold") : "hover:text-gray-600 dark:hover:text-gray-300"}`}
              to="/portfolio"
              data-discover="true"
              style={isNavActive("/portfolio") ? activeGlowStyle : undefined}
              onClick={() => trackNavClick("/portfolio", "Portfolio")}
            >
              Portfolio
            </Link>
            <Link
              className={`transition-colors px-1 text-sm lg:text-base ${isNavActive("/about") ? (isDark ? "text-[#6cebe4] font-bold" : "text-[#ff4000] font-bold") : "hover:text-gray-600 dark:hover:text-gray-300"}`}
              to="/about"
              data-discover="true"
              style={isNavActive("/about") ? activeGlowStyle : undefined}
              onClick={() => trackNavClick("/about", "About")}
            >
              About
            </Link>
            <Link
              className={`transition-colors px-1 text-sm lg:text-base ${isNavActive("/store") ? (isDark ? "text-[#6cebe4] font-bold" : "text-[#ff4000] font-bold") : "hover:text-gray-600 dark:hover:text-gray-300"}`}
              to="/store"
              data-discover="true"
              style={isNavActive("/store") ? activeGlowStyle : undefined}
              onClick={() => trackNavClick("/store", "Store")}
            >
              Store
            </Link>
          </div>
        </div>

        {/* Center column: Logo */}
        <div className="flex justify-center">
          <Link
            className={`text-xl lg:text-2xl font-bold transition-colors whitespace-nowrap ${isHomeActive ? (isDark ? "text-[#6cebe4]" : "text-[#ff4000]") : "text-gray-900 dark:text-white hover:text-[#ff4000] dark:hover:text-[#6cebe4]"}`}
            to="/"
            data-discover="true"
            style={isHomeActive ? activeGlowStyle : undefined}
            onClick={() => trackNavClick("/", "Home (Logo)")}
          >
            Mike Terpeza
          </Link>
        </div>

        {/* Right column */}
        <div className="flex items-center justify-end gap-3">
          {/* Mobile: dark mode toggle */}
          <div className="md:hidden">
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  className="sr-only"
                  aria-label="Toggle light and dark mode"
                  type="checkbox"
                  checked={isDark}
                  onChange={toggleTheme}
                />
                <div
                  className={`w-12 h-7 rounded-full shadow-inner transition-all duration-300 ${isDark ? "bg-gray-700" : "bg-gray-300"}`}
                ></div>
                <div
                  className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white text-gray-900 shadow-md transition-all duration-300 flex items-center justify-center ${isDark ? "translate-x-5" : "translate-x-0"}`}
                >
                  {isDark ? (
                    <svg
                      className="w-3.5 h-3.5 text-gray-900"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-3.5 h-3.5 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0M17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </label>
          </div>
          {/* Desktop: cart + contact */}
          <div className="hidden md:flex items-center gap-3">
            {/* Cart hidden until checkout is ready */}
            {/* Tablet: contact icon only */}
            <a
              className={`flex lg:hidden items-center justify-center px-3 py-1.5 rounded transition-colors ${
                isDark
                  ? "bg-[#6cebe4] text-gray-900 hover:bg-gray-200"
                  : "bg-[#ff4000] text-white hover:brightness-95"
              }`}
              href={CONTACT_MAILTO}
              aria-label="Contact"
              style={{
                boxShadow: isDark
                  ? "rgba(108, 235, 228, 0.5) 0px 0px 10px"
                  : "none",
              }}
              onClick={() => trackContactClick("navbar_tablet_icon")}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </a>
            {/* Desktop: full Contact button */}
            <a
              className={`hidden lg:block px-3 py-1 rounded text-sm transition-colors ${
                isDark
                  ? "bg-[#6cebe4] text-gray-900 hover:bg-gray-200"
                  : "bg-[#ff4000] text-white hover:brightness-95"
              }`}
              href={CONTACT_MAILTO}
              style={{
                boxShadow: isDark
                  ? "rgba(108, 235, 228, 0.5) 0px 0px 10px"
                  : "none",
              }}
              onClick={() => trackContactClick("navbar_desktop")}
            >
              Contact
            </a>
          </div>
        </div>
      </nav>
      {isMobileMenuOpen && (
        <div
          id="mobile-nav-menu"
          className={`md:hidden border-t px-4 py-4 ${
            isDark
              ? "border-gray-700 border-b border-[#6cebe4]/70 bg-gray-900/95 shadow-[0_1px_7px_rgba(108,235,228,0.5)]"
              : "border-gray-200 border-b border-[#ff4000]/40 bg-white/95 shadow-[0_1px_7px_rgba(255,64,0,0.25)]"
          }`}
          onTouchStart={handleMobileMenuTouchStart}
          onTouchEnd={handleMobileMenuTouchEnd}
        >
          <div className="flex flex-col gap-3">
            <Link
              className={`transition-colors px-1 py-1 ${isNavActive("/portfolio") ? (isDark ? "text-[#6cebe4] font-bold" : "text-[#ff4000] font-bold") : "hover:text-gray-600 dark:hover:text-gray-300"}`}
              to="/portfolio"
              style={isNavActive("/portfolio") ? activeGlowStyle : undefined}
              onClick={() => trackNavClick("/portfolio", "Portfolio")}
            >
              Portfolio
            </Link>
            <Link
              className={`transition-colors px-1 py-1 ${isNavActive("/about") ? (isDark ? "text-[#6cebe4] font-bold" : "text-[#ff4000] font-bold") : "hover:text-gray-600 dark:hover:text-gray-300"}`}
              to="/about"
              style={isNavActive("/about") ? activeGlowStyle : undefined}
              onClick={() => trackNavClick("/about", "About")}
            >
              About
            </Link>
            <Link
              className={`transition-colors px-1 py-1 ${isNavActive("/store") ? (isDark ? "text-[#6cebe4] font-bold" : "text-[#ff4000] font-bold") : "hover:text-gray-600 dark:hover:text-gray-300"}`}
              to="/store"
              style={isNavActive("/store") ? activeGlowStyle : undefined}
              onClick={() => trackNavClick("/store", "Store")}
            >
              Store
            </Link>
            {/* Cart hidden until checkout is ready */}
            <div className="pt-1">
              <a
                className={`inline-flex w-full items-center justify-center px-3 py-2 rounded text-sm transition-colors ${
                  isDark
                    ? "bg-[#6cebe4] text-gray-900 hover:bg-gray-200"
                    : "bg-[#ff4000] text-white hover:brightness-95"
                }`}
                href={CONTACT_MAILTO}
                style={{
                  boxShadow: isDark
                    ? "rgba(108, 235, 228, 0.5) 0px 0px 10px"
                    : "none",
                }}
                onClick={() => trackContactClick("navbar_mobile")}
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>
      )}
      {/* Dark mode toggle bar (now matches reference HTML) */}
      <div className="hidden md:block py-2 border-t border-gray-200 bg-gray-100 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white">
        <div className="container mx-auto px-3 sm:px-4 flex flex-col gap-2 md:flex-row md:justify-between md:items-center">
          {/* Left: portfolio breadcrumb, fades in when scrolled past the page header */}
          <div
            className="hidden md:flex items-center ml-12"
            style={{
              opacity: breadcrumb ? 1 : 0,
              transition: "opacity 200ms ease",
              pointerEvents: "none",
            }}
            aria-hidden={!breadcrumb}
          >
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#ff4000] dark:text-[#6cebe4] font-semibold truncate">
              {breadcrumb || "\u00A0"}
            </p>
          </div>
          <div className="self-end md:ml-auto md:mr-12">
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  className="sr-only"
                  aria-label="Toggle light and dark mode"
                  type="checkbox"
                  checked={isDark}
                  onChange={toggleTheme}
                />
                <div
                  className={`w-14 h-8 rounded-full shadow-inner transition-all duration-300 ${isDark ? "bg-gray-700" : "bg-gray-300"}`}
                ></div>
                {/* Toggle thumb and icon */}
                <div
                  className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white text-gray-900 shadow-md transition-all duration-300 flex items-center justify-center ${isDark ? "translate-x-6" : "translate-x-0"}`}
                >
                  {isDark ? (
                    <svg
                      className="w-4 h-4 text-gray-900 transition-transform duration-300 rotate-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4 text-yellow-500 transition-transform duration-300 rotate-180"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <span
                className={`ml-3 text-xs font-semibold tracking-wide transition-all duration-300 ${isDark ? "text-yellow-300" : "text-gray-700"}`}
              >
                {isDark ? "Dark Mode" : "Light Mode"}
              </span>
            </label>
          </div>
        </div>
      </div>
    </header>
  );
}
