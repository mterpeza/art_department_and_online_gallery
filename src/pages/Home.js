import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import HeroSection from "../components/HeroSection";
import PortfolioHighlights from "../components/PortfolioHighlights";
import LeaveYourMark from "../components/LeaveYourMark";
import { useSectionView } from "../hooks/useSectionView";

export default function Home({ theme }) {
  const location = useLocation();
  const heroRef = useRef(null);
  const highlightsRef = useRef(null);
  const leaveMarkRef = useRef(null);

  useSectionView(heroRef, "hero", "/");
  useSectionView(highlightsRef, "portfolio_highlights", "/");
  useSectionView(leaveMarkRef, "leave_your_mark", "/");

  useEffect(() => {
    if (location.hash !== "#check-in") return;
    const element = document.getElementById("check-in");
    if (!element) return;
    requestAnimationFrame(() => {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [location.hash]);

  return (
    <>
      <div ref={heroRef}>
        <HeroSection theme={theme} />
      </div>
      <div ref={highlightsRef}>
        <PortfolioHighlights />
      </div>
      <div ref={leaveMarkRef}>
        <LeaveYourMark />
      </div>
      {/* Additional homepage sections can be added here */}
    </>
  );
}
