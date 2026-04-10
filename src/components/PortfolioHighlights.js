import React from "react";
import { assetUrl } from "../utils/assets";

export default function PortfolioHighlights() {
  return (
    <section className="gallery grid gap-4 p-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <a
        className="group relative bg-white border-[0.5px] border-gray-200 shadow p-1 overflow-hidden"
        aria-label="Open Artwork/Portfolio"
        href="/portfolio"
        data-discover="true"
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
        <div className="pointer-events-none absolute inset-0 bg-[#6cebe4]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/65 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-sm font-semibold text-white tracking-wide">
            Artwork/Portfolio
          </p>
        </div>
      </a>
      <a
        className="group relative bg-white border-[0.5px] border-gray-200 shadow p-1 overflow-hidden"
        aria-label="Open MS Paint and other Illustrations"
        href="/portfolio#ms-paint"
        data-discover="true"
      >
        <div className="w-full aspect-square overflow-hidden">
          <img
            className="w-full h-full object-cover object-center block"
            alt="Artwork 3"
            src={assetUrl("/images/portfolio/mspaint/IMG_4038.PNG")}
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[#6cebe4]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/65 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-sm font-semibold text-white tracking-wide">
            MS Paint and other Illustrations
          </p>
        </div>
      </a>
      <a
        className="group relative bg-white border-[0.5px] border-gray-200 shadow p-1 overflow-hidden"
        aria-label="Open Collaborations"
        href="/work#collaborations"
        data-discover="true"
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
        <div className="pointer-events-none absolute inset-0 bg-[#6cebe4]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/65 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-sm font-semibold text-white tracking-wide">
            Collaborations
          </p>
        </div>
      </a>
      <a
        className="group relative bg-white border-[0.5px] border-gray-200 shadow p-1 overflow-hidden"
        aria-label="Open Online Shop"
        href="/store"
        data-discover="true"
      >
        <div className="pointer-events-none absolute -right-12 top-3 w-44 rotate-[36deg] border border-[#9a3412] bg-[#f6d687] text-[#4a1f08] text-xs font-black uppercase tracking-[0.14em] text-center py-1.5 shadow-[0_3px_0_#7c2d12]">
          Shop Here
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
        <div className="pointer-events-none absolute inset-0 bg-[#6cebe4]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/65 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-sm font-semibold text-white tracking-wide">
            Online Shop
          </p>
        </div>
      </a>
    </section>
  );
}
