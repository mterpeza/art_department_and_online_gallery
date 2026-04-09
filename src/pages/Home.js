import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import HeroSection from "../components/HeroSection";
import PortfolioHighlights from "../components/PortfolioHighlights";
import LeaveYourMark from "../components/LeaveYourMark";

export default function Home() {
  const location = useLocation();

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
      <HeroSection />
      <PortfolioHighlights />
      <LeaveYourMark />
      {/* Additional homepage sections can be added here */}
    </>
  );
}
