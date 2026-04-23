import React from "react";
import { useNavigate } from "react-router-dom";
import {
  formatPrice,
  getProductImage,
  getProductPrice,
  getProductTitle,
} from "../utils/storeProduct";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const productTitle = getProductTitle(product);
  const productImage = getProductImage(product);
  const displayPrice = formatPrice(getProductPrice(product));

  return (
    <div
      className="product-card"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="product-image">
        {productImage ? (
          <img src={productImage} alt={productTitle} />
        ) : (
          <div className="product-image-placeholder">No image</div>
        )}
      </div>
      <div className="product-info">
        <div className="price-section">
          <span className="current-price">
            {displayPrice || "Price on request"}
          </span>
        </div>
        <h3 className="product-name">{productTitle}</h3>
        <button className="view-product-btn">View Product</button>
      </div>
    </div>
  );
};

export default ProductCard;
