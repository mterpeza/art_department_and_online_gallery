const squareIds = ["squareFour", "squareThree", "squareTwo", "squareOne"];

function randomHexColor() {
  const value = Math.floor(Math.random() * 0xffffff).toString(16);
  return `#${value.padStart(6, "0")}`;
}

function randomize() {
  squareIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.style.background = randomHexColor();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const canvasButton = document.getElementById("albersCanvas");
  const prompt = document.getElementById("squarePrompt");
  const shareWrapper = document.getElementById("shareWrapper");
  const shareBtn = document.getElementById("shareBtn");
  const shareMenu = document.getElementById("shareMenu");
  let lastInteractionMs = 0;
  let menuOpen = false;

  if (!canvasButton) return;

  // Update prompt text for touch/tablet devices.
  if (prompt && window.matchMedia("(pointer: coarse)").matches) {
    prompt.textContent = "Tap to Create!";
  }

  // --- Composition capture ---
  const captureBlob = () =>
    new Promise((resolve) => {
      const ids = ["squareFour", "squareThree", "squareTwo", "squareOne"];
      const elements = ids.map((id) => document.getElementById(id));
      if (!elements[0] || !elements[0].style.background) {
        resolve(null);
        return;
      }
      const base = elements[0].getBoundingClientRect();
      if (base.width === 0 || base.height === 0) {
        resolve(null);
        return;
      }
      const outputWidth = 800;
      const scale = outputWidth / base.width;
      const offscreen = document.createElement("canvas");
      offscreen.width = outputWidth;
      offscreen.height = Math.round(base.height * scale);
      const ctx = offscreen.getContext("2d");
      if (!ctx) {
        resolve(null);
        return;
      }
      for (const el of elements) {
        const rect = el.getBoundingClientRect();
        ctx.fillStyle = el.style.background || "transparent";
        ctx.fillRect(
          (rect.left - base.left) * scale,
          (rect.top - base.top) * scale,
          rect.width * scale,
          rect.height * scale,
        );
      }
      offscreen.toBlob((blob) => resolve(blob), "image/png");
    });

  const downloadBlob = (blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "random-albers.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  // --- Menu open/close ---
  const closeMenu = () => {
    menuOpen = false;
    if (shareMenu) shareMenu.hidden = true;
    if (shareBtn) shareBtn.setAttribute("aria-expanded", "false");
  };

  const openMenu = () => {
    menuOpen = true;
    if (shareMenu) shareMenu.hidden = false;
    if (shareBtn) shareBtn.setAttribute("aria-expanded", "true");
  };

  if (shareBtn) {
    shareBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      menuOpen ? closeMenu() : openMenu();
    });
  }

  document.addEventListener("click", (e) => {
    if (menuOpen && shareWrapper && !shareWrapper.contains(e.target))
      closeMenu();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menuOpen) closeMenu();
  });

  // --- Share URL for social links ---
  const sharePageUrl = window.location.href;
  const shareText = encodeURIComponent(
    "Check out this Random Albers composition!",
  );
  const fbEl = document.getElementById("smFacebook");
  const twEl = document.getElementById("smTwitter");
  const liEl = document.getElementById("smLinkedIn");
  if (fbEl)
    fbEl.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(sharePageUrl)}`;
  if (twEl)
    twEl.href = `https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(sharePageUrl)}`;
  if (liEl)
    liEl.href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(sharePageUrl)}`;

  // --- Native share ---
  const nativeBtn = document.getElementById("smNative");
  if (nativeBtn) {
    nativeBtn.addEventListener("click", async () => {
      closeMenu();
      const blob = await captureBlob();
      if (!blob) return;
      const file = new File([blob], "random-albers.png", { type: "image/png" });
      const shareTitle = "Random Albers";
      try {
        if (navigator.canShare?.({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: shareTitle,
            url: sharePageUrl,
          });
          return;
        }
      } catch (err) {
        if (err.name === "AbortError") return;
      }
      if (navigator.share) {
        try {
          await navigator.share({ title: shareTitle, url: sharePageUrl });
          return;
        } catch {}
      }
      downloadBlob(blob);
    });
  }

  // --- Instagram (download) ---
  const igBtn = document.getElementById("smInstagram");
  if (igBtn) {
    igBtn.addEventListener("click", async () => {
      closeMenu();
      const blob = await captureBlob();
      if (blob) downloadBlob(blob);
    });
  }

  // --- Download PNG ---
  const dlBtn = document.getElementById("smDownload");
  if (dlBtn) {
    dlBtn.addEventListener("click", async () => {
      closeMenu();
      const blob = await captureBlob();
      if (blob) downloadBlob(blob);
    });
  }

  // --- Social link close-on-click ---
  ["smFacebook", "smTwitter", "smLinkedIn"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("click", closeMenu);
  });

  // --- Canvas interaction ---
  const handleCreate = () => {
    const now = Date.now();
    if (now - lastInteractionMs < 220) return;
    lastInteractionMs = now;
    randomize();
    if (prompt && !prompt.classList.contains("hidden"))
      prompt.classList.add("hidden");
    if (shareWrapper && shareWrapper.hidden) shareWrapper.hidden = false;
  };

  canvasButton.addEventListener("click", handleCreate);
  canvasButton.addEventListener("touchstart", handleCreate, { passive: true });
});
