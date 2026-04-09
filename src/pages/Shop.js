import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { assetUrl } from "../utils/assets";

const personalProducts = [
  {
    id: "dot-series-5",
    name: "Dot Series 5",
    image:
      "/images/portfolio/paintings/paintings%20feature%20section/dot%20series/ds_5/ds_5_front.jpeg",
    galleryImages: [
      "/images/portfolio/paintings/paintings%20feature%20section/dot%20series/ds_5/ds_5_front.jpeg",
      "/images/portfolio/paintings/paintings%20feature%20section/dot%20series/ds_5/ds_5_side.jpeg",
      "/images/portfolio/paintings/paintings%20feature%20section/dot%20series/ds_5/ds_5_bot.jpeg",
    ],
    inquiryOnly: true,
  },
  {
    id: "dot-series-4",
    name: "Dot Series 4",
    image:
      "/images/portfolio/paintings/paintings%20feature%20section/dot%20series/ds_4/ds_4_front.jpeg",
    galleryImages: [
      "/images/portfolio/paintings/paintings%20feature%20section/dot%20series/ds_4/ds_4_front.jpeg",
      "/images/portfolio/paintings/paintings%20feature%20section/dot%20series/ds_4/ds_4_side.jpeg",
      "/images/portfolio/paintings/paintings%20feature%20section/dot%20series/ds_4/ds_4_stacked.jpeg",
    ],
    inquiryOnly: true,
  },
  {
    id: "dot-series-3",
    name: "Dot Series 3",
    image:
      "/images/portfolio/paintings/paintings%20feature%20section/dot%20series/ds_3/ds_3_front.jpeg",
    galleryImages: [
      "/images/portfolio/paintings/paintings%20feature%20section/dot%20series/ds_3/ds_3_front.jpeg",
      "/images/portfolio/paintings/paintings%20feature%20section/dot%20series/ds_3/ds_3_detail.jpeg",
      "/images/portfolio/paintings/paintings%20feature%20section/dot%20series/ds_3/ds_3_side.jpeg",
      "/images/portfolio/paintings/paintings%20feature%20section/dot%20series/ds_3/ds_3_glowDark.jpeg",
    ],
    inquiryOnly: true,
  },
  {
    id: "dot-series-1",
    name: "Dot Series 1",
    image: "/images/Store/personal%20work/Dot%20Series%201/ds_1_front.jpeg",
    galleryImages: [
      "/images/Store/personal%20work/Dot%20Series%201/ds_1_front.jpeg",
      "/images/Store/personal%20work/Dot%20Series%201/ds_1_detail.jpeg",
    ],
    inquiryOnly: true,
  },
  {
    id: "landscape-series-5",
    name: "Landscape Series 5",
    image:
      "/images/portfolio/paintings/paintings%20feature%20section/landscapes/ls_5/Landscape_5.jpeg",
    galleryImages: [
      "/images/portfolio/paintings/paintings%20feature%20section/landscapes/ls_5/Landscape_5.jpeg",
      "/images/portfolio/paintings/paintings%20feature%20section/landscapes/ls_5/Landscape_5_detail.jpeg",
    ],
    inquiryOnly: true,
  },
  {
    id: "landscape-series-4",
    name: "Landscape Series 4",
    image:
      "/images/portfolio/paintings/paintings%20feature%20section/landscapes/ls_4/landscape_4.jpeg",
    galleryImages: [
      "/images/portfolio/paintings/paintings%20feature%20section/landscapes/ls_4/landscape_4.jpeg",
    ],
    inquiryOnly: true,
  },
  {
    id: "awr-3",
    name: "Art Within Reach 3",
    image:
      "/images/Store/personal%20work/Art%20Within%20Reach%203/awr_3_front.jpeg",
    galleryImages: [
      "/images/Store/personal%20work/Art%20Within%20Reach%203/awr_3_front.jpeg",
      "/images/Store/personal%20work/Art%20Within%20Reach%203/awr_3_side.jpeg",
    ],
    inquiryOnly: true,
  },
  {
    id: "awr-2",
    name: "Art Within Reach 2",
    image:
      "/images/Store/personal%20work/Art%20Within%20Reach%202/awr_2_front.jpeg",
    galleryImages: [
      "/images/Store/personal%20work/Art%20Within%20Reach%202/awr_2_front.jpeg",
      "/images/Store/personal%20work/Art%20Within%20Reach%202/awr_2_side.jpeg",
    ],
    inquiryOnly: true,
  },
  {
    id: "awr-1",
    name: "Art Within Reach 1",
    image:
      "/images/Store/personal%20work/Art%20Within%20Reach%201/awr_1_front.jpeg",
    galleryImages: [
      "/images/Store/personal%20work/Art%20Within%20Reach%201/awr_1_front.jpeg",
      "/images/Store/personal%20work/Art%20Within%20Reach%201/awr_1_side.jpeg",
    ],
    inquiryOnly: true,
  },
];

