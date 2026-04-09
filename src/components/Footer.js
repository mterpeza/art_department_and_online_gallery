import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
      <div className="container mx-auto px-4 py-6 text-xs sm:text-sm text-center">
        <p className="leading-relaxed text-gray-900 dark:text-gray-100">
          {"\u00A9"} {currentYear} Mike Terpeza. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
