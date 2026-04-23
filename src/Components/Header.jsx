// src/components/Header.jsx
import React, { useState } from "react";
import "./Header.css";

const Header = () => {
  const [showPincodeModal, setShowPincodeModal] = useState(false);
  const [pincode, setPincode] = useState("");
  const [cartCount, setCartCount] = useState(3); // Example cart count

  const handlePincodeSubmit = () => {
    alert(`Delivery availability checked for pincode: ${pincode}`);
    setShowPincodeModal(false);
    setPincode("");
  };

  return (
    <>
      <header className="header">
        {/* Top Bar - Compact & Important Only */}
        <div className="header-top">
          <div className="top-bar-content">
            <span className="tagline">
              ✨ CRAFTED WITH PASSION SINCE 2023 ✨
            </span>
            <div className="shipping-info">
              <span>📦 Free Shipping on ₹50,000+</span>
              <span>🔒 100% Certified</span>
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
                  <img
                    src="/logo.png"
                    alt="ZEPHICO Timeless Jewellery"
                    className="logo-img"
                  />
                  <div className="logo-text">
                    <span className="brand">ZEPHICO</span>
                    <span className="est">EST. 2023 LONDON</span>
                  </div>
                </a>
              </div>

              {/* Search Bar - Clean with SVG icon */}
              <div className="search-section">
                <div className="search-bar">
                  <input
                    type="text"
                    placeholder="Search for jewellery..."
                    className="search-input"
                  />
                  <button className="search-icon" aria-label="Search">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Navigation Icons - Account & Cart */}
              <div className="nav-icons">
                {/* Account Icon */}
                <button className="icon-btn account-btn" aria-label="Account">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 21V19C20 16.8 18.2 15 16 15H8C5.8 15 4 16.8 4 19V21"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="12"
                      cy="7"
                      r="4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                  <span className="icon-label">Account</span>
                </button>

                {/* Cart Icon with Badge */}
                <button className="icon-btn cart-btn" aria-label="Cart">
                  <div className="cart-icon-wrapper">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 6L8 16H18L20 6H6Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M4 6H20"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <circle cx="9" cy="19" r="1.5" fill="currentColor" />
                      <circle cx="17" cy="19" r="1.5" fill="currentColor" />
                    </svg>
                    {cartCount > 0 && (
                      <span className="cart-badge">{cartCount}</span>
                    )}
                  </div>
                  <span className="icon-label">Cart</span>
                </button>

                {/* Delivery Pincode - Compact */}
                <button
                  className="icon-btn delivery-icon-btn"
                  onClick={() => setShowPincodeModal(true)}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx="12"
                      cy="9"
                      r="2.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                  <span className="icon-label">Pincode</span>
                </button>
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
            <h3>📍 Check Delivery Availability</h3>
            <input
              type="text"
              placeholder="Enter Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              className="pincode-input"
              maxLength="6"
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
