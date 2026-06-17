import React, { useEffect, useRef, useState } from "react";

async function doNativeShare(imageData) {
  const shareUrl = window.location.origin + "/hello-stickers";
  const shareTitle = "Hello Sticker \u2014 Mike's Art Dept";
  const shareText =
    "Check out this sticker from Mike's Art Dept! Come say hello \ud83d\udc4b";
  try {
    const res = await fetch(imageData);
    const blob = await res.blob();
    const file = new File([blob], "hello-sticker.webp", { type: blob.type });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        files: [file],
        title: shareTitle,
        text: shareText,
        url: shareUrl,
      });
      return;
    }
  } catch {
    // file sharing not supported — try URL-only
  }
  if (navigator.share) {
    try {
      await navigator.share({
        title: shareTitle,
        text: shareText,
        url: shareUrl,
      });
      return;
    } catch {
      // cancelled or unsupported
    }
  }
  // Final fallback: download
  const a = document.createElement("a");
  a.href = imageData;
  a.download = "hello-sticker.png";
  a.click();
}

export default function StickerShareMenu({ imageData }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handleOutside = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [open]);

  if (!imageData) return null;

  const shareUrl = window.location.origin + "/hello-stickers";
  const tweetText = encodeURIComponent(
    "Check out this sticker from Mike's Art Dept!",
  );
  const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}&url=${encodeURIComponent(shareUrl)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;

  return (
    <div className="relative inline-block" ref={rootRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 px-4 py-2 rounded-md bg-[#6cebe4] text-gray-900 text-sm font-bold hover:brightness-95 transition-colors select-none"
        aria-haspopup="true"
        aria-expanded={open}
      >
        {"Share \u2197"}
      </button>

      {open && (
        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-950 border border-white/15 rounded-xl overflow-hidden shadow-2xl z-20 min-w-[190px]">
          <button
            type="button"
            onClick={() => {
              doNativeShare(imageData);
              setOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-white hover:bg-white/10 transition-colors border-b border-white/10"
          >
            <span>{"\ud83d\udce4"}</span>
            <span>Share (native)</span>
          </button>
          <a
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-sm text-white hover:bg-white/10 transition-colors border-b border-white/10"
          >
            <span className="font-bold text-[15px] leading-none">f</span>
            <span>Facebook</span>
          </a>
          <button
            type="button"
            onClick={() => {
              const a = document.createElement("a");
              a.href = imageData;
              a.download = "hello-sticker.png";
              a.click();
              setOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-white hover:bg-white/10 transition-colors border-b border-white/10"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              style={{ flexShrink: 0 }}
            >
              <defs>
                <linearGradient id="ig-ssm" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f9ce34" />
                  <stop offset="30%" stopColor="#ee2a7b" />
                  <stop offset="100%" stopColor="#6228d7" />
                </linearGradient>
              </defs>
              <rect
                x="2"
                y="2"
                width="20"
                height="20"
                rx="5"
                ry="5"
                stroke="url(#ig-ssm)"
                strokeWidth="2"
              />
              <circle
                cx="12"
                cy="12"
                r="4.5"
                stroke="url(#ig-ssm)"
                strokeWidth="2"
              />
              <circle cx="17.5" cy="6.5" r="1.2" fill="url(#ig-ssm)" />
            </svg>
            <span>Instagram</span>
          </button>
          <a
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-sm text-white hover:bg-white/10 transition-colors border-b border-white/10"
          >
            <span className="font-black text-base leading-none">
              {"\ud835\udd4f"}
            </span>
            <span>Post on X</span>
          </a>
          <a
            href={linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-sm text-white hover:bg-white/10 transition-colors border-b border-white/10"
          >
            <span className="font-bold text-[13px] leading-none">in</span>
            <span>LinkedIn</span>
          </a>
          <button
            type="button"
            onClick={() => {
              const a = document.createElement("a");
              a.href = imageData;
              a.download = "hello-sticker.png";
              a.click();
              setOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-white hover:bg-white/10 transition-colors"
          >
            <span>{"\u2b07\ufe0f"}</span>
            <span>Download PNG</span>
          </button>
        </div>
      )}
    </div>
  );
}
