import React, { useState, useEffect } from "react";
import { assetUrl } from "../utils/assets";

const heroImages = [
  "/images/hero/ds_2i_h1.jpeg",
  "/images/hero/dotSeries_8i_h2_i.jpeg",
  "/images/hero/ids_6i_h2.jpeg",
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const total = heroImages.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 3500);
    return () => clearInterval(interval);
  }, [total]);

  // Carousel navigation
  const prev = () => setCurrent((prev) => (prev - 1 + total) % total);
  const next = () => setCurrent((prev) => (prev + 1) % total);

  return (
    <section className="relative h-[420px] sm:h-[540px] md:h-[700px] bg-gray-200 overflow-hidden">
      {heroImages.map((src, idx) => (
        <img
          key={src}
          src={assetUrl(src)}
          alt={`Hero ${idx + 1}`}
          className={`w-full h-full absolute inset-0 transition-opacity duration-500 object-cover object-center ${idx === current ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      <div className="absolute inset-x-0 bottom-0 md:inset-x-4 md:bottom-3 md:right-10 md:left-auto md:ml-auto z-20 w-full md:max-w-xl rounded-none md:rounded-xl border-0 md:border border-white/30 bg-black/35 md:bg-black/45 backdrop-blur-md px-3 py-2 md:p-6 text-white text-right shadow-none md:shadow-xl">
        <p className="text-[10px] md:text-xs uppercase tracking-[0.16em] md:tracking-[0.18em] text-[#6cebe4] font-semibold mb-1 md:mb-2">
          Featured Slide
        </p>
        <h2 className="text-lg md:text-3xl font-bold leading-tight mb-1 md:mb-2">
          New Portfolio Highlights
        </h2>
        <p className="text-xs md:text-base text-white/90 leading-snug md:leading-relaxed mb-2 md:mb-4">
          Explore a rotating selection of paintings, print work, and mixed-media
          studies from the latest studio sessions.
        </p>
        <div className="flex flex-wrap gap-1.5 md:gap-2 justify-end">
          <a
            className="inline-flex items-center rounded-md bg-[#6cebe4] text-gray-900 font-semibold px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm hover:brightness-95 transition"
            href="/portfolio"
          >
            View Portfolio
          </a>
          <a
            className="inline-flex items-center rounded-md border border-white/70 text-white font-semibold px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm hover:bg-white/15 transition"
            href="/portfolio"
          >
            See Collaborations
          </a>
        </div>
      </div>
      {/* Carousel controls */}
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 z-20 transform -translate-y-1/2 bg-white bg-opacity-75 p-2 rounded-full"
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 z-20 transform -translate-y-1/2 bg-white bg-opacity-75 p-2 rounded-full"
        aria-label="Next slide"
      >
        ›
      </button>
    </section>
  );
}
