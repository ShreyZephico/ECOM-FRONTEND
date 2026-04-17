// src/components/SizeSelectorWithAPI.jsx
import React, { useState, useEffect } from "react";
import "./SizeSelector.css";

const SizeSelectorWithAPI = ({ productId }) => {
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSizes();
  }, [productId]);

  const fetchSizes = async () => {
    try {
      setLoading(true);
      // Replace with your actual API endpoint
      const response = await fetch(
        `http://localhost:9000/api/products/${productId}/sizes`,
      );
      const data = await response.json();

      // Transform API data to match our component structure
      const formattedSizes = data.map((item) => ({
        id: item.id,
        size: item.size_value,
        mm: item.size_mm,
        us_size: item.us_size || convertToUSSize(item.size_value),
        uk_size: item.uk_size || convertToUKSize(item.size_value),
        circumference: item.circumference || item.size_mm,
        diameter: item.diameter || calculateDiameter(item.size_mm),
        stock_status: item.stock_status,
        stock_count: item.stock_count,
        price_adjustment: item.price_adjustment || 0,
        delivery_time: item.delivery_time || getDeliveryTime(item.stock_status),
        available_metals: item.available_metals || [
          "14 KT Yellow Gold",
          "18 KT Yellow Gold",
        ],
        available_diamonds: item.available_diamonds || ["IJ-SI", "FG-SI"],
      }));

      setSizes(formattedSizes);
    } catch (err) {
      setError("Failed to load sizes");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Helper functions for conversion
  const convertToUSSize = (size) => {
    const conversion = {
      5: "2.5",
      6: "3.5",
      7: "4.5",
      8: "5.5",
      9: "6.5",
      10: "7.5",
      11: "8.5",
      12: "9.5",
      13: "10.5",
      14: "11.5",
    };
    return conversion[size] || `${size - 2.5}`;
  };

  const convertToUKSize = (size) => {
    const conversion = {
      5: "H",
      6: "I",
      7: "J",
      8: "K",
      9: "L",
      10: "M",
      11: "N",
      12: "O",
      13: "P",
      14: "Q",
    };
    return conversion[size] || String.fromCharCode(72 + (size - 5));
  };

  const calculateDiameter = (mm) => {
    const diameter = parseFloat(mm) / Math.PI;
    return `${diameter.toFixed(1)}mm`;
  };

  const getDeliveryTime = (status) => {
    switch (status) {
      case "in_stock":
        return "1-2 days";
      case "limited":
        return "3-5 days";
      case "made_to_order":
        return "2-3 weeks";
      default:
        return "Contact for details";
    }
  };

  if (loading) return <div className="loader">Loading sizes...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="size-selector-container">
      {/* Same JSX as previous SizeSelector component */}
      <div className="sizes-grid">
        {sizes.map((size) => (
          <button
            key={size.id}
            className={`size-card ${selectedSize?.id === size.id ? "selected" : ""} ${size.stock_status}`}
            onClick={() => setSelectedSize(size)}
          >
            <div className="size-number">{size.size}</div>
            <div className="size-mm">{size.mm}</div>
            <div className="stock-status-text">
              {size.stock_status === "in_stock" && "✓ In Stock"}
              {size.stock_status === "limited" && `⚠️ ${size.stock_count} left`}
              {size.stock_status === "made_to_order" && "🛠️ Made to Order"}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelectorWithAPI;
