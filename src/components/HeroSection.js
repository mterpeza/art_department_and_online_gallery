import React, { useState, useEffect } from "react";
import { assetUrl } from "../utils/assets";

const heroImages = [
  { src: "/images/hero/ds_2i_h1.jpeg", productId: "landscape-series-4" },
  { src: "/images/hero/dotSeries_8i_h2_i.jpeg", productId: "dot-series-3" },
  { src: "/images/hero/ids_6i_h2.jpeg", productId: "landscape-series-5" },
];

export default function HeroSection({ theme }) {
  const [current, setCurrent] = useState(0);
  const total = heroImages.length;
  const isDark = theme === "dark";

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
      {heroImages.map((slide, idx) => (
        <img
          key={slide.src}
          src={assetUrl(slide.src)}
          alt={`Hero ${idx + 1}`}
          className={`w-full h-full absolute inset-0 transition-opacity duration-500 object-cover object-center ${idx === current ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      {/* Clickable overlay — links to the current slide's product page */}
      <a
        href={`/shop/${heroImages[current].productId}`}
        aria-label="View product details"
        className="absolute inset-0 z-10 cursor-pointer"
      />
      <div className="absolute inset-x-0 bottom-0 md:inset-x-4 md:bottom-3 md:right-10 md:left-auto md:ml-auto z-20 w-full md:max-w-xl rounded-none md:rounded-xl border-0 md:border border-white/30 bg-black/35 md:bg-black/45 backdrop-blur-md px-3 py-2 md:p-6 text-white text-right shadow-none md:shadow-xl">
        <h2 className="text-lg md:text-3xl font-bold leading-tight mb-1 md:mb-2 text-[#6cebe4]">
          Now in the store
        </h2>
        <p className="text-xs md:text-base text-white/90 leading-snug md:leading-relaxed mb-2 md:mb-4">
          Stickers, paintings, drawings and mixed media. Please contact me for
          pricing and to purchase paintings, drawings and mixed media.
        </p>
        <div className="flex flex-wrap gap-1.5 md:gap-2 justify-end">
          <a
            className={`inline-flex items-center rounded-md font-semibold px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm hover:brightness-95 transition ${
              isDark ? "bg-[#6cebe4] text-gray-900" : "bg-[#ff4000] text-white"
            }`}
            href="/shop"
          >
            Shop now
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
