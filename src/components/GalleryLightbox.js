import React, { useEffect, useRef } from "react";
import { assetUrl } from "../utils/assets";

export default function GalleryLightbox({
  isOpen,
  images,
  activeIndex,
  title,
  viewerAriaLabel,
  onClose,
  onPrev,
  onNext,
  onSelectIndex,
  getImageAlt,
  overlayRef,
  onContentTouchStart,
  onContentTouchEnd,
  resolveImageSrc,
  renderCaption,
  alwaysShowThumbRail = false,
  fullScreen = false,
  largeThumbs = false,
  allowNav = false,
}) {
  const galleryImages = Array.isArray(images) ? images : [];
  const hasMultipleImages = galleryImages.length > 1;
  const canNav = hasMultipleImages || allowNav;
  const boundedIndex =
    typeof activeIndex === "number" && galleryImages.length
      ? Math.min(Math.max(activeIndex, 0), galleryImages.length - 1)
      : 0;
  const activeImage = galleryImages[boundedIndex] || null;
  const resolveAlt =
    typeof getImageAlt === "function"
      ? getImageAlt
      : (index) => `${title} ${index + 1}`;
  const resolveSrc =
    typeof resolveImageSrc === "function" ? resolveImageSrc : assetUrl;
  const overlayClass = fullScreen
    ? "fixed inset-0 z-[200] bg-black flex items-start justify-center overflow-hidden p-0"
    : "fixed inset-0 z-[90] bg-black/90 backdrop-blur-sm flex items-start justify-center overflow-hidden p-2 sm:p-4 pt-14 sm:pt-16";
  const contentClass = fullScreen
    ? "flex h-[100dvh] w-[100vw] flex-col items-center gap-3 px-2 sm:px-4 py-3 sm:py-4"
    : "flex h-[calc(100dvh-4rem)] sm:h-[calc(100dvh-5rem)] w-full max-w-[min(1000px,96vw)] flex-col items-center gap-3";
  const imageWrapClass =
    fullScreen || alwaysShowThumbRail
      ? "flex min-h-0 flex-1 w-full items-center justify-center rounded-lg max-h-[calc(100dvh-16rem)]"
      : "flex min-h-0 flex-1 w-full items-center justify-center rounded-lg";
  const thumbButtonClass = largeThumbs
    ? "h-16 w-16 sm:h-20 sm:w-20"
    : "h-14 w-14 sm:h-16 sm:w-16";
  const thumbRailRef = useRef(null);
  const thumbButtonRefs = useRef([]);

  useEffect(() => {
    if (!isOpen) return;
    const rail = thumbRailRef.current;
    const activeThumb = thumbButtonRefs.current[boundedIndex];
    if (!rail || !activeThumb) return;
    // Scroll only the thumb rail container — never the document
    const railWidth = rail.clientWidth;
    const thumbLeft = activeThumb.offsetLeft;
    const thumbWidth = activeThumb.offsetWidth;
    rail.scrollTo({
      left: thumbLeft - railWidth / 2 + thumbWidth / 2,
      behavior: "smooth",
    });
  }, [isOpen, boundedIndex, galleryImages.length]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className={overlayClass}
      onClick={onClose}
      onTouchEnd={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={viewerAriaLabel}
    >
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onClose();
        }}
        className="absolute top-3 right-3 sm:top-4 sm:right-4 h-10 w-10 rounded-full bg-black/55 text-white text-2xl leading-none hover:bg-black/70"
        aria-label="Close image viewer"
      >
        x
      </button>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          if (canNav) onPrev();
        }}
        className={`absolute left-2 sm:left-4 md:left-8 top-[42vh] -translate-y-1/2 h-10 w-10 rounded-full bg-black/55 text-white text-3xl leading-none hover:bg-black/70 ${
          canNav ? "" : "opacity-40 cursor-not-allowed"
        }`}
        aria-label="Previous image"
        disabled={!canNav}
      >
        {"<"}
      </button>

      <div
        className={contentClass}
        onClick={(event) => event.stopPropagation()}
        onTouchStart={onContentTouchStart}
        onTouchEnd={onContentTouchEnd}
      >
        <div className={imageWrapClass}>
          {activeImage ? (
            <img
              src={resolveSrc(activeImage)}
              alt={resolveAlt(boundedIndex)}
              className="block max-h-full max-w-full rounded-lg object-contain"
            />
          ) : (
            <div className="rounded-lg border border-white/30 bg-black/30 px-4 py-3 text-sm text-white">
              Image unavailable.
            </div>
          )}
        </div>

        {typeof renderCaption === "function" ? (
          <div className="w-full shrink-0 text-center">
            {renderCaption(boundedIndex)}
          </div>
        ) : null}

        {galleryImages.length > 0 ? (
          <div
            ref={thumbRailRef}
            className="w-full shrink-0 overflow-x-auto pb-1"
          >
            <div className="mx-auto flex w-max min-w-full justify-center gap-2 px-1">
              {galleryImages.map((image, index) => {
                const isActive = index === boundedIndex;
                return (
                  <button
                    key={`${title}-thumb-${index}`}
                    ref={(node) => {
                      thumbButtonRefs.current[index] = node;
                    }}
                    type="button"
                    onClick={() => onSelectIndex(index)}
                    className={`${thumbButtonClass} shrink-0 overflow-hidden rounded-md border transition-all ${
                      isActive
                        ? "border-[#f2c86e] ring-2 ring-[#f2c86e]/80"
                        : "border-white/35 hover:border-white/70"
                    }`}
                    aria-label={`Open image ${index + 1}`}
                  >
                    <img
                      src={resolveSrc(image)}
                      alt={`${title} thumbnail ${index + 1}`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          if (canNav) onNext();
        }}
        className={`absolute right-2 sm:right-4 md:right-8 top-[42vh] -translate-y-1/2 h-10 w-10 rounded-full bg-black/55 text-white text-3xl leading-none hover:bg-black/70 ${
          canNav ? "" : "opacity-40 cursor-not-allowed"
        }`}
        aria-label="Next image"
        disabled={!canNav}
      >
        {">"}
      </button>
    </div>
  );
}
