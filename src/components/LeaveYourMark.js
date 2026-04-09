// --- Begin full interactive CheckInSection ---
import React, { useState, useRef, useEffect, useCallback } from "react";
import { apiUrl } from "../utils/api";
import { assetUrl } from "../utils/assets";

export default function LeaveYourMark() {
  const stickerTemplateSrc = assetUrl("/images/hero/helloStickerTemplate.png");
  const canvasRef = useRef(null);
  const fluorescentPinkValue = "#ff4fd1";
  const [inkColor, setInkColor] = useState("");
  const [dripsEnabled, setDripsEnabled] = useState(true);
  const [dripIntensity, setDripIntensity] = useState(5);
  const [nibShape, setNibShape] = useState("slanted");
  const [nibSize, setNibSize] = useState(10);
  const [hasDrawingStarted, setHasDrawingStarted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [stickers, setStickers] = useState([]);
  const [viewportWidth, setViewportWidth] = useState(
    typeof window === "undefined" ? 1024 : window.innerWidth,
  );
  const maxExportWidth = 1100;
  const drawStateRef = useRef({
    isDrawing: false,
    lastX: 0,
    lastY: 0,
    smoothX: 0,
    smoothY: 0,
    dripX: 0,
    dripY: 0,
    velocity: 0,
    lastMoveAt: 0,
    lastDripAt: 0,
  });

  const getCanvasPoint = (event) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    return { x, y };
  };

  const addGelPenSparkles = (ctx, width) => {
    const sparkleCount = Math.max(4, Math.round(width / 3.4));
    ctx.save();
    ctx.fillStyle = "rgba(255, 255, 255, 0.92)";
    ctx.strokeStyle = "rgba(255, 255, 255, 0.88)";
    ctx.lineCap = "round";
    for (let index = 0; index < sparkleCount; index += 1) {
      const px = (Math.random() - 0.5) * width * 1.2;
      const py = (Math.random() - 0.5) * width * 0.8;
      const radius = Math.max(0.4, width * (0.04 + Math.random() * 0.05));
      ctx.globalAlpha = 0.45 + Math.random() * 0.42;
      ctx.beginPath();
      ctx.arc(px, py, radius, 0, Math.PI * 2);
      ctx.fill();
      if (Math.random() < 0.72) {
        const streakLength = width * (0.1 + Math.random() * 0.12);
        ctx.lineWidth = Math.max(0.4, radius * 0.9);
        ctx.beginPath();
        ctx.moveTo(px - streakLength / 2, py);
        ctx.lineTo(px + streakLength / 2, py);
        ctx.stroke();
        if (Math.random() < 0.6) {
          ctx.beginPath();
          ctx.moveTo(px, py - streakLength / 2.4);
          ctx.lineTo(px, py + streakLength / 2.4);
          ctx.stroke();
        }
      }
    }
    ctx.restore();
  };

  const stampNib = (ctx, x, y, width = nibSize) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = inkColor;
    ctx.globalAlpha = 0.96;
    if (inkColor === fluorescentPinkValue) {
      ctx.shadowColor = "rgba(255, 255, 255, 0.28)";
      ctx.shadowBlur = Math.max(1.5, width * 0.18);
    }
    if (nibShape === "round") {
      ctx.beginPath();
      ctx.arc(0, 0, width * 0.72, 0, Math.PI * 2);
      ctx.fill();
      if (inkColor === fluorescentPinkValue) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(0, 0, width * 0.72, 0, Math.PI * 2);
        ctx.clip();
        addGelPenSparkles(ctx, width);
        ctx.restore();
      }
    } else {
      ctx.rotate((-34 * Math.PI) / 180);
      ctx.beginPath();
      ctx.ellipse(0, 0, width, width * 0.3, 0, 0, Math.PI * 2);
      ctx.fill();
      if (inkColor === fluorescentPinkValue) {
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(0, 0, width, width * 0.3, 0, 0, Math.PI * 2);
        ctx.clip();
        addGelPenSparkles(ctx, width);
        ctx.restore();
      }
    }
    ctx.restore();
  };

  const drawSegment = (fromX, fromY, toX, toY) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const distance = Math.hypot(toX - fromX, toY - fromY);
    const stepSize =
      nibShape === "round"
        ? Math.max(0.6, nibSize * 0.22)
        : Math.max(1.1, nibSize * 0.3);
    const steps = Math.max(1, Math.ceil(distance / stepSize));
    for (let i = 0; i <= steps; i += 1) {
      const t = i / steps;
      const x = fromX + (toX - fromX) * t;
      const y = fromY + (toY - fromY) * t;
      stampNib(ctx, x, y);
    }
  };

  const addDrip = useCallback(
    (x, y, velocity = 0) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const drawableHeight = Math.max(24, canvas.clientHeight || 0);
      const remainingToBottom = Math.max(6, drawableHeight - y - 1);
      const lengthRoll = Math.random();
      let targetLength;
      if (lengthRoll < 0.3) {
        targetLength = 6 + Math.random() * 20;
      } else if (lengthRoll < 0.75) {
        targetLength = 24 + Math.random() * 90;
      } else if (lengthRoll < 0.9) {
        targetLength = 90 + Math.random() * 180;
      } else {
        targetLength = remainingToBottom * (0.86 + Math.random() * 0.14);
      }
      const dripLength = Math.min(remainingToBottom, targetLength);
      const xOffset = (Math.random() - 0.5) * 4;
      const dripWidth = 0.9 + Math.random() * 2.5;
      ctx.save();
      ctx.strokeStyle = inkColor;
      ctx.fillStyle = inkColor;
      ctx.globalAlpha = 0.85;
      if (inkColor === fluorescentPinkValue) {
        ctx.shadowColor = "rgba(255, 255, 255, 0.26)";
        ctx.shadowBlur = Math.max(1.2, dripWidth * 0.9);
      }
      ctx.lineCap = "round";
      ctx.lineWidth = dripWidth;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + xOffset, y + dripLength);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(
        x + xOffset,
        y + dripLength + 1.5,
        Math.max(0.35, dripWidth * (0.45 + Math.random() * 0.25)),
        0,
        Math.PI * 2,
      );
      ctx.fill();
      if (inkColor === fluorescentPinkValue) {
        const sparkleX = x + xOffset - dripWidth * 0.15;
        const sparkleY = y + dripLength + 1.1;
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.globalAlpha = 0.82;
        ctx.beginPath();
        ctx.arc(
          sparkleX,
          sparkleY,
          Math.max(0.35, dripWidth * 0.22),
          0,
          Math.PI * 2,
        );
        ctx.fill();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.86)";
        ctx.lineWidth = Math.max(0.38, dripWidth * 0.14);
        ctx.beginPath();
        ctx.moveTo(sparkleX - dripWidth * 0.34, sparkleY);
        ctx.lineTo(sparkleX + dripWidth * 0.34, sparkleY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(sparkleX, sparkleY - dripWidth * 0.26);
        ctx.lineTo(sparkleX, sparkleY + dripWidth * 0.26);
        ctx.stroke();
      }
      ctx.restore();
    },
    [inkColor],
  );

  const startDrawing = (event) => {
    if (!inkColor) {
      setSaveMessage("Choose an ink color before drawing.");
      return;
    }
    const point = getCanvasPoint(event);
    if (!point) return;
    const state = drawStateRef.current;
    if (event.cancelable) event.preventDefault();
    state.isDrawing = true;
    state.lastX = point.x;
    state.lastY = point.y;
    state.smoothX = point.x;
    state.smoothY = point.y;
    state.dripX = point.x;
    state.dripY = point.y;
    state.velocity = 0;
    state.lastMoveAt = Date.now();
    state.lastDripAt = 0;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && event.pointerId !== undefined) {
      canvas.setPointerCapture?.(event.pointerId);
    }
    if (ctx) {
      stampNib(ctx, point.x, point.y);
      setHasDrawingStarted(true);
    }
  };

  const continueDrawing = (event) => {
    const state = drawStateRef.current;
    if (!state.isDrawing) return;
    if (event.cancelable) event.preventDefault();
    const point = getCanvasPoint(event);
    if (!point) return;
    const now = Date.now();
    const smoothX = state.smoothX + (point.x - state.smoothX) * 0.55;
    const smoothY = state.smoothY + (point.y - state.smoothY) * 0.55;
    const distance = Math.hypot(smoothX - state.lastX, smoothY - state.lastY);
    const deltaMs = Math.max(1, now - state.lastMoveAt);
    drawSegment(state.lastX, state.lastY, smoothX, smoothY);
    state.lastX = smoothX;
    state.lastY = smoothY;
    state.smoothX = smoothX;
    state.smoothY = smoothY;
    state.velocity = distance / deltaMs;
    state.lastMoveAt = now;
  };

  const stopDrawing = (event) => {
    drawStateRef.current.isDrawing = false;
    const canvas = canvasRef.current;
    if (canvas && event?.pointerId !== undefined) {
      canvas.releasePointerCapture?.(event.pointerId);
    }
  };

  const clearDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawingStarted(false);
  };

  const fetchCheckInFeed = useCallback(async () => {
    try {
      const stickersRes = await fetch(
        apiUrl("/api/checkin-stickers?limit=300"),
      );
      if (stickersRes.ok) {
        const stickerRows = await stickersRes.json();
        setStickers(Array.isArray(stickerRows) ? stickerRows : []);
      }
    } catch {
      // Ignore feed errors and keep drawing available.
    }
  }, []);

  const exportStickerPng = async () => {
    const drawCanvas = canvasRef.current;
    if (!drawCanvas) return null;
    const templateImage = new Image();
    templateImage.crossOrigin = "anonymous";
    templateImage.src = stickerTemplateSrc;
    await new Promise((resolve, reject) => {
      templateImage.onload = resolve;
      templateImage.onerror = reject;
    });
    const sourceWidth = templateImage.naturalWidth || 1600;
    const sourceHeight = templateImage.naturalHeight || 1200;
    const exportScale = Math.min(1, maxExportWidth / sourceWidth);
    const exportWidth = Math.max(1, Math.round(sourceWidth * exportScale));
    const exportHeight = Math.max(1, Math.round(sourceHeight * exportScale));
    const exportCanvas = document.createElement("canvas");
    exportCanvas.width = exportWidth;
    exportCanvas.height = exportHeight;
    const exportCtx = exportCanvas.getContext("2d");
    if (!exportCtx) return null;
    exportCtx.drawImage(templateImage, 0, 0, exportWidth, exportHeight);
    exportCtx.drawImage(drawCanvas, 0, 0, exportWidth, exportHeight);
    // Trim fully transparent rows so saved sticker PNG has no extra vertical space.
    const imageData = exportCtx.getImageData(0, 0, exportWidth, exportHeight);
    const { data } = imageData;
    let top = 0;
    let bottom = exportHeight - 1;
    const rowHasInk = (rowIndex) => {
      const rowStart = rowIndex * exportWidth * 4;
      const rowEnd = rowStart + exportWidth * 4;
      for (let i = rowStart + 3; i < rowEnd; i += 4) {
        if (data[i] !== 0) return true;
      }
      return false;
    };
    while (top < exportHeight && !rowHasInk(top)) top += 1;
    while (bottom >= top && !rowHasInk(bottom)) bottom -= 1;
    if (top <= bottom) {
      const trimmedHeight = bottom - top + 1;
      if (trimmedHeight < exportHeight) {
        const trimmedCanvas = document.createElement("canvas");
        trimmedCanvas.width = exportWidth;
        trimmedCanvas.height = trimmedHeight;
        const trimmedCtx = trimmedCanvas.getContext("2d");
        if (trimmedCtx) {
          trimmedCtx.drawImage(
            exportCanvas,
            0,
            top,
            exportWidth,
            trimmedHeight,
            0,
            0,
            exportWidth,
            trimmedHeight,
          );
          return trimmedCanvas.toDataURL("image/png");
        }
      }
    }
    return exportCanvas.toDataURL("image/png");
  };

  const saveSticker = async () => {
    if (isSaving) return;
    setIsSaving(true);
    setSaveMessage("");
    try {
      const pngData = await exportStickerPng();
      if (!pngData) {
        setSaveMessage("Could not export sticker PNG.");
        setIsSaving(false);
        return;
      }
      const response = await fetch(apiUrl("/api/checkin-stickers"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "Anonymous",
          imageData: pngData,
        }),
      });
      if (!response.ok) {
        let errorMessage = "Online save failed.";
        try {
          const errorBody = await response.json();
          if (errorBody?.error) {
            errorMessage = errorBody.error;
            if (errorBody.retryAfterSeconds) {
              const retryMinutes = Math.ceil(
                Number(errorBody.retryAfterSeconds) / 60,
              );
              errorMessage = `${errorMessage} Try again in about ${retryMinutes} min.`;
            }
          }
        } catch {
          // Keep fallback message when response body is not JSON.
        }
        setSaveMessage(errorMessage);
        setIsSaving(false);
        return;
      }
      let responseBody = null;
      try {
        responseBody = await response.json();
      } catch {
        responseBody = null;
      }

      const moderationStatus = responseBody?.moderationStatus || "approved";
      if (moderationStatus === "rejected") {
        setSaveMessage(
          "Sticker was rejected by the content policy and was not published.",
        );
      } else if (moderationStatus === "pending") {
        setSaveMessage(
          "Sticker submitted for moderation. It will appear publicly after approval.",
        );
      } else {
        setSaveMessage("Sticker saved.");
      }

      clearDrawing();
      await fetchCheckInFeed();
    } catch {
      setSaveMessage("Online save failed. Please try again.");
    }
    setIsSaving(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const cssWidth = parent.clientWidth;
      const cssHeight = parent.clientHeight;
      if (!cssWidth || !cssHeight) return;
      const ratio = window.devicePixelRatio || 1;
      const bufferWidth = Math.max(1, Math.floor(cssWidth * ratio));
      const bufferHeight = Math.max(1, Math.floor(cssHeight * ratio));
      // Only resize if necessary
      if (
        canvas.width === bufferWidth &&
        canvas.height === bufferHeight &&
        canvas.style.width === `${cssWidth}px` &&
        canvas.style.height === `${cssHeight}px`
      ) {
        return;
      }
      // Save current drawing
      let snapshot = null;
      if (canvas.width > 0 && canvas.height > 0) {
        snapshot = document.createElement("canvas");
        snapshot.width = canvas.width;
        snapshot.height = canvas.height;
        const snapCtx = snapshot.getContext("2d");
        if (snapCtx) {
          snapCtx.drawImage(canvas, 0, 0);
        }
      }
      // Set buffer size and CSS size
      canvas.width = bufferWidth;
      canvas.height = bufferHeight;
      canvas.style.width = `${cssWidth}px`;
      canvas.style.height = `${cssHeight}px`;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(ratio, ratio);
      // Restore drawing
      if (snapshot) {
        ctx.drawImage(
          snapshot,
          0,
          0,
          snapshot.width,
          snapshot.height,
          0,
          0,
          bufferWidth / ratio,
          bufferHeight / ratio,
        );
      }
    };
    // Only resize on orientationchange/resize, never clear drawing on scroll
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("orientationchange", resizeCanvas);
    window.visualViewport?.addEventListener("resize", resizeCanvas);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("orientationchange", resizeCanvas);
      window.visualViewport?.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      const state = drawStateRef.current;
      if (!state.isDrawing) return;
      if (!dripsEnabled) return;
      const now = Date.now();
      const sinceLastDrip = now - state.lastDripAt;
      // intensity 1=slow (~500ms), 5=default (~95ms), 10=fast (~15ms)
      const minDripInterval = Math.round(550 - dripIntensity * 53);
      if (sinceLastDrip > minDripInterval) {
        addDrip(state.lastX, state.lastY, state.velocity);
        const extraChance = 0.3 + (dripIntensity - 1) * 0.07;
        if (Math.random() < extraChance) {
          addDrip(
            state.lastX + (Math.random() - 0.5) * 4,
            state.lastY + 1,
            state.velocity,
          );
        }
        state.lastDripAt = now;
      }
    }, 75);
    return () => window.clearInterval(timer);
  }, [addDrip, dripsEnabled, dripIntensity]);

  useEffect(() => {
    fetchCheckInFeed();
  }, [fetchCheckInFeed]);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const inks = [
    { label: "Red", value: "#b91c1c" },
    { label: "Black", value: "#111111" },
    { label: "Blue", value: "#1d4ed8" },
    { label: "Yellow", value: "#facc15" },
    { label: "Silver", value: "#bcc2cb" },
    { label: "Gold", value: "#b8952a" },
    { label: "Pink Gel", value: fluorescentPinkValue },
  ];

  const getInkTextColor = (value) => {
    if (!value) return "#374151";
    if (
      value === "#bcc2cb" ||
      value === "#facc15" ||
      value === "#b8952a" ||
      value === fluorescentPinkValue
    ) {
      return "#111111";
    }
    return "#ffffff";
  };

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

  const visibleStickerCount =
    viewportWidth < 640 ? 3 : viewportWidth < 1024 ? 4 : 6;
  const recentStickers = stickers.slice(0, visibleStickerCount);

  return (
    <section id="check-in" className="px-4 sm:px-6 pb-8 scroll-mt-24">
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 shadow-sm p-4 sm:p-5 md:p-6">
        <div className="mb-4">
          <p className="text-xs uppercase tracking-[0.16em] text-[#6cebe4] font-semibold mb-1">
            Check-In
          </p>
          <h2 className="text-2xl md:text-3xl font-bold">Leave Your Mark</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            Draw directly on the sticker template with a slanted calligraphy
            nib. Toggle drips, switch nib shape, and adjust nib size.
          </p>
        </div>
        {saveMessage && (
          <p className="text-sm mb-3 text-gray-700 dark:text-gray-300">
            {saveMessage}
          </p>
        )}
        <div className="w-full max-w-3xl lg:max-w-full mx-auto lg:mx-0 mt-4 mb-3">
          <div className="grid grid-cols-1 sm:flex sm:flex-wrap lg:flex-nowrap items-stretch sm:items-center justify-center sm:justify-start gap-2">
            <label className="inline-flex w-full sm:w-auto lg:flex-1 lg:min-w-0 lg:min-h-[56px] items-center gap-2 rounded-md border border-gray-300 dark:border-gray-600 px-2.5 py-1.5">
              <span className="text-xs font-semibold uppercase tracking-[0.08em] text-gray-600 dark:text-gray-300">
                Color
              </span>
              <select
                value={inkColor}
                onChange={(event) => setInkColor(event.target.value)}
                className="w-full flex-1 min-w-0 rounded-md border border-gray-300 dark:border-gray-600 px-2 py-1 text-sm"
                style={{
                  backgroundColor: inkColor || "#ffffff",
                  color: getInkTextColor(inkColor),
                }}
                aria-label="Select ink color"
              >
                <option value="" disabled>
                  Choose color
                </option>
                {inks.map((ink) => (
                  <option
                    key={ink.value}
                    value={ink.value}
                    style={{
                      backgroundColor: ink.value,
                      color: getInkTextColor(ink.value),
                    }}
                  >
                    {ink.label}
                  </option>
                ))}
              </select>
            </label>

            <div className="w-full sm:w-auto lg:flex-1 lg:min-w-0 lg:min-h-[56px] flex items-center justify-between gap-2 rounded-md border border-gray-300 dark:border-gray-600 px-2.5 py-1.5">
              <div className="w-[124px] flex items-center gap-2 rounded-md border border-gray-300 dark:border-gray-600 p-1.5">
                <span className="text-xs font-semibold uppercase tracking-[0.08em] text-gray-600 dark:text-gray-300">
                  Drips
                </span>
                <button
                  type="button"
                  onClick={() => setDripsEnabled((enabled) => !enabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${dripsEnabled ? "bg-green-600" : "bg-gray-400 dark:bg-gray-600"}`}
                  aria-pressed={dripsEnabled}
                  aria-label="Toggle drips"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${dripsEnabled ? "translate-x-6" : "translate-x-1"}`}
                  />
                </button>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.08em] text-gray-600 dark:text-gray-300">
                  Flow
                </span>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={dripIntensity}
                  onChange={(event) =>
                    setDripIntensity(Number(event.target.value))
                  }
                  className="w-20"
                  id="drip-intensity"
                  name="drip-intensity"
                  disabled={!dripsEnabled}
                />
                <span className="text-xs font-semibold w-4 text-right text-gray-700 dark:text-gray-200">
                  {dripIntensity}
                </span>
              </div>
            </div>

            <div className="w-full sm:w-auto lg:flex-1 lg:min-w-0 lg:min-h-[56px] flex items-center justify-between gap-2 rounded-md border border-gray-300 dark:border-gray-600 px-2.5 py-1.5">
              <div className="flex items-center gap-2 rounded-md border border-gray-300 dark:border-gray-600 p-1.5">
                <span className="text-xs font-semibold uppercase tracking-[0.08em] text-gray-600 dark:text-gray-300">
                  Shape
                </span>
                <button
                  type="button"
                  onClick={() => setNibShape("slanted")}
                  className={`h-8 w-8 rounded text-sm font-semibold transition-colors ${nibShape === "slanted" ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900" : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                  aria-label="Slanted nib"
                  title="Slanted nib"
                >
                  /\
                </button>
                <button
                  type="button"
                  onClick={() => setNibShape("round")}
                  className={`h-8 w-8 rounded text-base font-semibold transition-colors ${nibShape === "round" ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900" : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                  aria-label="Round nib"
                  title="Round nib"
                >
                  ●
                </button>
              </div>
              <label className="ml-auto flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.08em] text-gray-600 dark:text-gray-300">
                  Nib
                </span>
                <input
                  type="range"
                  min="5"
                  max="22"
                  step="1"
                  value={nibSize}
                  onChange={(event) => setNibSize(Number(event.target.value))}
                  className="w-24"
                  id="nib-size"
                  name="nib-size"
                />
                <span className="text-xs font-semibold w-5 text-right text-gray-700 dark:text-gray-200">
                  {nibSize}
                </span>
              </label>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] xl:grid-cols-[minmax(0,48rem)_minmax(0,1fr)] gap-[10px] lg:gap-x-[10px] items-stretch">
          <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1 mb-1 lg:col-span-2">
            Community policy: submissions containing racist, hateful, or harmful
            symbols are blocked from publication.
          </p>
          <div className="w-full max-w-4xl mx-auto lg:mx-0">
            <div
              className="relative aspect-[4/3] select-none"
              onContextMenu={(event) => event.preventDefault()}
              style={{
                userSelect: "none",
                WebkitUserSelect: "none",
                WebkitTouchCallout: "none",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              <img
                src={stickerTemplateSrc}
                alt="Hello sticker template"
                className="absolute inset-0 w-full h-full object-contain"
                draggable={false}
                onDragStart={(event) => event.preventDefault()}
              />
              <canvas
                ref={canvasRef}
                onPointerDown={startDrawing}
                onPointerMove={continueDrawing}
                onPointerUp={stopDrawing}
                onPointerLeave={stopDrawing}
                onPointerCancel={stopDrawing}
                className="absolute inset-0 w-full h-full touch-none cursor-crosshair"
                onContextMenu={(event) => event.preventDefault()}
                style={{
                  touchAction: "none",
                  userSelect: "none",
                  WebkitUserSelect: "none",
                  WebkitTouchCallout: "none",
                  WebkitTapHighlightColor: "transparent",
                }}
              />
            </div>
            <div className="mt-3 flex flex-col gap-2">
              <button
                type="button"
                onClick={saveSticker}
                disabled={isSaving || !hasDrawingStarted}
                className="w-full px-3 py-2 rounded-md border border-[#2f7f13] bg-[#4cbb17] text-white text-sm font-semibold hover:brightness-95 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? "Posting..." : "POST IT"}
              </button>
              <button
                type="button"
                onClick={clearDrawing}
                className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 h-auto lg:h-full flex flex-col mt-2 lg:mt-0">
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-gray-500 dark:text-gray-300 mb-3">
              Recent Check-Ins
            </h3>
            {stickers.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2 overflow-visible lg:overflow-y-auto pr-1 flex-none lg:flex-1 content-start max-h-none lg:max-h-[85vh]">
                {recentStickers.map((sticker, idx) => (
                  <div
                    key={sticker.createdAt || idx}
                    className="overflow-hidden flex flex-col gap-0"
                  >
                    <div className="flex justify-end h-1.5 sm:h-2 pr-0.5 mb-0">
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${
                          isRecentlyPosted(sticker.createdAt)
                            ? "bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.95)] animate-pulse"
                            : "bg-gray-300 dark:bg-gray-600"
                        }`}
                        title={
                          isRecentlyPosted(sticker.createdAt)
                            ? "Posted within the last 24 hours"
                            : "Posted more than 24 hours ago"
                        }
                        aria-label={
                          isRecentlyPosted(sticker.createdAt)
                            ? "Recently posted"
                            : "Older post"
                        }
                      />
                    </div>
                    <div className="w-full aspect-square rounded-sm overflow-hidden">
                      <img
                        src={sticker.imageData}
                        alt={`Saved sticker ${sticker.createdAt || idx}`}
                        className="w-full h-full object-contain bg-transparent p-0"
                      />
                    </div>
                    <p className="mt-0 text-[10px] text-center text-gray-400 dark:text-gray-500 leading-none">
                      {formatSavedAt(sticker.createdAt)}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No saved stickers yet. Save one to get started.
              </p>
            )}
            <a
              href="/hello-stickers"
              className="mt-4 inline-flex items-center justify-center rounded-md bg-[#6cebe4] text-gray-900 font-semibold px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm hover:brightness-95 transition"
            >
              View Full Sticker Gallery
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
