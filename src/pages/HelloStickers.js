import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { apiUrl } from "../utils/api";

export default function HelloStickers() {
  const [stickers, setStickers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [galleryPageSize, setGalleryPageSize] = useState(30);
  const [galleryPage, setGalleryPage] = useState(1);
  const [activeStickerIndex, setActiveStickerIndex] = useState(null);
  const touchStartXRef = useRef(null);
  const swipeThreshold = 40;
  useEffect(() => {
    async function fetchAllStickers() {
      setLoading(true);
      try {
        const res = await fetch(apiUrl("/api/checkin-stickers?limit=100"));
        if (res.ok) {
          const data = await res.json();
          setStickers(Array.isArray(data) ? data : []);
        } else {
          setStickers([]);
        }
      } catch {
        setStickers([]);
      }
      setLoading(false);
    }
    fetchAllStickers();
  }, []);

  const formatSavedAt = (value) => {
    if (!value) return "";
    const d = new Date(value);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(d);
  };

  const isRecentlyPosted = (value) => {
    if (!value) return false;
    const parsed = new Date(value).getTime();
    if (Number.isNaN(parsed)) return false;
    return Date.now() - parsed <= 24 * 60 * 60 * 1000;
  };

  const totalGalleryPages = Math.max(
    1,
    Math.ceil(stickers.length / galleryPageSize),
  );
  const pagedStickers = stickers.slice(
    (galleryPage - 1) * galleryPageSize,
    galleryPage * galleryPageSize,
  );

  const openStickerCarousel = (indexOnPage) => {
    const absoluteIndex = (galleryPage - 1) * galleryPageSize + indexOnPage;
    setActiveStickerIndex(absoluteIndex);
  };

  const closeStickerCarousel = () => {
    setActiveStickerIndex(null);
  };

  const showPreviousSticker = useCallback(() => {
    if (stickers.length <= 1 || activeStickerIndex === null) return;
    setActiveStickerIndex(
      (activeStickerIndex - 1 + stickers.length) % stickers.length,
    );
  }, [activeStickerIndex, stickers.length]);

  const showNextSticker = useCallback(() => {
    if (stickers.length <= 1 || activeStickerIndex === null) return;
    setActiveStickerIndex((activeStickerIndex + 1) % stickers.length);
  }, [activeStickerIndex, stickers.length]);

  const handleCarouselTouchStart = (event) => {
    touchStartXRef.current = event.touches[0]?.clientX ?? null;
  };

  const handleCarouselTouchEnd = (event) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = event.changedTouches[0]?.clientX;
    if (touchEndX === undefined) return;
    const deltaX = touchEndX - touchStartXRef.current;
    if (Math.abs(deltaX) < swipeThreshold) return;
    if (deltaX > 0) {
      showPreviousSticker();
    } else {
      showNextSticker();
    }
    touchStartXRef.current = null;
  };

  useEffect(() => {
    setGalleryPage((prev) => Math.min(prev, totalGalleryPages));
  }, [totalGalleryPages]);

  useEffect(() => {
    if (activeStickerIndex === null) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveStickerIndex(null);
      } else if (event.key === "ArrowLeft") {
        showPreviousSticker();
      } else if (event.key === "ArrowRight") {
        showNextSticker();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeStickerIndex, showNextSticker, showPreviousSticker]);

  return (
    <div className="relative p-4 sm:p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Hello Stickers Gallery
      </h1>
      <p className="text-sm text-center mb-8 text-gray-600 dark:text-gray-300">
        Click a sticker to view full size.
      </p>
      {loading ? (
        <div className="text-center text-gray-500 dark:text-gray-400 py-12">
          Loading stickers...
        </div>
      ) : stickers.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 py-12">
          No stickers found.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {pagedStickers.map((sticker, idx) => (
            <div
              key={sticker.createdAt || idx}
              className="flex flex-col items-center gap-0"
            >
              <div className="w-full flex justify-end h-2 pr-0.5 mb-0">
                {isRecentlyPosted(sticker.createdAt) && (
                  <span
                    className="h-2.5 w-2.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.95)] animate-pulse"
                    title="Posted within the last 24 hours"
                    aria-label="Recently posted"
                  />
                )}
              </div>
              <div className="w-full aspect-square bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-200">
                <button
                  type="button"
                  onClick={() => openStickerCarousel(idx)}
                  className="w-full h-full"
                  aria-label={`Open sticker ${idx + 1} in carousel`}
                >
                  <img
                    src={sticker.imageData}
                    alt={`Sticker ${sticker.createdAt || idx}`}
                    className="w-full h-full object-contain select-none"
                    draggable={false}
                    onContextMenu={(event) => event.preventDefault()}
                  />
                </button>
              </div>
              <p className="mt-1 text-[11px] text-gray-500 dark:text-gray-400 text-center leading-none">
                {formatSavedAt(sticker.createdAt)}
              </p>
            </div>
          ))}
        </div>
      )}
      {!loading && stickers.length > 0 && (
        <div className="mt-5 flex items-center justify-between gap-2">
          <label className="inline-flex items-center gap-2 text-xs font-semibold text-gray-600 dark:text-gray-300">
            Per page
            <select
              value={galleryPageSize}
              onChange={(event) => {
                setGalleryPageSize(Number(event.target.value));
                setGalleryPage(1);
              }}
              className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-2 py-1 text-xs text-gray-700 dark:text-gray-200"
            >
              <option value={30}>30</option>
              <option value={60}>60</option>
              <option value={90}>90</option>
            </select>
          </label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setGalleryPage((prev) => Math.max(1, prev - 1))}
              disabled={galleryPage === 1}
              className="rounded-md border border-gray-300 dark:border-gray-600 px-2 py-1 text-xs font-semibold text-gray-700 dark:text-gray-200 disabled:opacity-40"
            >
              Prev
            </button>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {galleryPage}/{totalGalleryPages}
            </span>
            <button
              type="button"
              onClick={() =>
                setGalleryPage((prev) => Math.min(totalGalleryPages, prev + 1))
              }
              disabled={galleryPage >= totalGalleryPages}
              className="rounded-md border border-gray-300 dark:border-gray-600 px-2 py-1 text-xs font-semibold text-gray-700 dark:text-gray-200 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
      <div className="mt-8 flex justify-end">
        <Link
          to={{ pathname: "/", hash: "#check-in" }}
          className="inline-flex w-full sm:w-auto items-center justify-center rounded-md bg-[#6cebe4] text-gray-900 font-semibold px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm hover:brightness-95 transition"
        >
          Back to Check in
        </Link>
      </div>

      {activeStickerIndex !== null && stickers[activeStickerIndex] ? (
        <div
          className="fixed inset-0 z-[120] bg-black/85 p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Sticker carousel"
          onClick={closeStickerCarousel}
        >
          <div className="relative h-full w-full flex items-center justify-center">
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                closeStickerCarousel();
              }}
              className="absolute top-1 right-1 sm:top-2 sm:right-2 rounded-md border border-white/40 bg-black/55 px-3 py-1 text-xs font-semibold text-white hover:bg-black/75"
            >
              Close
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showPreviousSticker();
              }}
              className="absolute left-1 sm:left-3 rounded-full border border-white/40 bg-black/55 h-9 w-9 sm:h-10 sm:w-10 text-white text-xl leading-none hover:bg-black/75"
              aria-label="Previous sticker"
            >
              {"<"}
            </button>

            <div
              className="max-h-full max-w-[96vw] sm:max-w-[88vw] md:max-w-[80vw] lg:max-w-[72vw] flex flex-col items-center"
              onClick={(event) => event.stopPropagation()}
              onTouchStart={handleCarouselTouchStart}
              onTouchEnd={handleCarouselTouchEnd}
            >
              <img
                src={stickers[activeStickerIndex].imageData}
                alt={`Sticker ${activeStickerIndex + 1}`}
                className="max-h-[75vh] w-auto object-contain rounded"
              />
              <p className="mt-2 text-xs text-white/80 text-center">
                {activeStickerIndex + 1} / {stickers.length}
                {stickers[activeStickerIndex].createdAt
                  ? ` • ${formatSavedAt(stickers[activeStickerIndex].createdAt)}`
                  : ""}
              </p>
            </div>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showNextSticker();
              }}
              className="absolute right-1 sm:right-3 rounded-full border border-white/40 bg-black/55 h-9 w-9 sm:h-10 sm:w-10 text-white text-xl leading-none hover:bg-black/75"
              aria-label="Next sticker"
            >
              {">"}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
