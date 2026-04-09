import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar({ theme, toggleTheme }) {
  const cartCount = 0; // Replace with real cart state
  const isDark = theme === "dark";
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuTouchStartRef = useRef(null);

  const activeGlowStyle = { textShadow: "0 0 10px rgba(108, 235, 228, 0.85)" };
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
    <header className="sticky top-0 z-50 bg-gray-900 text-white">
      <nav className="container mx-auto flex justify-between items-center px-4 py-4 relative">
        {/* Left nav links (desktop) */}
        <div className="hidden md:flex space-x-6">
          <Link
            className={`transition-colors px-1 ${isNavActive("/portfolio") ? "text-[#6cebe4] font-bold" : "hover:text-gray-300"}`}
            to="/portfolio"
            data-discover="true"
            style={isNavActive("/portfolio") ? activeGlowStyle : undefined}
          >
            Portfolio
          </Link>
          <Link
            className={`transition-colors px-1 ${isNavActive("/about") ? "text-[#6cebe4] font-bold" : "hover:text-gray-300"}`}
            to="/about"
            data-discover="true"
            style={isNavActive("/about") ? activeGlowStyle : undefined}
          >
            About
          </Link>
          <Link
            className={`transition-colors px-1 ${isNavActive("/store") ? "text-[#6cebe4] font-bold" : "hover:text-gray-300"}`}
            to="/store"
            data-discover="true"
            style={isNavActive("/store") ? activeGlowStyle : undefined}
          >
            Store
          </Link>
        </div>
        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden flex items-center px-2 py-1 border border-gray-400 rounded text-gray-400 hover:text-white hover:border-white focus:outline-none"
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
        {/* Center logo (absolute, reference style) */}
        <Link
          className={`text-2xl font-bold transition-colors absolute left-1/2 transform -translate-x-1/2 ${isHomeActive ? "text-[#6cebe4]" : "text-white hover:text-[#6cebe4]"}`}
          to="/"
          data-discover="true"
          style={isHomeActive ? activeGlowStyle : undefined}
        >
          Mike Terpeza
        </Link>
        {/* Right controls (mobile) */}
        <div className="md:hidden flex items-center">
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
        {/* Right nav links (desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative">
            <Link
              className="transition-colors hover:text-gray-300"
              aria-label={`Cart with ${cartCount} items`}
              to="/cart"
              data-discover="true"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <span className="absolute -top-2 -right-2 bg-[#6cebe4] text-gray-900 text-xs font-bold rounded-full px-2 py-0.5 shadow-lg">
                {cartCount}
              </span>
            </Link>
          </div>
          <a
            className="px-3 py-1 rounded text-sm transition-colors bg-[#6cebe4] text-gray-900 hover:bg-gray-200"
            href="mailto:mikesartdept@gmail.com?subject=Art%20Inquiry"
            style={{ boxShadow: "rgba(108, 235, 228, 0.5) 0px 0px 10px" }}
          >
            Contact
          </a>
        </div>
      </nav>
      {isMobileMenuOpen && (
        <div
          id="mobile-nav-menu"
          className="md:hidden border-t border-gray-700 border-b border-[#6cebe4]/70 bg-gray-900/95 px-4 py-4 shadow-[0_1px_7px_rgba(108,235,228,0.5)]"
          onTouchStart={handleMobileMenuTouchStart}
          onTouchEnd={handleMobileMenuTouchEnd}
        >
          <div className="flex flex-col gap-3">
            <Link
              className={`transition-colors px-1 py-1 ${isNavActive("/portfolio") ? "text-[#6cebe4] font-bold" : "hover:text-gray-300"}`}
              to="/portfolio"
              style={isNavActive("/portfolio") ? activeGlowStyle : undefined}
            >
              Portfolio
            </Link>
            <Link
              className={`transition-colors px-1 py-1 ${isNavActive("/about") ? "text-[#6cebe4] font-bold" : "hover:text-gray-300"}`}
              to="/about"
              style={isNavActive("/about") ? activeGlowStyle : undefined}
            >
              About
            </Link>
            <Link
              className={`transition-colors px-1 py-1 ${isNavActive("/store") ? "text-[#6cebe4] font-bold" : "hover:text-gray-300"}`}
              to="/store"
              style={isNavActive("/store") ? activeGlowStyle : undefined}
            >
              Store
            </Link>
            <div className="mt-1 flex items-center gap-4 border-t border-gray-700 pt-3">
              <Link
                className="transition-colors hover:text-gray-300"
                aria-label={`Cart with ${cartCount} items`}
                to="/cart"
              >
                Cart ({cartCount})
              </Link>
            </div>
            <div className="pt-1">
              <a
                className="inline-flex w-full items-center justify-center px-3 py-2 rounded text-sm transition-colors bg-[#6cebe4] text-gray-900 hover:bg-gray-200"
                href="mailto:mikesartdept@gmail.com?subject=Art%20Inquiry"
                style={{ boxShadow: "rgba(108, 235, 228, 0.5) 0px 0px 10px" }}
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
