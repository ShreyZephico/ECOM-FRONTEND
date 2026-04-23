import React, { useEffect } from "react";
import "./IntroSplash.css";

const IntroSplash = ({ onComplete }) => {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      onComplete?.();
    }, 3200);

    return () => window.clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="intro-splash" role="presentation" aria-hidden="true">
      <div className="intro-splash__backdrop" />
      <div className="intro-splash__orb intro-splash__orb--one" />
      <div className="intro-splash__orb intro-splash__orb--two" />
      <div className="intro-splash__orb intro-splash__orb--three" />

      <div className="intro-splash__grid" />

      <div className="intro-splash__content">
        <div className="intro-splash__logo-wrap">
          <div className="intro-splash__halo" />
          <img
            className="intro-splash__logo"
            src="/logo.png"
            alt="Zephico"
          />
        </div>

        <span className="intro-splash__eyebrow">Fine Jewellery House</span>
        <h1 className="intro-splash__brand">ZEPHICO</h1>
        <p className="intro-splash__tagline">
          Crafted brilliance, revealed with timeless elegance.
        </p>

        <div className="intro-splash__loader" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
};

export default IntroSplash;
