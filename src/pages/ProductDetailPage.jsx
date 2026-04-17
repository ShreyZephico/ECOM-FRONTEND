// src/pages/ProductDetailPage.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import OrderModal from "../components/OrderModal";
import "./ProductDetailPage.css";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedMetal, setSelectedMetal] = useState(null);
  const [selectedDiamond, setSelectedDiamond] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [showDiamondGuide, setShowDiamondGuide] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [addedToBag, setAddedToBag] = useState(false);

  useEffect(() => {
    // Simulate API call - Replace with actual API
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = async () => {
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      const dummyProduct = {
        id: parseInt(id),
        name: getProductName(id),
        price: getProductPrice(id),
        comparePrice: getProductComparePrice(id),
        rating: 4.9,
        reviews: 515,
        image: "https://via.placeholder.com/500x500?text=Diamond+Ring",
        images: [
          "https://via.placeholder.com/500x500?text=Front+View",
          "https://via.placeholder.com/500x500?text=Side+View",
          "https://via.placeholder.com/500x500?text=Detail+View",
        ],
        description: "Beautiful diamond ring with exquisite craftsmanship",
        offer: "50% Off on Making + 15% Off on Diamond",
        sizes: [
          {
            size: 5,
            mm: "44.8 mm",
            status: "made_to_order",
            stock: 0,
            price_adjustment: 0,
          },
          {
            size: 6,
            mm: "45.9 mm",
            status: "limited",
            stock: 5,
            price_adjustment: 0,
          },
          {
            size: 7,
            mm: "47.1 mm",
            status: "made_to_order",
            stock: 0,
            price_adjustment: 500,
          },
          {
            size: 8,
            mm: "48.1 mm",
            status: "limited",
            stock: 2,
            price_adjustment: 500,
          },
          {
            size: 9,
            mm: "49.0 mm",
            status: "in_stock",
            stock: 10,
            price_adjustment: 0,
          },
          {
            size: 10,
            mm: "50.0 mm",
            status: "limited",
            stock: 4,
            price_adjustment: 0,
          },
          {
            size: 11,
            mm: "50.9 mm",
            status: "limited",
            stock: 3,
            price_adjustment: 750,
          },
          {
            size: 12,
            mm: "51.8 mm",
            status: "limited",
            stock: 3,
            price_adjustment: 750,
          },
          {
            size: 13,
            mm: "52.8 mm",
            status: "made_to_order",
            stock: 0,
            price_adjustment: 1000,
          },
          {
            size: 14,
            mm: "54.0 mm",
            status: "made_to_order",
            stock: 0,
            price_adjustment: 1000,
          },
        ],
        metals: [
          {
            name: "14 KT Yellow Gold",
            status: "limited",
            stock: 3,
            price_adjustment: 0,
          },
          {
            name: "18 KT Yellow Gold",
            status: "made_to_order",
            stock: 0,
            price_adjustment: 2500,
          },
        ],
        diamonds: [
          {
            quality: "IJ-SI",
            status: "limited",
            stock: 2,
            price_adjustment: 0,
          },
          {
            quality: "FG-SI",
            status: "limited",
            stock: 3,
            price_adjustment: 1500,
          },
        ],
      };
      setProduct(dummyProduct);

      // Set default selections
      const defaultSize =
        dummyProduct.sizes.find((s) => s.status === "in_stock") ||
        dummyProduct.sizes[0];
      const defaultMetal = dummyProduct.metals[0];
      const defaultDiamond = dummyProduct.diamonds[0];

      setSelectedSize(defaultSize);
      setSelectedMetal(defaultMetal);
      setSelectedDiamond(defaultDiamond);
      setLoading(false);
    }, 500);
  };

  const getProductName = (id) => {
    const names = {
      1: "Ray Of Infinite Diamond Ring",
      2: "Classy Knot Diamond Ring",
      3: "Twight Twirl Diamond Ring",
      4: "SUNSHINE Diamond Band",
    };
    return names[id] || "Diamond Ring";
  };

  const getProductPrice = (id) => {
    const prices = { 1: 12342, 2: 12170, 3: 12675, 4: 12162 };
    return prices[id] || 12342;
  };

  const getProductComparePrice = (id) => {
    const prices = { 1: 15146, 2: 14924, 3: 15689, 4: 14719 };
    return prices[id] || 15146;
  };

  const getStockText = (status, stock) => {
    if (status === "in_stock") return "✓ In Stock!";
    if (status === "limited") return `⚠️ Only ${stock} left!`;
    return "🛠️ Made to Order";
  };

  const getStockStatusClass = (status) => {
    if (status === "in_stock") return "in-stock";
    if (status === "limited") return "limited";
    return "made-to-order";
  };

  const calculateTotalPrice = () => {
    let total = product?.price || 0;

    // Add price adjustments from selections
    if (selectedSize?.price_adjustment) {
      total += selectedSize.price_adjustment;
    }
    if (selectedMetal?.price_adjustment) {
      total += selectedMetal.price_adjustment;
    }
    if (selectedDiamond?.price_adjustment) {
      total += selectedDiamond.price_adjustment;
    }

    // Multiply by quantity
    total = total * quantity;

    return total;
  };

  const calculateSavings = () => {
    const originalPrice = (product?.comparePrice || 0) * quantity;
    const currentPrice = calculateTotalPrice();
    return originalPrice - currentPrice;
  };

  const handleAddToBag = () => {
    setAddedToBag(true);
    // Here you would add to cart logic
    setTimeout(() => setAddedToBag(false), 2000);
  };

  const handleBuyNow = () => {
    setShowOrderModal(true);
  };

  const handleQuantityChange = (type) => {
    if (type === "increase" && quantity < 10) {
      setQuantity(quantity + 1);
    } else if (type === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const isSizeSelectable = (size) => {
    return size.status !== "made_to_order" || size.stock > 0;
  };

  if (loading)
    return (
      <div className="loader-container">
        <div className="loader-spinner"></div>
        <p>Loading beautiful jewelry...</p>
      </div>
    );

  if (!product) return <div className="error-container">Product not found</div>;

  return (
    <>
      <div className="product-detail-page">
        <div className="container">
          {/* Breadcrumb */}
          <div className="breadcrumb">
            <a href="/">Home</a> &gt; <a href="/rings">Rings</a> &gt;{" "}
            <span>{product.name}</span>
          </div>

          <div className="product-detail-layout">
            {/* Left Column - Image Gallery */}
            <div className="product-gallery">
              <div className="main-image-container">
                <img
                  src={product.image}
                  alt={product.name}
                  className="main-image"
                />
                <div className="offer-tag">{product.offer}</div>
              </div>
              <div className="thumbnail-gallery">
                {product.images?.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`View ${idx + 1}`}
                    className="thumbnail"
                  />
                ))}
              </div>
            </div>

            {/* Right Column - Product Info */}
            <div className="product-detail-info">
              {/* Rating */}
              <div className="rating-section">
                <div className="stars">
                  {"★".repeat(Math.floor(product.rating))}
                  {"☆".repeat(5 - Math.floor(product.rating))}
                </div>
                <span className="rating">
                  {product.rating} ★ | {product.reviews} Ratings
                </span>
              </div>

              {/* Price */}
              <div className="price-section">
                <div>
                  <span className="current-price">
                    ₹{calculateTotalPrice().toLocaleString("en-IN")}
                  </span>
                  <span className="compare-price">
                    ₹{(product.comparePrice * quantity).toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="savings">
                  You save ₹{calculateSavings().toLocaleString("en-IN")}
                </div>
                <span className="tax-info">(MRP Inclusive of all taxes)</span>
              </div>

              {/* Product Title */}
              <h1 className="product-title">{product.name}</h1>

              {/* Quantity Selector */}
              <div className="quantity-section">
                <label>Quantity:</label>
                <div className="quantity-selector">
                  <button
                    className="qty-btn"
                    onClick={() => handleQuantityChange("decrease")}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="quantity">{quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => handleQuantityChange("increase")}
                    disabled={quantity >= 10}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Metal Selection */}
              <div className="selector-section">
                <div className="selector-header">
                  <h3>Choice of Metal</h3>
                </div>
                <div className="metal-options">
                  {product.metals.map((metal, idx) => (
                    <button
                      key={idx}
                      className={`metal-option ${selectedMetal?.name === metal.name ? "selected" : ""} ${getStockStatusClass(metal.status)}`}
                      onClick={() => setSelectedMetal(metal)}
                    >
                      <div className="metal-name">{metal.name}</div>
                      <div className="metal-price">
                        {metal.price_adjustment > 0 &&
                          `+₹${metal.price_adjustment}`}
                      </div>
                      <div className={`stock-status ${metal.status}`}>
                        {getStockText(metal.status, metal.stock)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Diamond Quality Selection */}
              <div className="selector-section">
                <div className="selector-header">
                  <h3>Diamond Quality</h3>
                  <button
                    className="guide-btn"
                    onClick={() => setShowDiamondGuide(true)}
                  >
                    DIAMOND GUIDE 📘
                  </button>
                </div>
                <div className="diamond-options">
                  {product.diamonds.map((diamond, idx) => (
                    <button
                      key={idx}
                      className={`diamond-option ${selectedDiamond?.quality === diamond.quality ? "selected" : ""} ${getStockStatusClass(diamond.status)}`}
                      onClick={() => setSelectedDiamond(diamond)}
                    >
                      <div className="diamond-quality">{diamond.quality}</div>
                      <div className="diamond-price">
                        {diamond.price_adjustment > 0 &&
                          `+₹${diamond.price_adjustment}`}
                      </div>
                      <div className={`stock-status ${diamond.status}`}>
                        {getStockText(diamond.status, diamond.stock)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="selector-section">
                <div className="selector-header">
                  <h3>Select Size</h3>
                  <button
                    className="guide-btn"
                    onClick={() => setShowSizeGuide(true)}
                  >
                    SIZE GUIDE 📏
                  </button>
                </div>
                <div className="size-grid">
                  {product.sizes.map((size) => (
                    <button
                      key={size.size}
                      className={`size-option ${selectedSize?.size === size.size ? "selected" : ""} ${getStockStatusClass(size.status)}`}
                      onClick={() =>
                        isSizeSelectable(size) && setSelectedSize(size)
                      }
                      disabled={!isSizeSelectable(size)}
                    >
                      <div className="size-number">{size.size}</div>
                      <div className="size-mm">{size.mm}</div>
                      {size.price_adjustment > 0 && (
                        <div className="size-price">
                          +₹{size.price_adjustment}
                        </div>
                      )}
                      <div className={`stock-status ${size.status}`}>
                        {getStockText(size.status, size.stock)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="size-guide-link">
                <button
                  className="learn-how-btn"
                  onClick={() => setShowSizeGuide(true)}
                >
                  📍 Not sure about your ring size? LEARN HOW
                </button>
              </div>

              {/* Selected Configuration Summary */}
              <div className="selected-summary">
                <h4>Selected Configuration:</h4>
                <div className="summary-items">
                  <span className="summary-item">
                    Size: {selectedSize?.size} ({selectedSize?.mm})
                  </span>
                  <span className="summary-item">
                    Metal: {selectedMetal?.name}
                  </span>
                  <span className="summary-item">
                    Diamond: {selectedDiamond?.quality}
                  </span>
                  <span className="summary-item">Quantity: {quantity}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="action-buttons">
                <button
                  className={`add-to-bag-btn ${addedToBag ? "added" : ""}`}
                  onClick={handleAddToBag}
                >
                  {addedToBag ? "✓ Added to Bag!" : "🛒 ADD TO BAG"}
                </button>
                <button className="buy-now-btn" onClick={handleBuyNow}>
                  🔥 BUY NOW
                </button>
              </div>

              {/* Delivery Info */}
              <div className="delivery-info">
                <div className="delivery-item">
                  <span className="delivery-icon">🚚</span>
                  <div>
                    <strong>Free Delivery</strong>
                    <p>On orders above ₹10,000</p>
                  </div>
                </div>
                <div className="delivery-item">
                  <span className="delivery-icon">🛡️</span>
                  <div>
                    <strong>30-Day Return</strong>
                    <p>Easy returns & exchange</p>
                  </div>
                </div>
                <div className="delivery-item">
                  <span className="delivery-icon">✨</span>
                  <div>
                    <strong>Certified Diamonds</strong>
                    <p>IGI certified</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div className="modal-overlay" onClick={() => setShowSizeGuide(false)}>
          <div className="guide-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setShowSizeGuide(false)}
            >
              ×
            </button>
            <h2>📏 Ring Size Guide</h2>
            <div className="guide-content">
              <h3>How to Measure Your Ring Size</h3>
              <ul>
                <li>📐 Use a measuring tape or string</li>
                <li>💍 Wrap around your finger where the ring will sit</li>
                <li>📏 Mark the point where it meets</li>
                <li>📊 Measure the length in millimeters</li>
                <li>📋 Use the chart below to find your size</li>
              </ul>
              <div className="size-chart">
                <table>
                  <thead>
                    <tr>
                      <th>India Size</th>
                      <th>US Size</th>
                      <th>UK Size</th>
                      <th>Circumference (mm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.sizes.map((size) => (
                      <tr key={size.size}>
                        <td>
                          <strong>{size.size}</strong>
                        </td>
                        <td>
                          {size.size === 5
                            ? "2.5"
                            : size.size === 6
                              ? "3.5"
                              : size.size === 7
                                ? "4.5"
                                : size.size === 8
                                  ? "5.5"
                                  : size.size === 9
                                    ? "6.5"
                                    : size.size === 10
                                      ? "7.5"
                                      : size.size === 11
                                        ? "8.5"
                                        : size.size === 12
                                          ? "9.5"
                                          : size.size === 13
                                            ? "10.5"
                                            : "11.5"}
                        </td>
                        <td>{String.fromCharCode(72 + (size.size - 5))}</td>
                        <td>{size.mm}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Diamond Guide Modal */}
      {showDiamondGuide && (
        <div
          className="modal-overlay"
          onClick={() => setShowDiamondGuide(false)}
        >
          <div className="guide-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setShowDiamondGuide(false)}
            >
              ×
            </button>
            <h2>✨ Diamond Quality Guide</h2>
            <div className="guide-content">
              <h3>Understanding Diamond Quality</h3>
              <div className="diamond-info">
                <div className="diamond-grade">
                  <h4>FG-SI</h4>
                  <p>
                    <strong>Color:</strong> F-G (Near Colorless)
                  </p>
                  <p>
                    <strong>Clarity:</strong> SI (Slightly Included)
                  </p>
                  <p>
                    <strong>Quality:</strong> Premium
                  </p>
                </div>
                <div className="diamond-grade">
                  <h4>IJ-SI</h4>
                  <p>
                    <strong>Color:</strong> I-J (Faint Yellow)
                  </p>
                  <p>
                    <strong>Clarity:</strong> SI (Slightly Included)
                  </p>
                  <p>
                    <strong>Quality:</strong> Standard
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Order Modal */}
      {showOrderModal && (
        <OrderModal
          product={product}
          selectedSize={selectedSize}
          selectedMetal={selectedMetal}
          selectedDiamond={selectedDiamond}
          quantity={quantity}
          totalPrice={calculateTotalPrice()}
          onClose={() => setShowOrderModal(false)}
        />
      )}
    </>
  );
};

export default ProductDetailPage;
