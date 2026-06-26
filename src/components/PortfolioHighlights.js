import React from "react";
import { assetUrl } from "../utils/assets";
import { trackThumbnailClick } from "../utils/analytics";

export default function PortfolioHighlights() {
  return (
    <section className="gallery grid gap-4 p-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <a
        className="group relative bg-white border-[0.5px] border-gray-200 shadow p-0 overflow-hidden"
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
        <div className="pointer-events-none hidden xl:block absolute inset-0 bg-[#6cebe4]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 px-3 py-2 bg-black/50 backdrop-blur-md">
          <p className="text-sm font-semibold text-white tracking-wide">
            Portfolio
          </p>
        </div>
        <div className="pointer-events-none absolute inset-0 border-[0.5px] border-gray-200 z-10" />
      </a>
      <a
        className="group relative bg-white border-[0.5px] border-gray-200 shadow p-0 overflow-hidden"
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
        <div className="pointer-events-none hidden xl:block absolute inset-0 bg-[#6cebe4]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 px-3 py-2 bg-black/50 backdrop-blur-md">
          <p className="text-sm font-semibold text-white tracking-wide">
            MS Paint Illustrations
          </p>
        </div>
        <div className="pointer-events-none absolute inset-0 border-[0.5px] border-gray-200 z-10" />
      </a>
      <a
        className="group relative bg-white border-[0.5px] border-gray-200 shadow p-0 overflow-hidden"
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
        <div className="pointer-events-none hidden xl:block absolute inset-0 bg-[#6cebe4]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 px-3 py-2 bg-black/50 backdrop-blur-md">
          <p className="text-sm font-semibold text-white tracking-wide">
            Collaborations
          </p>
        </div>
        <div className="pointer-events-none absolute inset-0 border-[0.5px] border-gray-200 z-10" />
      </a>
      <a
        className="group relative bg-white border-[0.5px] border-gray-200 shadow p-0 overflow-hidden"
        aria-label="Open Store"
        href="/store"
        data-discover="true"
        onClick={() => trackThumbnailClick("Store", "/store")}
      >
        <div className="w-full aspect-square overflow-hidden">
          <img
            className="w-full h-full object-contain object-center block"
            alt="Artwork 4"
            src={assetUrl(
              "https://artdept-portfolio-test.s3.amazonaws.com/images/hero/hero_showcase/os_i_showcaseLink_4.jpeg",
            )}
          />
        </div>
        <div className="pointer-events-none hidden xl:block absolute inset-0 bg-[#6cebe4]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 px-3 py-2 bg-black/50 backdrop-blur-md">
          <p className="text-sm font-semibold text-white tracking-wide">
            Store
          </p>
        </div>
        <div className="pointer-events-none absolute inset-0 border-[0.5px] border-gray-200 z-10" />
      </a>
    </section>
  );
}
