import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  fetchCombinationsByProductId,
  fetchStoreProduct,
  findVariant,
  getProductOptions,
} from "../api/storeProducts";
import OrderModal from "../Components/OrderModal";
import TestSizePage from "./TestSizePage"; // ← IMPORT TestSizePage
import {
  formatPrice,
  getCleanDescription,
  getProductImage,
  getProductTitle,
} from "../utils/storeProduct";
import "./ProductDetailPage.css";

const ProductDetailPage = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [variants, setVariants] = useState([]);
  const [options, setOptions] = useState({
    sizes: [],
    metals: [],
    diamonds: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedSizeId, setSelectedSizeId] = useState(null);
  const [selectedMetalId, setSelectedMetalId] = useState(null);
  const [selectedDiamondId, setSelectedDiamondId] = useState(null);

  const [quantity, setQuantity] = useState(1);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showCustomiseModal, setShowCustomiseModal] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false); // ← STATE FOR SIZE GUIDE

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const storeProduct = await fetchStoreProduct(id);
        const productVariants = await fetchCombinationsByProductId(id);
        const derivedOptions = getProductOptions(productVariants);

        setProduct(storeProduct);
        setVariants(productVariants);
        setOptions(derivedOptions);

        setSelectedSizeId(derivedOptions.sizes[0]?.id || null);
        setSelectedMetalId(derivedOptions.metals[0]?.id || null);
        setSelectedDiamondId(derivedOptions.diamonds[0]?.id || null);
      } catch (err) {
        console.error(err);
        setError("Unable to load product");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const selectedVariant = findVariant({
    variants,
    size_id: selectedSizeId,
    metal_id: selectedMetalId,
    diamond_id: selectedDiamondId,
  });

  const displayPrice = selectedVariant?.price
    ? formatPrice(selectedVariant.price * quantity)
    : "Select options";

  if (loading) {
    return (
      <div className="pdp-loader-wrap">
        <div className="pdp-loader-ring"></div>
        <p className="pdp-loader-text">Loading product...</p>
      </div>
    );
  }

  if (error) return <div className="pdp-error-state">{error}</div>;
  if (!product) return <div className="pdp-error-state">Product not found</div>;

  const productTitle = getProductTitle(product);
  const mainImage = getProductImage(product);
  const description = getCleanDescription(product.description);

  const selectedMetal = options.metals.find((m) => m.id === selectedMetalId);
  const selectedSize = options.sizes.find((s) => s.id === selectedSizeId);

  return (
    <div className="pdp-root">
      <div className="pdp-container">
        {/* Breadcrumb */}
        <nav className="pdp-breadcrumb">
          <Link className="pdp-breadcrumb-link" to="/">
            Home
          </Link>
          <span className="pdp-breadcrumb-sep">›</span>
          <span className="pdp-breadcrumb-current">{productTitle}</span>
        </nav>

        <div className="pdp-layout">
          {/* ── LEFT: Gallery ── */}
          <div className="pdp-gallery">
            <div className="pdp-image-frame">
              <img
                className="pdp-main-img"
                src={mainImage}
                alt={productTitle}
              />
              <div className="pdp-img-badge">In 713 Carts</div>
            </div>

            {/* Offer strip */}
            <div className="pdp-offer-strip">
              <span className="pdp-offer-icon">✦</span>
              <span className="pdp-offer-text">
                Flat 10% off on Making Charges
              </span>
              <span className="pdp-offer-expiry">Offer Expires in 7 days</span>
            </div>
          </div>

          {/* ── RIGHT: Info Panel ── */}
          <div className="pdp-info-panel">
            {/* Rating */}
            <div className="pdp-rating-row">
              <span className="pdp-stars">★★★★☆</span>
              <span className="pdp-rating-count">4.7 · 3 Ratings</span>
            </div>

            <h1 className="pdp-product-title">{productTitle}</h1>
            <p className="pdp-product-desc">{description}</p>

            {/* Price */}
            <div className="pdp-price-block">
              <span className="pdp-price-current">{displayPrice}</span>
              <span className="pdp-price-tag">MRP incl. all taxes</span>
            </div>

            {/* ── Customise Pill (Image 1 style) ── */}
            <div
              className="pdp-customise-bar"
              onClick={() => setShowCustomiseModal(true)}
            >
              <div className="pdp-customise-cell">
                <span className="pdp-cell-label">Size</span>
                <span className="pdp-cell-value">
                  {selectedSize
                    ? `${selectedSize.size} (${selectedSize.mm || "—"})`
                    : "—"}
                </span>
              </div>
              <div className="pdp-customise-divider" />
              <div className="pdp-customise-cell">
                <span className="pdp-cell-label">Metal</span>
                <span className="pdp-cell-value">
                  {selectedMetal?.title || "—"}
                </span>
              </div>
              <button className="pdp-customise-btn">CUSTOMISE</button>
            </div>

            {/* Ring size hint - WITH CLICK HANDLER */}
            <div className="pdp-size-hint">
              <span>Not sure about your ring size?</span>
              <button
                className="pdp-size-learn-btn"
                onClick={() => setShowSizeGuide(true)}
              >
                LEARN HOW ▶
              </button>
            </div>

            {/* Stock */}
            {selectedVariant && (
              <div className="pdp-stock-row">
                <span className="pdp-stock-dot" />
                <span className="pdp-stock-label">
                  {Number.isFinite(Number(selectedVariant.stock))
                    ? `${selectedVariant.stock} available`
                    : "In stock"}
                </span>
              </div>
            )}

            {/* Quantity */}
            <div className="pdp-qty-row">
              <span className="pdp-qty-label">Quantity</span>
              <div className="pdp-qty-ctrl">
                <button
                  className="pdp-qty-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  −
                </button>
                <span className="pdp-qty-num">{quantity}</span>
                <button
                  className="pdp-qty-btn"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* CTA */}
            <div className="pdp-cta-row">
              <button
                className="pdp-buy-btn"
                onClick={() => setShowOrderModal(true)}
              >
                Buy Now
              </button>
              <button className="pdp-wish-btn" title="Wishlist">
                ♡
              </button>
              <button className="pdp-share-btn" title="Share">
                ⎘
              </button>
            </div>

            {/* Delivery strip */}
            <div className="pdp-delivery-strip">
              <span className="pdp-delivery-icon">📦</span>
              <span>Delivery, Stores &amp; Trial</span>
              <input
                className="pdp-pincode-input"
                placeholder="Enter Pincode"
              />
              <button className="pdp-locate-btn">Locate Me</button>
            </div>
          </div>
        </div>
      </div>

      {/* ══ CUSTOMISE MODAL ══ */}
      {showCustomiseModal && (
        <div
          className="pdp-modal-backdrop"
          onClick={() => setShowCustomiseModal(false)}
        >
          <div className="pdp-modal-sheet" onClick={(e) => e.stopPropagation()}>
            <button
              className="pdp-modal-close"
              onClick={() => setShowCustomiseModal(false)}
            >
              ✕
            </button>

            {/* Estimated Price */}
            <div className="pdp-modal-price-row">
              <span className="pdp-modal-label">Estimated price</span>
              <div className="pdp-modal-prices">
                <span className="pdp-modal-price-now">{displayPrice}</span>
              </div>
            </div>

            <hr className="pdp-modal-divider" />

            {/* Metal */}
            <div className="pdp-modal-section">
              <h3 className="pdp-modal-section-title">Choice of Metal</h3>
              <div className="pdp-modal-metal-grid">
                {options.metals.map((metal) => {
                  const isSelected = selectedMetalId === metal.id;
                  return (
                    <div
                      key={metal.id}
                      className={`pdp-modal-metal-card ${isSelected ? "pdp-modal-metal-card--active" : ""}`}
                      onClick={() => setSelectedMetalId(metal.id)}
                    >
                      <span className="pdp-modal-metal-name">
                        {metal.title}
                      </span>
                      <span className="pdp-modal-metal-sub">Made to Order</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <hr className="pdp-modal-divider" />

            {/* Diamond */}
            {options.diamonds.length > 0 && (
              <>
                <div className="pdp-modal-section">
                  <h3 className="pdp-modal-section-title">Choice of Diamond</h3>
                  <div className="pdp-modal-diamond-grid">
                    {options.diamonds.map((diamond) => {
                      const label =
                        diamond?.quality && diamond?.karets
                          ? `${diamond.quality} • ${diamond.karets}ct`
                          : diamond?.quality || "Diamond";
                      const isSelected = selectedDiamondId === diamond.id;
                      return (
                        <div
                          key={diamond.id}
                          className={`pdp-modal-diamond-card ${isSelected ? "pdp-modal-diamond-card--active" : ""}`}
                          onClick={() => setSelectedDiamondId(diamond.id)}
                        >
                          <span className="pdp-modal-diamond-name">
                            {label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <hr className="pdp-modal-divider" />
              </>
            )}

            {/* Size */}
            <div className="pdp-modal-section">
              <div className="pdp-modal-size-header">
                <h3 className="pdp-modal-section-title">Select Size</h3>
                <button className="pdp-modal-size-guide">SIZE GUIDE</button>
              </div>
              <div className="pdp-modal-size-grid">
                {options.sizes.map((size) => {
                  const isSelected = selectedSizeId === size.id;
                  return (
                    <div
                      key={size.id}
                      className={`pdp-modal-size-card ${isSelected ? "pdp-modal-size-card--active" : ""}`}
                      onClick={() => setSelectedSizeId(size.id)}
                    >
                      <span className="pdp-modal-size-num">{size.size}</span>
                      <span className="pdp-modal-size-mm">
                        {size.mm || size.size + " mm"}
                      </span>
                      <span className="pdp-modal-size-sub">
                        {size.stock === 1 ? "Only 1 left!" : "Made to Order"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Confirm */}
            <button
              className="pdp-modal-confirm-btn"
              onClick={() => setShowCustomiseModal(false)}
            >
              CONFIRM CUSTOMISATION
            </button>
          </div>
        </div>
      )}

      {/* ══ SIZE GUIDE MODAL - REUSING TestSizePage ══ */}
      {showSizeGuide && (
        <div
          className="pdp-modal-backdrop"
          onClick={() => setShowSizeGuide(false)}
        >
          <div
            className="pdp-size-guide-modal-wrapper"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="pdp-modal-close"
              onClick={() => setShowSizeGuide(false)}
            >
              ✕
            </button>
            <TestSizePage />
          </div>
        </div>
      )}

      {/* ORDER MODAL */}
      {showOrderModal && (
        <OrderModal
          product={product}
          selectedSize={
            options.sizes.find((s) => s.id === selectedSizeId) || null
          }
          selectedMetal={
            options.metals.find((m) => m.id === selectedMetalId) || null
          }
          selectedDiamond={
            options.diamonds.find((d) => d.id === selectedDiamondId) || null
          }
          quantity={quantity}
          totalPrice={selectedVariant?.price || null}
          selectedCombinationId={selectedVariant?.id || null}
          onClose={() => setShowOrderModal(false)}
        />
      )}
    </div>
  );
};

export default ProductDetailPage;
