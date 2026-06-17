import React, { useState, useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useScrollDepth } from "./hooks/useScrollDepth";
import { trackThemeToggle } from "./utils/analytics";
// SubNavbar and Footer may need to be created if not present
// import SubNavbar from "./components/SubNavbar";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Checkout from "./pages/Checkout";
import HelloStickers from "./pages/HelloStickers";
import NotFound from "./pages/NotFound";
import ProductPage from "./pages/ProductPage";

// Placeholder components for missing ones
const SubNavbar = () => null;
const gaMeasurementId = process.env.REACT_APP_GA_MEASUREMENT_ID || "";

function RouteScrollManager() {
  const location = useLocation();

  useEffect(() => {
    if (!("scrollRestoration" in window.history)) return undefined;
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    return () => {
      window.history.scrollRestoration = previous;
    };
  }, []);

  useEffect(() => {
    if (location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!gaMeasurementId || typeof window.gtag !== "function") return;
    const pagePath = `${location.pathname}${location.search}${location.hash}`;
    window.gtag("config", gaMeasurementId, { page_path: pagePath });
  }, [location.pathname, location.search, location.hash]);

  useScrollDepth(location.pathname);

  return null;
}

function App() {
  // Theme state and persistence
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark",
  );
  // Green screen easter egg
  const [greenScreen, setGreenScreen] = useState(
    () => localStorage.getItem("greenScreen") === "1",
  );
  // Cart state
  const [cart, setCart] = useState([]);
  // Breadcrumb text surfaced by Portfolio into the Navbar toggle bar
  const [navBreadcrumb, setNavBreadcrumb] = useState(null);
  // Back to Top button
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [backToTopBottom, setBackToTopBottom] = useState(20);
  const footerRef = useRef(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.classList.toggle("green-screen", greenScreen);
    localStorage.setItem("greenScreen", greenScreen ? "1" : "0");
  }, [greenScreen]);

  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 600);

      const footer = footerRef.current;
      if (!footer) {
        setBackToTopBottom(20);
        return;
      }

      const footerTop = footer.getBoundingClientRect().top;
      const overlap = Math.max(0, window.innerHeight - footerTop);
      const extraOffset = overlap > 0 ? overlap + 12 : 0;
      const isSmallViewport = window.innerWidth < 1024;
      const baseOffset = greenScreen && isSmallViewport ? 76 : 20;
      setBackToTopBottom(baseOffset + extraOffset);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [greenScreen]);

  useEffect(() => {
    const isProtectedTarget = (target) => {
      if (!(target instanceof Element)) return false;
      return Boolean(target.closest("img, canvas"));
    };

    const blockContextMenu = (event) => {
      if (isProtectedTarget(event.target)) {
        event.preventDefault();
      }
    };

    const blockDragStart = (event) => {
      if (isProtectedTarget(event.target)) {
        event.preventDefault();
      }
    };

    const blockSaveShortcuts = (event) => {
      const key = event.key.toLowerCase();
      const isSaveLikeShortcut =
        (event.metaKey || event.ctrlKey) && (key === "s" || key === "p");
      if (isSaveLikeShortcut) {
        event.preventDefault();
      }
    };

    document.addEventListener("contextmenu", blockContextMenu);
    document.addEventListener("dragstart", blockDragStart);
    window.addEventListener("keydown", blockSaveShortcuts);

    return () => {
      document.removeEventListener("contextmenu", blockContextMenu);
      document.removeEventListener("dragstart", blockDragStart);
      window.removeEventListener("keydown", blockSaveShortcuts);
    };
  }, []);

  useEffect(() => {
    const favicon = document.querySelector("link[rel='icon']");
    if (!favicon) return;

    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationTimer;

    const drawFrame = () => {
      const t = (performance.now() % 4000) / 4000;
      const pulse = 0.5 + 0.5 * Math.sin(t * Math.PI * 2);

      ctx.clearRect(0, 0, 64, 64);

      const outerRadius = 18 + pulse * 10;
      ctx.fillStyle = `rgba(108, 235, 228, ${0.12 + pulse * 0.38})`;
      ctx.beginPath();
      ctx.arc(32, 32, outerRadius, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowColor = "rgba(108, 235, 228, 0.5)";
      ctx.shadowBlur = 10;

      const innerRadius = 14 + pulse * 4;
      const gradient = ctx.createRadialGradient(32, 32, 4, 32, 32, innerRadius);
      gradient.addColorStop(0, "#9ff8f3");
      gradient.addColorStop(1, "#6cebe4");

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(32, 32, innerRadius, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowBlur = 0;

      favicon.href = canvas.toDataURL("image/png");
    };

    drawFrame();
    animationTimer = window.setInterval(drawFrame, 50);

    return () => {
      window.clearInterval(animationTimer);
    };
  }, []);

  useEffect(() => {
    if (!gaMeasurementId) return undefined;

    window.dataLayer = window.dataLayer || [];
    window.gtag =
      window.gtag ||
      function gtag() {
        window.dataLayer.push(arguments);
      };

    window.gtag("js", new Date());
    window.gtag("config", gaMeasurementId);

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const toggleTheme = () =>
    setTheme((t) => {
      const next = t === "dark" ? "light" : "dark";
      trackThemeToggle(next);
      return next;
    });
  const toggleGreenScreen = () => setGreenScreen((g) => !g);
  const addToCart = (product) => setCart((c) => [...c, product]);
  const removeFromCart = (index) =>
    setCart((c) => c.filter((_, i) => i !== index));
  const clearCart = () => setCart([]);
  const scrollBackToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const backToTopShadow =
    theme === "dark"
      ? "0 0 6px 1.5px #6cebe4, 0 2px 8px 0 rgba(0,0,0,0.10)"
      : "0 2px 8px 0 rgba(0,0,0,0.10)";

  return (
    <div className="fade-in min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <RouteScrollManager />
        <Navbar
          cart={cart}
          theme={theme}
          toggleTheme={toggleTheme}
          breadcrumb={navBreadcrumb}
        />
        <SubNavbar theme={theme} toggleTheme={toggleTheme} />
        <div className="site-accent-scope flex-1 flex flex-col">
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home theme={theme} />} />
              <Route
                path="/portfolio"
                element={<Portfolio onBreadcrumbChange={setNavBreadcrumb} />}
              />
              <Route path="/about" element={<About theme={theme} />} />
              <Route path="/store" element={<Shop addToCart={addToCart} />} />
              <Route path="/shop" element={<Shop addToCart={addToCart} />} />
              <Route path="/shop/:productId" element={<ProductPage />} />
              <Route path="/hello-stickers" element={<HelloStickers />} />
              <Route
                path="/cart"
                element={
                  <Checkout
                    cart={cart}
                    removeFromCart={removeFromCart}
                    clearCart={clearCart}
                  />
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <div ref={footerRef}>
            <Footer
              greenScreen={greenScreen}
              toggleGreenScreen={toggleGreenScreen}
            />
          </div>
          {showBackToTop && (
            <button
              type="button"
              onClick={scrollBackToTop}
              className="fixed right-5 z-50 flex items-center justify-center bg-[#ff4000] dark:bg-[#6cebe4] text-white dark:text-gray-900 rounded-full shadow-lg w-12 h-12 dark:border dark:border-white/70 hover:scale-110 hover:brightness-105 transition-all duration-200 group"
              aria-label="Back to Top"
              style={{
                boxShadow: backToTopShadow,
                bottom: `${backToTopBottom}px`,
              }}
            >
              <svg
                className="w-7 h-7 animate-bounce-slow"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </button>
          )}
        </div>
      </Router>
    </div>
  );
}

export default App;
