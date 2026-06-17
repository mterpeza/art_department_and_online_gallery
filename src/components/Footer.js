import React from "react";
import { CONTACT_MAILTO } from "../utils/contact";

// On mobile/tablet, native apps can hijack https:// links via Universal Links /
// App Links before the browser handles them. Calling window.open() explicitly
// from a user-gesture click handler keeps navigation in the browser and avoids
// leaving users stranded when they don't have the app installed.
function isMobileOrTablet() {
  return (
    /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    ) || navigator.maxTouchPoints > 1
  );
}

function openSocialLink(e, url) {
  if (isMobileOrTablet()) {
    e.preventDefault();
    window.open(url, "_blank", "noopener,noreferrer");
  }
}

export default function Footer({ greenScreen, toggleGreenScreen }) {
  const currentYear = new Date().getFullYear();
  const buildVersion = process.env.REACT_APP_BUILD_VERSION || "local-dev";

  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
      <div className="container mx-auto px-4 py-6 text-xs sm:text-sm text-center">
        <p className="leading-relaxed text-gray-900 dark:text-gray-100 inline-flex items-center gap-2">
          <span>
            {"\u00A9"} {currentYear} Mike Terpeza. All rights reserved.
          </span>
          <button
            type="button"
            onClick={toggleGreenScreen}
            title={greenScreen ? "Exit terminal mode" : "???"}
            aria-label={
              greenScreen ? "Disable green screen mode" : "Secret mode"
            }
            className="ml-3 inline-block font-mono text-[13px] leading-none tracking-widest select-none transition-all duration-200 opacity-20 hover:opacity-80 focus:outline-none"
            style={{
              color: greenScreen ? "#33ff33" : undefined,
              textShadow: greenScreen ? "0 0 8px #33ff33" : undefined,
            }}
          >
            ▶
          </button>
        </p>
        <div className="mt-3 flex items-center justify-center gap-4 text-gray-700 dark:text-gray-200">
          <a
            href="https://www.linkedin.com/in/mterpeza/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) =>
              openSocialLink(e, "https://www.linkedin.com/in/mterpeza/")
            }
            aria-label="LinkedIn"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M4.98 3.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM3 9h4v12H3zM9 9h3.82v1.71h.05C13.4 9.76 14.73 9 16.28 9 20 9 21 11.29 21 14.27V21h-4v-5.9c0-1.41-.03-3.22-1.96-3.22-1.97 0-2.27 1.54-2.27 3.12V21H9z" />
            </svg>
          </a>
          <a
            href={CONTACT_MAILTO}
            aria-label="Email"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16v12H4z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 7l8 6 8-6"
              />
            </svg>
          </a>
          <a
            href="https://www.discogs.com/user/mterpeza"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) =>
              openSocialLink(e, "https://www.discogs.com/user/mterpeza")
            }
            aria-label="Discogs"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-[10px] font-semibold tracking-[0.08em]"
          >
            DGS
          </a>
          <a
            href="https://soundcloud.com/user-771770762-350184668"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) =>
              openSocialLink(
                e,
                "https://soundcloud.com/user-771770762-350184668",
              )
            }
            aria-label="SoundCloud"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M17.5 10.5c-.41 0-.81.07-1.18.2A4.5 4.5 0 0 0 8 12.5c0 .17.01.34.03.5H6.5a1.5 1.5 0 0 0 0 3h11a2.5 2.5 0 0 0 0-5zm-10 1a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2a.5.5 0 0 1 .5-.5zm2 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2a.5.5 0 0 1 .5-.5zm2-2a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 1 .5-.5zm2 1a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5z" />
            </svg>
          </a>
        </div>
        <p className="mt-1 text-[11px] tracking-[0.08em] uppercase text-gray-500 dark:text-gray-400">
          Build {buildVersion}
        </p>
      </div>
    </footer>
  );
}
