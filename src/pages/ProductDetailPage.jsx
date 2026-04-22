import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  fetchCombinationsByProductId,
  fetchStoreProduct,
  findVariant,
  getProductOptions,
} from "../api/storeProducts";
import OrderModal from "../Components/OrderModal";
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
  const [options, setOptions] = useState({ sizes: [], metals: [], diamonds: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedSizeId, setSelectedSizeId] = useState(null);
  const [selectedMetalId, setSelectedMetalId] = useState(null);
  const [selectedDiamondId, setSelectedDiamondId] = useState(null);

  const [quantity, setQuantity] = useState(1);
  const [showOrderModal, setShowOrderModal] = useState(false);

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
                {displayPrice}
              </span>
            </div>

            {/* METAL */}
            <div className="selector-section">
              <div className="selector-header">
                <h3>Metal</h3>
              </div>

              <div className="metal-options">
                {options.metals.map((metal) => {
                  const isSelected = selectedMetalId === metal.id;
                  return (
                    <div
                      key={metal.id}
                      className={`metal-option ${
                        isSelected ? "selected" : ""
                      }`}
                      onClick={() => setSelectedMetalId(metal.id)}
                    >
                      <div className="metal-name">{metal.title}</div>
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
                {options.diamonds.map((diamond) => {
                  const label =
                    diamond?.quality && diamond?.karets
                      ? `${diamond.quality} • ${diamond.karets}ct`
                      : diamond?.quality || "Diamond";
                  const isSelected = selectedDiamondId === diamond.id;
                  return (
                    <div
                      key={diamond.id}
                      className={`diamond-option ${
                        isSelected ? "selected" : ""
                      }`}
                      onClick={() => setSelectedDiamondId(diamond.id)}
                    >
                      <div className="diamond-quality">{label}</div>
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
                {options.sizes.map((size) => {
                  const isSelected = selectedSizeId === size.id;
                  return (
                    <div
                      key={size.id}
                      className={`size-option ${
                        isSelected ? "selected" : ""
                      }`}
                      onClick={() => setSelectedSizeId(size.id)}
                    >
                      <div className="size-number">{size.size}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* STOCK */}
            {selectedVariant && (
              <div className="quantity-section" style={{ marginTop: 0 }}>
                <label>Stock</label>
                <div style={{ paddingTop: 8 }}>
                  {Number.isFinite(Number(selectedVariant.stock))
                    ? `${selectedVariant.stock} available`
                    : "In stock"}
                </div>
              </div>
            )}

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
          selectedSize={options.sizes.find((s) => s.id === selectedSizeId) || null}
          selectedMetal={options.metals.find((m) => m.id === selectedMetalId) || null}
          selectedDiamond={options.diamonds.find((d) => d.id === selectedDiamondId) || null}
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