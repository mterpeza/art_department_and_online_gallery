import React from "react";
import { assetUrl } from "../utils/assets";
import { trackThumbnailClick } from "../utils/analytics";

export default function PortfolioHighlights() {
  return (
    <section className="gallery grid gap-4 p-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <a
        className="group relative bg-white border-[0.5px] border-gray-200 shadow p-1 overflow-hidden"
        aria-label="Open Portfolio"
        href="/portfolio"
        data-discover="true"
        onClick={() => trackThumbnailClick("Portfolio", "/portfolio")}
      >
        <div className="w-full aspect-square overflow-hidden">
          <img
            className="w-full h-full object-contain object-center block"
            alt="Artwork 2"
            src={assetUrl(
              "https://artdept-portfolio-test.s3.amazonaws.com/images/hero/hero_showcase/artwork_showcaseLink_2.jpeg",
            )}
          />
        </div>
        <div className="pointer-events-none absolute left-3 bottom-3 xl:hidden">
          <span className="inline-flex items-center rounded-full bg-black/70 backdrop-blur-md px-3 py-1 text-[11px] font-semibold tracking-[0.08em] text-white uppercase border border-white/20">
            Portfolio
          </span>
        </div>
        <div className="pointer-events-none hidden xl:block absolute inset-0 bg-[#6cebe4]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="pointer-events-none hidden xl:block absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/65 to-transparent">
          <p className="text-sm font-semibold text-white tracking-wide">
            Portfolio
          </p>
        </div>
      </a>
      <a
        className="group relative bg-white border-[0.5px] border-gray-200 shadow p-1 overflow-hidden"
        aria-label="Open MS Paint Illustrations"
        href="/portfolio#ms-paint"
        data-discover="true"
        onClick={() =>
          trackThumbnailClick("MS Paint Illustrations", "/portfolio#ms-paint")
        }
      >
        <div className="w-full aspect-square overflow-hidden">
          <img
            className="w-full h-full object-cover object-center block"
            alt="Artwork 3"
            src={assetUrl("/images/portfolio/mspaint/IMG_4038.PNG")}
          />
        </div>
        <div className="pointer-events-none absolute left-3 bottom-3 xl:hidden">
          <span className="inline-flex items-center rounded-full bg-black/70 backdrop-blur-md px-3 py-1 text-[11px] font-semibold tracking-[0.08em] text-white uppercase border border-white/20">
            MS Paint illustrations
          </span>
        </div>
        <div className="pointer-events-none hidden xl:block absolute inset-0 bg-[#6cebe4]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="pointer-events-none hidden xl:block absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/65 to-transparent">
          <p className="text-sm font-semibold text-white tracking-wide">
            MS Paint illustrations
          </p>
        </div>
      </a>
      <a
        className="group relative bg-white border-[0.5px] border-gray-200 shadow p-1 overflow-hidden"
        aria-label="Open Collaborations"
        href="/portfolio#collaborations"
        data-discover="true"
        onClick={() =>
          trackThumbnailClick("Collaborations", "/portfolio#collaborations")
        }
      >
        <div className="w-full aspect-square overflow-hidden">
          <img
            className="w-full h-full object-cover object-center block"
            alt="Artwork 1"
            src={assetUrl(
              "https://artdept-portfolio-test.s3.amazonaws.com/images/hero/colab.jpeg",
            )}
          />
        </div>
        <div className="pointer-events-none absolute left-3 bottom-3 xl:hidden">
          <span className="inline-flex items-center rounded-full bg-black/70 backdrop-blur-md px-3 py-1 text-[11px] font-semibold tracking-[0.08em] text-white uppercase border border-white/20">
            Collaborations
          </span>
        </div>
        <div className="pointer-events-none hidden xl:block absolute inset-0 bg-[#6cebe4]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="pointer-events-none hidden xl:block absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/65 to-transparent">
          <p className="text-sm font-semibold text-white tracking-wide">
            Collaborations
          </p>
        </div>
      </a>
      <a
        className="group relative bg-white border-[0.5px] border-gray-200 shadow p-1 overflow-hidden"
        aria-label="Open Store"
        href="/store"
        data-discover="true"
        onClick={() => trackThumbnailClick("Store", "/store")}
      >
        <div className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/45 bg-white/88 px-3 py-1.5 text-[11px] font-semibold tracking-[0.08em] !text-gray-200 backdrop-blur-md shadow-[0_8px_18px_rgba(0,0,0,0.1)]">
          <span className="text-sm leading-none">✦</span>
          <span className="uppercase">Shop Here</span>
        </div>
        <div className="w-full aspect-square overflow-hidden">
          <img
            className="w-full h-full object-contain object-center block"
            alt="Artwork 4"
            src={assetUrl(
              "https://artdept-portfolio-test.s3.amazonaws.com/images/hero/hero_showcase/os_i_showcaseLink_4.jpeg",
            )}
          />
        </div>
        <div className="pointer-events-none absolute left-3 bottom-3 xl:hidden">
          <span className="inline-flex items-center rounded-full bg-black/70 backdrop-blur-md px-3 py-1 text-[11px] font-semibold tracking-[0.08em] text-white uppercase border border-white/20">
            Store
          </span>
        </div>
        <div className="pointer-events-none hidden xl:block absolute inset-0 bg-[#6cebe4]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="pointer-events-none hidden xl:block absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/65 to-transparent">
          <p className="text-sm font-semibold text-white tracking-wide">
            Store
          </p>
        </div>
      </a>
    </section>
  );
}
