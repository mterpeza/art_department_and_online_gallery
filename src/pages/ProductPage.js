import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { assetUrl } from "../utils/assets";
import { CONTACT_MAILTO } from "../utils/contact";
import { trackContactClick } from "../utils/analytics";
import {
  personalProducts,
  cooperIllustrationProducts,
  otherDetailProducts,
} from "../data/products";

export default function ProductPage() {
  const { productId } = useParams();
  const product =
    personalProducts.find((p) => p.id === productId) ||
    cooperIllustrationProducts.find((p) => p.id === productId) ||
    otherDetailProducts.find((p) => p.id === productId);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const isCooperIllustration = cooperIllustrationProducts.some(
    (p) => p.id === productId,
  );
  const backTo = isCooperIllustration
    ? "/shop?openGrid=cooper-diers-ordinary-pals-original-illustrations"
    : "/shop";
  const backLabel = isCooperIllustration
    ? "← Back to Ordinary Pals"
    : "← Back to Store";

  if (!product) {
    return (
      <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <Link
          to="/shop"
          className="text-[#ff4000] dark:text-[#6cebe4] hover:underline"
        >
          ← Back to Store
        </Link>
      </main>
    );
  }

  const images = product.galleryImages?.length
    ? product.galleryImages
    : [product.image];
  const mailtoHref = `${CONTACT_MAILTO}?subject=${encodeURIComponent(`Inquiry: ${product.name}`)}`;

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Back link */}
        <Link
          to={backTo}
          className="inline-flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-[#ff4000] dark:hover:text-[#6cebe4] transition-colors mb-8"
        >
          {backLabel}
        </Link>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* ── Left: Images ── */}
          <div>
            {/* Main image */}
            <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 mb-3 shadow-md">
              <img
                key={images[selectedIndex]}
                src={assetUrl(images[selectedIndex])}
                alt={`${product.name} — view ${selectedIndex + 1}`}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Thumbnail strip */}
            {images.length > 1 && (
              <div className="flex gap-2 flex-wrap">
                {images.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedIndex(i)}
                    aria-label={`View image ${i + 1}`}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all focus:outline-none ${
                      i === selectedIndex
                        ? "border-[#ff4000] dark:border-[#6cebe4] shadow"
                        : "border-transparent opacity-60 hover:opacity-100 hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                  >
                    <img
                      src={assetUrl(img)}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Right: Info ── */}
          <div className="flex flex-col">
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#ff4000] dark:text-[#6cebe4] font-semibold mb-2">
              Original Artwork
            </p>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-2">
              {product.name}
            </h1>
            {product.year && (
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                {product.year}
              </p>
            )}
            {product.medium && (
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {product.medium}
              </p>
            )}

            {/* Status badge */}
            {product.soldOut ? (
              <span className="self-start inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 mb-6">
                Sold Out
              </span>
            ) : product.comingSoon ? (
              <span className="self-start inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 mb-6">
                Coming Soon
              </span>
            ) : product.inquiryOnly ? (
              <span className="self-start inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 mb-6">
                Inquiry Only
              </span>
            ) : null}

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                Interested in this piece? Reach out directly for pricing,
                availability, and shipping information.
              </p>

              {!product.soldOut && (
                <a
                  href={mailtoHref}
                  className="inline-flex items-center justify-center w-full px-6 py-3 rounded-lg bg-[#ff4000] dark:bg-[#6cebe4] text-white dark:text-gray-900 font-semibold hover:brightness-95 transition text-sm"
                  onClick={() => trackContactClick("product_page")}
                >
                  Contact Me About This Piece
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
