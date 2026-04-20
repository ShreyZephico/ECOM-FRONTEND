import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchStoreProduct, customizeRing } from "../api/storeProducts";
import OrderModal from "../Components/OrderModal";
import {
  formatPrice,
  getCleanDescription,
  getMaterialOptions,
  getProductImage,
  getProductTitle,
  getVariantByMaterial,
} from "../utils/storeProduct";
import "./ProductDetailPage.css";

const ProductDetailPage = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedMetal, setSelectedMetal] = useState(null);
  const [selectedDiamond, setSelectedDiamond] = useState(null);

  const [apiPrice, setApiPrice] = useState(null);
  const [loadingPrice, setLoadingPrice] = useState(false);

  const [quantity, setQuantity] = useState(1);
  const [showOrderModal, setShowOrderModal] = useState(false);

  // 🔥 LOAD PRODUCT
  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const storeProduct = await fetchStoreProduct(id);

        const materials = getMaterialOptions(storeProduct);

        setProduct(storeProduct);

        setSelectedSize({ size: 7 });
        setSelectedMetal({
          variant: getVariantByMaterial(storeProduct, materials[0]),
        });
        setSelectedDiamond({ quality: "IJ-SI" });
      } catch (err) {
        console.error(err);
        setError("Unable to load product");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  // 🔥 CUSTOM PRICE
  useEffect(() => {
    if (!selectedMetal?.variant?.id) return;

    const fetchPrice = async () => {
      try {
        setLoadingPrice(true);

        const data = await customizeRing({
          variant_id: selectedMetal.variant.id,
          size: selectedSize?.size,
          diamond_quality: selectedDiamond?.quality,
        });

        setApiPrice(data.final_price);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingPrice(false);
      }
    };

    fetchPrice();
  }, [selectedMetal, selectedSize, selectedDiamond]);

  const displayPrice = apiPrice
    ? formatPrice(apiPrice * quantity)
    : "Calculating...";

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader-spinner"></div>
        <p>Loading product...</p>
      </div>
    );
  }

  if (error) return <div>{error}</div>;
  if (!product) return <div>Product not found</div>;

  const productTitle = getProductTitle(product);
  const mainImage = getProductImage(product);
  const description = getCleanDescription(product.description);

  return (
    <div className="product-detail-page">
      <div className="container">

        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/">Home</Link> &gt; <span>{productTitle}</span>
        </div>

        <div className="product-detail-layout">

          {/* IMAGE */}
          <div className="product-gallery">
            <div className="main-image-container">
              <img
                className="main-image"
                src={mainImage}
                alt={productTitle}
              />
            </div>
          </div>

          {/* INFO */}
          <div className="product-detail-info">

            <h1 className="product-title">{productTitle}</h1>
            <p className="product-description">{description}</p>

            {/* PRICE */}
            <div className="price-section">
              <span className="current-price">
                {loadingPrice ? "Updating..." : displayPrice}
              </span>
            </div>

            {/* METAL */}
            <div className="selector-section">
              <div className="selector-header">
                <h3>Metal</h3>
              </div>

              <div className="metal-options">
                {getMaterialOptions(product).map((material) => {
                  const variant = getVariantByMaterial(product, material);
                  const isSelected =
                    selectedMetal?.variant?.id === variant?.id;

                  return (
                    <div
                      key={material}
                      className={`metal-option ${
                        isSelected ? "selected" : ""
                      }`}
                      onClick={() => setSelectedMetal({ variant })}
                    >
                      <div className="metal-name">{material}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* DIAMOND */}
            <div className="selector-section">
              <div className="selector-header">
                <h3>Diamond</h3>
              </div>

              <div className="diamond-options">
                {["IJ-SI", "FG-SI"].map((q) => {
                  const isSelected = selectedDiamond?.quality === q;

                  return (
                    <div
                      key={q}
                      className={`diamond-option ${
                        isSelected ? "selected" : ""
                      }`}
                      onClick={() =>
                        setSelectedDiamond({ quality: q })
                      }
                    >
                      <div className="diamond-quality">{q}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SIZE */}
            <div className="selector-section">
              <div className="selector-header">
                <h3>Size</h3>
              </div>

              <div className="size-grid">
                {[6, 7, 8, 9, 10, 11, 12].map((s) => {
                  const isSelected = selectedSize?.size === s;

                  return (
                    <div
                      key={s}
                      className={`size-option ${
                        isSelected ? "selected" : ""
                      }`}
                      onClick={() => setSelectedSize({ size: s })}
                    >
                      <div className="size-number">{s}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* QUANTITY */}
            <div className="quantity-section">
              <label>Quantity</label>

              <div className="quantity-selector">
                <button
                  className="qty-btn"
                  onClick={() =>
                    setQuantity(Math.max(1, quantity - 1))
                  }
                >
                  -
                </button>

                <span className="quantity">{quantity}</span>

                <button
                  className="qty-btn"
                  onClick={() =>
                    setQuantity(quantity + 1)
                  }
                >
                  +
                </button>
              </div>
            </div>

            {/* ACTION */}
            <div className="action-buttons">
              <button
                className="buy-now-btn"
                onClick={() => setShowOrderModal(true)}
              >
                Buy Now
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* MODAL */}
      {showOrderModal && (
        <OrderModal
          product={product}
          selectedSize={selectedSize}
          selectedMetal={selectedMetal}
          selectedDiamond={selectedDiamond}
          quantity={quantity}
          totalPrice={apiPrice}
          onClose={() => setShowOrderModal(false)}
        />
      )}
    </div>
  );
};

export default ProductDetailPage;