// src/components/SizeSelector.jsx
import React, { useState } from "react";
import "./SizeSelector.css";

const SizeSelector = () => {
  // Complete size data with all variations
  const [sizes] = useState([
    {
      id: 1,
      size: 5,
      mm: "44.8 mm",
      us_size: "2.5",
      uk_size: "H",
      circumference: "44.8mm",
      diameter: "14.3mm",
      stock_status: "made_to_order",
      stock_count: 0,
      price_adjustment: 0,
      delivery_time: "2-3 weeks",
      available_metals: ["14 KT Yellow Gold", "18 KT Yellow Gold"],
      available_diamonds: ["IJ-SI", "FG-SI"],
    },
    {
      id: 2,
      size: 6,
      mm: "45.9 mm",
      us_size: "3.5",
      uk_size: "I",
      circumference: "45.9mm",
      diameter: "14.6mm",
      stock_status: "limited",
      stock_count: 5,
      price_adjustment: 0,
      delivery_time: "3-5 days",
      available_metals: ["14 KT Yellow Gold", "18 KT Yellow Gold"],
      available_diamonds: ["IJ-SI", "FG-SI"],
    },
    {
      id: 3,
      size: 7,
      mm: "47.1 mm",
      us_size: "4.5",
      uk_size: "J",
      circumference: "47.1mm",
      diameter: "15.0mm",
      stock_status: "made_to_order",
      stock_count: 0,
      price_adjustment: 500,
      delivery_time: "2-3 weeks",
      available_metals: ["14 KT Yellow Gold"],
      available_diamonds: ["IJ-SI"],
    },
    {
      id: 4,
      size: 8,
      mm: "48.1 mm",
      us_size: "5.5",
      uk_size: "K",
      circumference: "48.1mm",
      diameter: "15.3mm",
      stock_status: "limited",
      stock_count: 2,
      price_adjustment: 500,
      delivery_time: "3-5 days",
      available_metals: ["14 KT Yellow Gold", "18 KT Yellow Gold"],
      available_diamonds: ["IJ-SI", "FG-SI"],
    },
    {
      id: 5,
      size: 9,
      mm: "49.0 mm",
      us_size: "6.5",
      uk_size: "L",
      circumference: "49.0mm",
      diameter: "15.6mm",
      stock_status: "in_stock",
      stock_count: 10,
      price_adjustment: 0,
      delivery_time: "1-2 days",
      available_metals: ["14 KT Yellow Gold", "18 KT Yellow Gold"],
      available_diamonds: ["IJ-SI", "FG-SI"],
    },
    {
      id: 6,
      size: 10,
      mm: "50.0 mm",
      us_size: "7.5",
      uk_size: "M",
      circumference: "50.0mm",
      diameter: "15.9mm",
      stock_status: "limited",
      stock_count: 4,
      price_adjustment: 0,
      delivery_time: "3-5 days",
      available_metals: ["14 KT Yellow Gold"],
      available_diamonds: ["IJ-SI", "FG-SI"],
    },
    {
      id: 7,
      size: 11,
      mm: "50.9 mm",
      us_size: "8.5",
      uk_size: "N",
      circumference: "50.9mm",
      diameter: "16.2mm",
      stock_status: "limited",
      stock_count: 3,
      price_adjustment: 750,
      delivery_time: "3-5 days",
      available_metals: ["14 KT Yellow Gold", "18 KT Yellow Gold"],
      available_diamonds: ["IJ-SI"],
    },
    {
      id: 8,
      size: 12,
      mm: "51.8 mm",
      us_size: "9.5",
      uk_size: "O",
      circumference: "51.8mm",
      diameter: "16.5mm",
      stock_status: "limited",
      stock_count: 3,
      price_adjustment: 750,
      delivery_time: "3-5 days",
      available_metals: ["14 KT Yellow Gold", "18 KT Yellow Gold"],
      available_diamonds: ["IJ-SI", "FG-SI"],
    },
    {
      id: 9,
      size: 13,
      mm: "52.8 mm",
      us_size: "10.5",
      uk_size: "P",
      circumference: "52.8mm",
      diameter: "16.8mm",
      stock_status: "made_to_order",
      stock_count: 0,
      price_adjustment: 1000,
      delivery_time: "2-3 weeks",
      available_metals: ["14 KT Yellow Gold"],
      available_diamonds: ["IJ-SI"],
    },
    {
      id: 10,
      size: 14,
      mm: "54.0 mm",
      us_size: "11.5",
      uk_size: "Q",
      circumference: "54.0mm",
      diameter: "17.2mm",
      stock_status: "made_to_order",
      stock_count: 0,
      price_adjustment: 1000,
      delivery_time: "2-3 weeks",
      available_metals: ["14 KT Yellow Gold", "18 KT Yellow Gold"],
      available_diamonds: ["IJ-SI", "FG-SI"],
    },
  ]);

  const [selectedSize, setSelectedSize] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const getStockStatusColor = (status) => {
    switch (status) {
      case "in_stock":
        return "#4caf50";
      case "limited":
        return "#ff9800";
      case "made_to_order":
        return "#2196f3";
      default:
        return "#999";
    }
  };

  const getStockStatusText = (status, count) => {
    switch (status) {
      case "in_stock":
        return `✓ In Stock (${count} available)`;
      case "limited":
        return `⚠️ Only ${count} left!`;
      case "made_to_order":
        return `🛠️ Made to Order (${count === 0 ? "2-3 weeks" : count + " days"})`;
      default:
        return status;
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN").format(price);
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
    setShowDetails(true);
  };

  return (
    <div className="size-selector-container">
      <div className="size-selector-header">
        <h2>📏 Select Your Ring Size</h2>
        <p className="size-guide-text">
          Choose from the sizes below. Each size has different availability and
          pricing options.
        </p>
      </div>

      {/* Size Grid */}
      <div className="sizes-grid">
        {sizes.map((size) => (
          <button
            key={size.id}
            className={`size-card ${selectedSize?.id === size.id ? "selected" : ""} ${size.stock_status}`}
            onClick={() => handleSizeClick(size)}
          >
            <div className="size-number">{size.size}</div>
            <div className="size-mm">{size.mm}</div>
            <div
              className="stock-indicator"
              style={{
                backgroundColor: getStockStatusColor(size.stock_status),
              }}
            />
            <div
              className="stock-status-text"
              style={{ color: getStockStatusColor(size.stock_status) }}
            >
              {size.stock_status === "in_stock" && "✓ In Stock"}
              {size.stock_status === "limited" && `⚠️ ${size.stock_count} left`}
              {size.stock_status === "made_to_order" && "🛠️ Made to Order"}
            </div>
            {size.price_adjustment > 0 && (
              <div className="price-adjustment">
                + ₹{formatPrice(size.price_adjustment)}
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Size Details Panel */}
      {showDetails && selectedSize && (
        <div className="size-details-panel">
          <div className="details-header">
            <h3>Size {selectedSize.size} Details</h3>
            <button
              className="close-details"
              onClick={() => setShowDetails(false)}
            >
              ×
            </button>
          </div>

          <div className="details-content">
            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-label">Ring Size:</span>
                <span className="detail-value">{selectedSize.size}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Circumference:</span>
                <span className="detail-value">
                  {selectedSize.circumference}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Diameter:</span>
                <span className="detail-value">{selectedSize.diameter}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">US Size:</span>
                <span className="detail-value">{selectedSize.us_size}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">UK Size:</span>
                <span className="detail-value">{selectedSize.uk_size}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Stock Status:</span>
                <span
                  className="detail-value"
                  style={{
                    color: getStockStatusColor(selectedSize.stock_status),
                  }}
                >
                  {getStockStatusText(
                    selectedSize.stock_status,
                    selectedSize.stock_count,
                  )}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Delivery Time:</span>
                <span className="detail-value">
                  {selectedSize.delivery_time}
                </span>
              </div>
              {selectedSize.price_adjustment > 0 && (
                <div className="detail-item">
                  <span className="detail-label">Price Adjustment:</span>
                  <span className="detail-value">
                    + ₹{formatPrice(selectedSize.price_adjustment)}
                  </span>
                </div>
              )}
              <div className="detail-item full-width">
                <span className="detail-label">Available Metals:</span>
                <div className="metal-tags">
                  {selectedSize.available_metals.map((metal, idx) => (
                    <span key={idx} className="metal-tag">
                      {metal}
                    </span>
                  ))}
                </div>
              </div>
              <div className="detail-item full-width">
                <span className="detail-label">
                  Available Diamond Qualities:
                </span>
                <div className="diamond-tags">
                  {selectedSize.available_diamonds.map((diamond, idx) => (
                    <span key={idx} className="diamond-tag">
                      {diamond}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="action-buttons">
              <button
                className="select-size-btn"
                onClick={() => alert(`Size ${selectedSize.size} selected!`)}
              >
                Select This Size
              </button>
              <button
                className="view-all-sizes"
                onClick={() => setShowDetails(false)}
              >
                View All Sizes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Size Guide */}
      <div className="size-guide-section">
        <h3>📐 International Size Conversion Chart</h3>
        <div className="size-chart">
          <table className="size-table">
            <thead>
              <tr>
                <th>India Size</th>
                <th>US Size</th>
                <th>UK Size</th>
                <th>Circumference (mm)</th>
                <th>Diameter (mm)</th>
              </tr>
            </thead>
            <tbody>
              {sizes.map((size) => (
                <tr
                  key={size.id}
                  onClick={() => handleSizeClick(size)}
                  style={{ cursor: "pointer" }}
                >
                  <td>
                    <strong>{size.size}</strong>
                  </td>
                  <td>{size.us_size}</td>
                  <td>{size.uk_size}</td>
                  <td>{size.circumference}</td>
                  <td>{size.diameter}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SizeSelector;
