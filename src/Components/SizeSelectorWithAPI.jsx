import React, { useEffect, useState } from "react";
import { fetchStoreProduct } from "../api/storeProducts";
import "./SizeSelector.css";

const calculateDiameter = (mm) => {
  const numericMm = parseFloat(mm);
  if (!Number.isFinite(numericMm)) return "";

  return `${(numericMm / Math.PI).toFixed(1)}mm`;
};

const normalizeSize = (item, index) => ({
  id: item.id || item.size || index,
  size: item.size_value || item.size,
  mm: item.size_mm || item.mm || item.circumference || "",
  stock_status: item.stock_status || item.status || "made_to_order",
  stock_count: item.stock_count || item.stock || 0,
  diameter: item.diameter || calculateDiameter(item.size_mm || item.mm),
});

const SizeSelectorWithAPI = ({ productId }) => {
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchSizes = async () => {
      try {
        setLoading(true);
        setError(null);
        const product = await fetchStoreProduct(productId);
        const apiSizes = product?.metadata?.sizes || product?.sizes || [];

        if (!cancelled) {
          setSizes(apiSizes.map(normalizeSize));
        }
      } catch (err) {
        console.error(err);
        if (!cancelled) {
          setError("Failed to load sizes");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    if (productId) {
      fetchSizes();
    }

    return () => {
      cancelled = true;
    };
  }, [productId]);

  if (loading) return <div className="loader">Loading sizes...</div>;
  if (error) return <div className="error">{error}</div>;
  if (sizes.length === 0) {
    return <div className="loader">No API sizes configured for this product.</div>;
  }

  return (
    <div className="size-selector-container">
      <div className="sizes-grid">
        {sizes.map((size) => (
          <button
            key={size.id}
            className={`size-card ${
              selectedSize?.id === size.id ? "selected" : ""
            } ${size.stock_status}`}
            onClick={() => setSelectedSize(size)}
          >
            <div className="size-number">{size.size}</div>
            <div className="size-mm">{size.mm}</div>
            <div className="stock-status-text">
              {size.stock_status === "in_stock" && "In Stock"}
              {size.stock_status === "limited" && `${size.stock_count} left`}
              {size.stock_status === "made_to_order" && "Made to Order"}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelectorWithAPI;