const collaborationProducts = [
  {
    id: "cooper-diers-ordinary-pals-original-illustrations",
    name: "Cooper Diers: Ordinary Pals - Original Illustrations",
    image:
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/_Racing%20Day.jpeg",
    galleryImages: [
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/1a.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/1b.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/2a.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/2b.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/3a.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/3b.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/4a.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/4b.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/5a.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/5b.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/6a.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/6b.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/7a.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/7b.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/8a.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/8b.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/9a.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/9b.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/10a.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/10b.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/11a.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/11b.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/13.jpg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/14.jpg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/15.jpg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/19a.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/19b.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/21a.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/21b.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/22a.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/22b.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/23a.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/23b.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/24.jpg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/_More%20Butter.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/_Racing%20Day.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/Art%20Show.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/art_show.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudeDetails/art_show_2.jpg",
    ],
    soldOut: false,
  },
  {
    id: "sure-print",
    name: "80AD Limited Edition Sure! Print",
    image: "/images/Store/other/OP_80AD_surePrint/_SURE!.jpeg",
    galleryImages: [
      "/images/Store/other/OP_80AD_surePrint/_SURE!.jpeg",
      "/images/Store/other/OP_80AD_surePrint/IMG_0063.jpeg",
    ],
    soldOut: true,
  },
  {
    id: "trading-cards",
    name: "80AD Ordinary Pals Trading Cards - Series 1",
    image: "/images/Store/other/OP_80AD_tradingCards/IMG_1214.jpeg",
    galleryImages: [
      "/images/Store/other/OP_80AD_tradingCards/IMG_1214.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/tradingCards/Series_1_Chopper.png",
      "/images/portfolio/collaboration/ordinary%20pals/tradingCards/Series_1_Francis_Dak.png",
      "/images/portfolio/collaboration/ordinary%20pals/tradingCards/Series_1_Lug_Dugler.png",
      "/images/portfolio/collaboration/ordinary%20pals/tradingCards/Series_1_Terry_Heathers.png",
      "/images/portfolio/collaboration/ordinary%20pals/tradingCards/Series_1_Trapped.png",
      "/images/portfolio/collaboration/ordinary%20pals/tradingCards/Series_2_Billy_Bell.png",
      "/images/portfolio/collaboration/ordinary%20pals/tradingCards/Series_2_Burger_Time.png",
      "/images/portfolio/collaboration/ordinary%20pals/tradingCards/Series_2_Butter.png",
      "/images/portfolio/collaboration/ordinary%20pals/tradingCards/Series_2_Garth_Lungey.png",
      "/images/portfolio/collaboration/ordinary%20pals/tradingCards/Series_2_Jed_Weaverson.png",
      "/images/portfolio/collaboration/ordinary%20pals/tradingCards/Series_3_Doris_Gurney.png",
      "/images/portfolio/collaboration/ordinary%20pals/tradingCards/Series_3_Grunk_Scgruggins.png",
      "/images/portfolio/collaboration/ordinary%20pals/tradingCards/Series_3_Jerry.png",
      "/images/portfolio/collaboration/ordinary%20pals/tradingCards/Series_3_Selfie.png",
      "/images/portfolio/collaboration/ordinary%20pals/tradingCards/Series_3_The_Stevies.png",
    ],
    soldOut: true,
  },
];

