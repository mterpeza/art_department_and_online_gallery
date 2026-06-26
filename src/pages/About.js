import React, { useEffect, useMemo, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { assetUrl } from "../utils/assets";
import { CONTACT_EMAIL, CONTACT_MAILTO } from "../utils/contact";

const highlights = [
  {
    title: "Frontend",
    value: "React",
    detail:
      "React + React Router drive page structure, navigation, gallery state, and modal interactions.",
  },
  {
    title: "Styling",
    value: "Tailwind",
    detail:
      "Tailwind utilities shape layout, spacing, motion accents, and theme-aware visual treatments.",
  },
  {
    title: "Backend + Hosting",
    value: "Express + AWS",
    detail:
      "Express serves the production build and API routes, with DynamoDB powering sticker data, plus deployment on Elastic Beanstalk and asset pathing through S3.",
  },
];

const mediumBreakdown = [
  { label: "React + Routing", value: 30 },
  { label: "Tailwind + UI", value: 24 },
  { label: "Express + API + DynamoDB", value: 20 },
  { label: "AWS + Asset Delivery", value: 26 },
];

const siteCompositionStats = [
  { label: "Core Pages", value: "6" },
  { label: "Portfolio Sections", value: "11" },
  { label: "Store Collections", value: "3" },
  { label: "Primary Destinations", value: "4" },
];

const siteCompositionBreakdown = [
  { label: "Portfolio Content", value: 52 },
  { label: "Store + Commerce", value: 18 },
  { label: "Interactive Features", value: 17 },
  { label: "About + Contact", value: 13 },
];

const destinations = [
  { label: "Portfolio", to: "/portfolio" },
  { label: "Store", to: "/store" },
  { label: "Hello Stickers", to: "/hello-stickers" },
  {
    label: "Contact",
    href: CONTACT_MAILTO,
  },
];

export default function About({ theme = "dark" }) {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [barProgress, setBarProgress] = useState(0);
  const [countProgress, setCountProgress] = useState(0);
  const [visibleElements, setVisibleElements] = useState({});
  const containerRef = useRef(null);
  const highlightsRef = useRef(null);
  const statsRef = useRef(null);

  const backgroundOrbs = useMemo(() => {
    const orbCount = 88;
    return Array.from({ length: orbCount }, (_, index) => {
      const isLarge = Math.random() < 0.14;
      const size = isLarge ? 6 + Math.random() * 5 : 1.2 + Math.random() * 3.6;
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const driftDuration = 22 + Math.random() * 28;
      const twinkleDuration = 2 + Math.random() * 4.2;
      const delay = -Math.random() * 22;
      const opacity = isLarge
        ? 0.3 + Math.random() * 0.25
        : 0.15 + Math.random() * 0.34;
      const blur = isLarge ? 0.2 + Math.random() * 1.2 : Math.random() * 0.8;
      const driftX = (Math.random() * 2 - 1) * (isLarge ? 28 : 20);
      const driftY = (Math.random() * 2 - 1) * (isLarge ? 24 : 18);
      const scalePeak = 1.04 + Math.random() * 0.2;
      return {
        id: `orb-${index}`,
        size,
        left,
        top,
        driftDuration,
        twinkleDuration,
        delay,
        opacity,
        blur,
        driftX,
        driftY,
        scalePeak,
      };
    });
  }, []);

  useEffect(() => {
    setHasLoaded(true);
    let frameId;
    const durationMs = 1300;
    const startAt = performance.now();

    const easeOutCubic = (t) => 1 - (1 - t) ** 3;
    const easeOutBack = (t) => {
      const c1 = 2.8;
      const c3 = c1 + 1;
      return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2;
    };

    const step = (now) => {
      const linear = Math.min(1, (now - startAt) / durationMs);
      setCountProgress(easeOutCubic(linear));
      setBarProgress(Math.min(1.15, Math.max(0, easeOutBack(linear))));

      if (linear < 1) {
        frameId = window.requestAnimationFrame(step);
      }
    };

    frameId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleElements((prev) => ({
            ...prev,
            [entry.target.id]: true,
          }));
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll("[data-animate]");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const animatedStatValue = (value) => {
    const parsed = Number(value);
    if (Number.isNaN(parsed)) return value;
    return String(Math.round(parsed * countProgress));
  };

  const aboutImageSrc =
    theme === "light"
      ? "/images/about/about_light.gif"
      : "/images/about/about.JPG";

  return (
    <main className="fade-in about-main relative overflow-hidden container mx-auto p-6">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {backgroundOrbs.map((orb) => (
          <span
            key={orb.id}
            className="about-orb"
            style={{
              width: `${orb.size}px`,
              height: `${orb.size}px`,
              left: `${orb.left}%`,
              top: `${orb.top}%`,
              opacity: orb.opacity,
              filter: `blur(${orb.blur}px)`,
              animationDuration: `${orb.driftDuration}s, ${orb.twinkleDuration}s`,
              animationDelay: `${orb.delay}s, ${orb.delay / 3}s`,
              "--orb-dx": `${orb.driftX}px`,
              "--orb-dy": `${orb.driftY}px`,
              "--orb-scale-peak": orb.scalePeak,
            }}
          />
        ))}
      </div>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 items-start">
        <div className="space-y-4 lg:text-right lg:pr-4 lg:border-r lg:border-[#ff4000]/50 dark:lg:border-[#6cebe4]/80">
          <p className="text-sm uppercase tracking-[0.2em] text-[#ff4000] dark:text-[#6cebe4] font-semibold">
            About the Artist
          </p>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            Mike Terpeza
          </h1>
          <p className="leading-relaxed text-gray-700 dark:text-gray-200">
            Multi-disciplinary artist and web developer based in the US. This
            archive documents a studio practice spanning painting, hand
            lettering, calligraphy, photography, print work, digital
            illustration, and collaboration — organized by medium so every
            section reads as both process and finished work.
          </p>
          <p className="leading-relaxed text-gray-700 dark:text-gray-200">
            Professionally, Mike works across marketing technology and creative
            operations, with experience in full-stack web development, AWS cloud
            infrastructure, and data-driven digital workflows. His technical
            toolkit includes React, Node.js, and AWS services — including S3,
            DynamoDB, and Elastic Beanstalk — the same stack powering this site.
          </p>
          <p className="leading-relaxed text-gray-700 dark:text-gray-200">
            Current creative work centers on visual storytelling through
            hand-built imagery, material experimentation, and public-facing
            editions. The intersection of craft and code is a recurring theme
            across both practices.
          </p>
        </div>

        <div className="lg:pl-4">
          <div
            id="about-image"
            data-animate="true"
            className="about-image-glow shadow-md"
            style={{
              opacity: visibleElements["about-image"] ? 1 : 0.3,
              transform: visibleElements["about-image"]
                ? "translateY(0) scale(1)"
                : "translateY(24px) scale(0.94)",
              transition:
                "transform 700ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 600ms ease",
            }}
          >
            <div className="about-image-glow-content rounded-xl overflow-hidden bg-white dark:bg-gray-900">
              <img
                src={assetUrl(aboutImageSrc)}
                alt="About Mike Terpeza"
                className="w-full h-[420px] object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        {highlights.map((item, index) => (
          <article
            key={item.title}
            id={`highlight-${index}`}
            data-animate="true"
            className="about-glass-card rounded-xl border p-5"
            style={{
              opacity: visibleElements[`highlight-${index}`] ? 1 : 0.3,
              transform: visibleElements[`highlight-${index}`]
                ? "translateY(0) scale(1)"
                : "translateY(20px) scale(0.96)",
              transition:
                "transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 500ms ease",
            }}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                {item.title}
              </h2>
              <span
                className="inline-flex h-9 min-w-9 items-center justify-center rounded-full text-sm font-bold px-2"
                style={{
                  backgroundColor:
                    theme === "light" &&
                    (item.value === "React" ||
                      item.value === "Tailwind" ||
                      item.value === "Express + AWS")
                      ? "#9b2f00"
                      : theme === "light"
                        ? "#ff4000"
                        : "#6cebe4",
                  color:
                    theme === "light" &&
                    (item.value === "React" ||
                      item.value === "Tailwind" ||
                      item.value === "Express + AWS")
                      ? "white"
                      : theme === "light"
                        ? "#9b2f00"
                        : "#0f1822",
                }}
              >
                {item.value === "Express + AWS" ? (
                  <>
                    <span className="hidden sm:inline">{item.value}</span>
                    <span className="sm:hidden">Expr+AWS</span>
                  </>
                ) : (
                  item.value
                )}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300 mt-3">
              {item.detail}
            </p>
          </article>
        ))}
      </section>

      <section className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-5">
        <article
          id="stack-breakdown"
          data-animate="true"
          className="about-glass-card rounded-xl border p-5"
          style={{
            opacity: visibleElements["stack-breakdown"] ? 1 : 0.3,
            transform: visibleElements["stack-breakdown"]
              ? "translateY(0)"
              : "translateY(24px)",
            transition:
              "transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 600ms ease",
          }}
        >
          <h2 className="text-sm uppercase tracking-[0.14em] text-gray-500 dark:text-gray-300 mb-4">
            Stack Breakdown
          </h2>
          <div className="space-y-3">
            {mediumBreakdown.map((item, index) => (
              <div
                key={item.label}
                id={`breakdown-bar-${index}`}
                data-animate="true"
                style={{
                  opacity: visibleElements[`breakdown-bar-${index}`] ? 1 : 0.3,
                  transition: "opacity 600ms ease",
                }}
              >
                <div className="flex justify-between text-xs mb-1">
                  <span>{item.label}</span>
                  <span>{Math.round(item.value * countProgress)}%</span>
                </div>
                <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#ff4000] to-[#700505] dark:from-[#6cebe4] dark:to-[#8fd4a7]"
                    style={{
                      width: `${Math.min(100, item.value)}%`,
                      transform: visibleElements[`breakdown-bar-${index}`]
                        ? "scaleX(1)"
                        : `scaleX(${Math.max(0, Math.min(1, barProgress))})`,
                      animation: visibleElements[`breakdown-bar-${index}`]
                        ? `spring-scale-x 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`
                        : "none",
                      transformOrigin: "left",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </article>

        <article
          id="explore-section"
          data-animate="true"
          className="about-glass-card rounded-xl border p-5"
          style={{
            opacity: visibleElements["explore-section"] ? 1 : 0.3,
            transform: visibleElements["explore-section"]
              ? "translateY(0)"
              : "translateY(24px)",
            transition:
              "transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 600ms ease",
          }}
        >
          <h2 className="text-sm uppercase tracking-[0.14em] text-gray-500 dark:text-gray-300 mb-4">
            Explore
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {destinations.map((item) =>
              item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  className="about-glass-chip rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2 text-sm font-semibold hover:border-[#ff4000]/50 hover:bg-[#ff4000]/10 dark:hover:border-[#6cebe4]/70 dark:hover:bg-[#6cebe4]/10 transition"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  to={item.to}
                  className="about-glass-chip rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2 text-sm font-semibold hover:border-[#ff4000]/50 hover:bg-[#ff4000]/10 dark:hover:border-[#6cebe4]/70 dark:hover:bg-[#6cebe4]/10 transition"
                >
                  {item.label}
                </Link>
              ),
            )}
          </div>
          <p className="mt-4 text-xs text-gray-600 dark:text-gray-300">
            Direct email: {CONTACT_EMAIL}
          </p>
        </article>
      </section>

      <section className="mt-5">
        <article className="about-glass-card rounded-xl border p-5">
          <h2 className="text-sm uppercase tracking-[0.14em] text-gray-500 dark:text-gray-300 mb-4">
            Site Composition
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
            {siteCompositionStats.map((item) => (
              <div
                key={item.label}
                className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/70 px-3 py-2"
                style={{
                  opacity: hasLoaded ? 1 : 0,
                  transform: hasLoaded
                    ? "translateY(0) scale(1)"
                    : "translateY(12px) scale(0.98)",
                  transition:
                    "transform 700ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 560ms ease",
                }}
              >
                <p className="text-[11px] uppercase tracking-[0.08em] text-gray-500 dark:text-gray-400">
                  {item.label}
                </p>
                <p className="text-lg font-bold text-gray-900 dark:text-gray-100 leading-tight">
                  {animatedStatValue(item.value)}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/70 p-4">
              <h3 className="text-xs uppercase tracking-[0.12em] text-gray-500 dark:text-gray-400 mb-3">
                Content Mix
              </h3>
              <div className="space-y-3">
                {siteCompositionBreakdown.map((item, index) => (
                  <div
                    key={item.label}
                    id={`content-mix-bar-${index}`}
                    data-animate="true"
                    style={{
                      opacity: visibleElements[`content-mix-bar-${index}`]
                        ? 1
                        : 0.3,
                      transition: "opacity 600ms ease",
                    }}
                  >
                    <div className="flex justify-between text-xs mb-1 text-gray-700 dark:text-gray-300">
                      <span>{item.label}</span>
                      <span>{Math.round(item.value * countProgress)}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#ff4000] to-[#700505] dark:from-[#6cebe4] dark:to-[#8fd4a7]"
                        style={{
                          width: `${Math.min(100, item.value)}%`,
                          transform: visibleElements[`content-mix-bar-${index}`]
                            ? "scaleX(1)"
                            : `scaleX(${Math.max(0, Math.min(1, barProgress))})`,
                          animation: visibleElements[`content-mix-bar-${index}`]
                            ? `spring-scale-x 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`
                            : "none",
                          transformOrigin: "left",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/70 p-4">
              <h3 className="text-xs uppercase tracking-[0.12em] text-gray-500 dark:text-gray-400 mb-3">
                Structure Snapshot
              </h3>
              <div className="space-y-2">
                {siteCompositionStats.map((item) => (
                  <div
                    key={`snapshot-${item.label}`}
                    className="flex items-center justify-between rounded-md bg-gray-50/90 dark:bg-gray-800/70 px-3 py-2"
                    style={{
                      opacity: hasLoaded ? 1 : 0,
                      transform: hasLoaded
                        ? "translateX(0)"
                        : "translateX(-10px)",
                      transition:
                        "transform 620ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 420ms ease",
                    }}
                  >
                    <span className="text-xs uppercase tracking-[0.08em] text-gray-500 dark:text-gray-400">
                      {item.label}
                    </span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {animatedStatValue(item.value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
