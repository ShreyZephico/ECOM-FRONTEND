// src/components/Header.jsx
import React, { useState } from "react";
import "./Header.css";

const Header = () => {
  const [showPincodeModal, setShowPincodeModal] = useState(false);
  const [pincode, setPincode] = useState("");

  const handlePincodeSubmit = () => {
    alert(`Delivery availability checked for pincode: ${pincode}`);
    setShowPincodeModal(false);
    setPincode("");
  };

  return (
    <>
      <header className="header">
        {/* Top Bar - Optional but adds elegance */}
        <div className="header-top">
          <div className="top-bar-content">
            <span className="tagline">
              ✨ <strong>CRAFTED WITH PASSION SINCE 2023</strong> ✨
            </span>
            <div className="shipping-info">
              <span>📦 Free Shipping on Orders ₹50,000+</span>
              <span>🔒 100% Certified Jewellery</span>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="header-main">
          <div className="container">
            <div className="header-content">
              {/* Logo with your logo.png */}
              <div className="logo">
                <a href="/">
                  <img
                    src="/logo.png"
                    alt="ZEPHICO Timeless Jewellery"
                    className="logo-img"
                  />
                  <div className="logo-text">
                    <span className="brand">ZEPHICO</span>
                    <span className="est">EST. 2023 LONDON</span>
                  </div>
                  {/* Hidden h1 for SEO */}
                  <h1 style={{ display: "none" }}>Treasure Chest</h1>
                </a>
              </div>

              {/* Search Bar */}
              <div className="search-section">
                <div className="search-bar">
                  <input
                    type="text"
                    placeholder="Search for jewellery, collections..."
                    className="search-input"
                  />
                  <button className="search-icon">🔍</button>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="nav-links">
                <button className="nav-link">Stores</button>
                <button className="nav-link">Gold</button>
                <button
                  className="nav-link delivery-btn"
                  onClick={() => setShowPincodeModal(true)}
                >
                  📍 Delivery & Stores
                </button>
                <span
                  className="pincode-text"
                  onClick={() => setShowPincodeModal(true)}
                >
                  Enter Pincode
                </span>
                <button className="nav-link lang-btn">ENG ▼</button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Pincode Modal */}
      {showPincodeModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowPincodeModal(false)}
        >
          <div className="pincode-modal" onClick={(e) => e.stopPropagation()}>
            <h3>✨ Check Delivery Availability</h3>
            <input
              type="text"
              placeholder="Enter Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              className="pincode-input"
              maxLength="6"
              pattern="[0-9]{6}"
            />
            <div className="modal-buttons">
              <button className="check-btn" onClick={handlePincodeSubmit}>
                Check Availability
              </button>
              <button
                className="cancel-btn"
                onClick={() => setShowPincodeModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
