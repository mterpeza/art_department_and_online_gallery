import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// SubNavbar and Footer may need to be created if not present
// import SubNavbar from "./components/SubNavbar";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Shop from "./pages/Shop";
import About from "./pages/About";
import HelloStickers from "./pages/HelloStickers";
import NotFound from "./pages/NotFound";

// Placeholder components for missing ones
const SubNavbar = () => null;
const Cart = () => null;
const Contact = () => null;

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

  return null;
}

function App() {
  // Theme state and persistence
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark",
  );
  // Cart state
  const [cart, setCart] = useState([]);
  // Back to Top button
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 600);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

    let frame = 0;
    let animationTimer;

    const drawFrame = () => {
      const t = (frame % 60) / 60;
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
      frame += 1;
    };

    drawFrame();
    animationTimer = window.setInterval(drawFrame, 90);

    return () => {
      window.clearInterval(animationTimer);
    };
  }, []);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  const addToCart = (product) => setCart((c) => [...c, product]);
  const removeFromCart = (index) =>
    setCart((c) => c.filter((_, i) => i !== index));
  const clearCart = () => setCart([]);
  const scrollBackToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="fade-in min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <RouteScrollManager />
        <Navbar cart={cart} theme={theme} toggleTheme={toggleTheme} />
        <SubNavbar theme={theme} toggleTheme={toggleTheme} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/about" element={<About />} />
            <Route path="/store" element={<Shop addToCart={addToCart} />} />
            <Route path="/shop" element={<Shop addToCart={addToCart} />} />
            <Route path="/hello-stickers" element={<HelloStickers />} />
            <Route
              path="/cart"
              element={
                <Cart
                  cart={cart}
                  removeFromCart={removeFromCart}
                  clearCart={clearCart}
                />
              }
            />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        {showBackToTop && (
          <button
            type="button"
            onClick={scrollBackToTop}
            className="fixed bottom-5 right-5 z-50 flex items-center justify-center bg-[#6cebe4] text-gray-900 rounded-full shadow-lg w-12 h-12 border border-white/70 hover:scale-110 hover:brightness-105 transition-all duration-200 group"
            aria-label="Back to Top"
            style={{
              boxShadow: "0 0 6px 1.5px #6cebe4, 0 2px 8px 0 rgba(0,0,0,0.10)",
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
      </Router>
    </div>
  );
}

export default App;
