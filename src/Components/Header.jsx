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
        {/* Top Banner */}
        <div className="header-top">
          <div className="container">
            <div className="promo-banner">
              <span>Free £500 On completing your profile on the App</span>
              <button className="install-app-btn">Install App</button>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="header-main">
          <div className="container">
            <div className="header-content">
              {/* Logo */}
              <div className="logo">
                <a href="/">
                  <h1>Treasure Chest</h1>
                </a>
              </div>

              {/* Search Bar */}
              <div className="search-section">
                <div className="search-bar">
                  <input
                    type="text"
                    placeholder="Search"
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
                  Delivery & Stores
                </button>
                <span className="pincode-text">Enter Pincode</span>
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
            <h3>Check Delivery Availability</h3>
            <input
              type="text"
              placeholder="Enter Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              className="pincode-input"
            />
            <div className="modal-buttons">
              <button className="check-btn" onClick={handlePincodeSubmit}>
                Check
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