function ProductGrid({ products, onOpenGallery }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <article
          key={product.id}
          className={`rounded-xl shadow-sm overflow-hidden ${
            product.soldOut
              ? "border border-gray-200 dark:border-gray-700 bg-[rgba(214,41,41,0.09)] dark:bg-[rgba(214,41,41,0.2)]"
              : "border border-gray-200 dark:border-gray-700 bg-[rgba(76,187,23,0.1)] dark:bg-[rgba(76,187,23,0.2)]"
          }`}
          style={{ borderBottomWidth: "0.5px" }}
        >
          <div className="relative aspect-[4/3] bg-gray-100 dark:bg-gray-800">
            <button
              type="button"
              className="block w-full h-full"
              onClick={() => onOpenGallery(product, 0)}
              aria-label={`Open ${product.name} gallery`}
            >
              <img
                src={assetUrl(product.image)}
                alt={product.name}
                className="block w-full h-full object-cover"
                loading="lazy"
              />
            </button>
            {product.soldOut && product.showSoldOutBanner !== false && (
              <div className="pointer-events-none absolute -right-12 top-3 w-44 rotate-[36deg] bg-red-700/85 text-white text-xs font-black uppercase tracking-[0.14em] text-center py-1.5">
                Sold Out
              </div>
            )}
          </div>
          <div
            className="px-4 pb-4 pt-0 border-t border-gray-200 dark:border-gray-700"
            style={{ borderTopWidth: "0.125px" }}
          >
            <h3 className="mt-2.5 font-semibold">{product.name}</h3>
            {product.soldOut ? (
              <p className="text-sm text-red-700 dark:text-red-400 mt-1 font-semibold">
                Sold Out
              </p>
            ) : (
              <>
                <p className="text-sm text-emerald-700 dark:text-emerald-400 mt-1 font-semibold">
                  Contact for price
                </p>
                <a
                  href="mailto:mikesartdept@gmail.com?subject=Art%20Inquiry"
                  className="mt-2 inline-flex items-center rounded-lg border border-gray-300 dark:border-gray-600 bg-white/95 dark:bg-gray-900/80 px-3.5 py-1.5 text-sm font-semibold text-gray-900 dark:text-gray-100 shadow-sm transition-all hover:-translate-y-[1px] hover:bg-gray-50 dark:hover:bg-gray-800 hover:shadow"
                >
                  Contact
                </a>
              </>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

export default function Shop() {
  const location = useLocation();
  const [activeProduct, setActiveProduct] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const allProducts = useMemo(
    () => [...personalProducts, ...collaborationProducts],
    [],
  );

  const activeImages = useMemo(
    () => activeProduct?.galleryImages || [],
    [activeProduct],
  );

  const openGallery = (product, index) => {
    setActiveProduct(product);
    setActiveImageIndex(index);
  };

  const closeGallery = () => {
    setActiveProduct(null);
    setActiveImageIndex(0);
  };

  const nextImage = () => {
    if (!activeImages.length) return;
    setActiveImageIndex((activeImageIndex + 1) % activeImages.length);
  };

  const prevImage = () => {
    if (!activeImages.length) return;
    setActiveImageIndex(
      (activeImageIndex - 1 + activeImages.length) % activeImages.length,
    );
  };

  useEffect(() => {
    const productId = location.hash.replace(/^#/, "");
    if (!productId) return;

    const product = allProducts.find((entry) => entry.id === productId);
    if (!product) return;

    setActiveProduct(product);
    setActiveImageIndex(0);
  }, [allProducts, location.hash]);

  return (
    <main className="fade-in container mx-auto p-6">
      <header className="mb-6">
        <p className="text-xs uppercase tracking-[0.18em] text-[#6cebe4] font-semibold mb-2">
          Store
        </p>
        <h1 className="text-3xl font-bold mb-2">Online Store</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Welcome to the Art Department Store. Please reach out if you're
          interested in purchasing any artwork or have any questions.
        </p>
      </header>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Personal Artwork</h2>
        <ProductGrid products={personalProducts} onOpenGallery={openGallery} />
      </section>

      <section>
        <div className="relative mb-3 h-px w-full overflow-hidden rounded-full bg-[rgba(108,235,228,0.3)]">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#6cebe4] to-transparent animate-[pulse_1.8s_ease-in-out_infinite] shadow-[0_0_10px_rgba(108,235,228,0.9)]" />
        </div>
        <h2 className="text-2xl font-semibold mb-4">
          Collaborations and Other Work
        </h2>
        <ProductGrid
          products={collaborationProducts}
          onOpenGallery={openGallery}
        />
      </section>

      {activeProduct && activeImages.length > 0 && (
        <div
          className="fixed inset-0 z-50 bg-black/90 p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeProduct.name} image gallery`}
          onClick={closeGallery}
        >
          <div
            className="max-w-5xl mx-auto h-full flex flex-col justify-center"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4 text-white">
              <h3 className="font-semibold text-lg">{activeProduct.name}</h3>
              <button
                type="button"
                onClick={closeGallery}
                className="text-2xl leading-none"
                aria-label="Close gallery"
              >
                ×
              </button>
            </div>

            <div className="relative">
              {activeImages.length > 1 && (
                <button
                  type="button"
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10 text-white text-3xl"
                  aria-label="Previous image"
                >
                  ‹
                </button>
              )}

              <img
                src={assetUrl(activeImages[activeImageIndex])}
                alt={`${activeProduct.name} preview ${activeImageIndex + 1}`}
                className="w-full max-h-[70vh] object-contain rounded-lg bg-black"
              />

              {activeImages.length > 1 && (
                <button
                  type="button"
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 text-white text-3xl"
                  aria-label="Next image"
                >
                  ›
                </button>
              )}
            </div>

            {activeImages.length > 1 && (
              <div className="mt-4 grid grid-cols-4 sm:grid-cols-6 gap-2">
                {activeImages.map((image, index) => (
                  <button
                    key={`${activeProduct.id}-${image}`}
                    type="button"
                    onClick={() => setActiveImageIndex(index)}
                    className={`rounded-md overflow-hidden border ${
                      index === activeImageIndex
                        ? "border-[#6cebe4]"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={assetUrl(image)}
                      alt={`${activeProduct.name} thumbnail ${index + 1}`}
                      className="w-full aspect-square object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
