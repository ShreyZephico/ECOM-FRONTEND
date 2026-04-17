// src/components/ProductCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN").format(price);
  };

  return (
    <div
      className="product-card"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-info">
        <div className="price-section">
          <span className="current-price">₹{formatPrice(product.price)}</span>
          <span className="compare-price">
            ₹{formatPrice(product.comparePrice)}
          </span>
        </div>
        <h3 className="product-name">{product.name}</h3>
        <button className="check-delivery-btn">Check Delivery Date</button>
      </div>
    </div>
  );
};

export default ProductCard;
