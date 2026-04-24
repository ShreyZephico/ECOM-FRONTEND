import React, { useState } from "react";
import { placeRingOrder } from "../api/storeProducts";
import {
  formatPrice,
  getProductImages,
  getProductTitle,
} from "../utils/storeProduct";
import "./OrderModal.css";

const splitName = (fullName = "") => {
  const trimmed = String(fullName || "").trim();
  if (!trimmed) return { first_name: "", last_name: "" };
  const parts = trimmed.split(/\s+/).filter(Boolean);
  if (parts.length === 1) return { first_name: parts[0], last_name: "" };
  return { first_name: parts[0], last_name: parts.slice(1).join(" ") };
};

const OrderModal = ({
  product,
  selectedSize,
  selectedMetal,
  selectedDiamond,
  quantity,
  totalPrice,
  selectedCombinationId,
  onClose,
}) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [currencyCode, setCurrencyCode] = useState("inr");

  const [address1, setAddress1] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [countryCode, setCountryCode] = useState("IN");

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [orderResponse, setOrderResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    try {
      setSubmitError("");
      setLoading(true);

      const { first_name, last_name } = splitName(name);
      const productName = getProductTitle(product);
      const productImages = getProductImages(product);

      const unitPrice = Number(totalPrice);
      if (!Number.isFinite(unitPrice)) {
        throw new Error("Please select options to get a price.");
      }

      const orderRequest = {
        email,
        full_name: name,
        phone_number: phone || "",
        items: [
          {
            product_name: productName,
            product_images: productImages,
            size: selectedSize?.size ? String(selectedSize.size) : "",
            metal: selectedMetal?.title || selectedMetal?.name || "",
            diamond: selectedDiamond
              ? {
                  quality: selectedDiamond?.quality,
                  karets: selectedDiamond?.karets,
                }
              : null,
            quantity: Number(quantity) || 1,
            unit_price: unitPrice,
          },
        ],
        currency_code: currencyCode,
        shipping_address: {
          first_name,
          last_name,
          address_1: address1,
          city,
          postal_code: postalCode,
          country_code: countryCode,
          phone: phone || "",
        },
        // keep this for backend debugging/joins if needed
        selected_combination_id: selectedCombinationId || null,
      };

      const resp = await placeRingOrder(orderRequest);
      setOrderResponse(resp);
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err?.message || "Unable to place order");
    } finally {
      setLoading(false);
    }
  };

  const computedTotal =
    Number.isFinite(Number(totalPrice)) && Number.isFinite(Number(quantity))
      ? Number(totalPrice) * Number(quantity)
      : totalPrice;
  const displayTotal = formatPrice(computedTotal) || "To be confirmed";

  if (submitted) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div
          className="order-modal success"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="success-icon">OK</div>
          <h2>Order Placed Successfully!</h2>
          <p>
            We have sent a confirmation email to <strong>{email}</strong>
          </p>
          {orderResponse && (
            <p style={{ opacity: 0.9 }}>
              Reference:{" "}
              <strong>
                {orderResponse?.order_id ||
                  orderResponse?.id ||
                  orderResponse?.reference ||
                  "Created"}
              </strong>
            </p>
          )}
          <p>Our team will contact you shortly to confirm the order.</p>
          <button className="close-modal-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={loading ? undefined : onClose}>
      <div className="order-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          x
        </button>

        <h2>Complete Your Order</h2>

        <div className="order-summary">
          <div className="order-summary-header">
            <div>
              <h3>{getProductTitle(product)}</h3>
              <div className="order-summary-subtitle">
                Review your selection
              </div>
            </div>
          </div>

          {getProductImages(product).length > 0 && (
            <div className="order-images" aria-label="Selected product images">
              {getProductImages(product).map((url, idx) => (
                <img
                  key={`${url}-${idx}`}
                  className="order-image"
                  src={url}
                  alt={`${getProductTitle(product)} ${idx + 1}`}
                  loading="lazy"
                />
              ))}
            </div>
          )}

          <div className="selected-options">
            {selectedSize && (
              <p>
                Size: {selectedSize.size} ({selectedSize.mm})
              </p>
            )}
            {selectedMetal && (
              <p>Metal: {selectedMetal.title || selectedMetal.name}</p>
            )}
            {selectedDiamond && <p>Diamond: {selectedDiamond.quality}</p>}
            <p>Quantity: {quantity}</p>
          </div>
          <div className="total-price">
            <strong>Total Amount: {displayTotal}</strong>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {submitError && (
            <div
              className="form-group"
              style={{
                background: "#fff5f5",
                border: "1px solid #fed7d7",
                color: "#9b2c2c",
                padding: 10,
                borderRadius: 10,
              }}
            >
              {submitError}
            </div>
          )}

          <div className="checkout-section">
            <div className="section-title">Contact</div>
            <div className="form-grid two-col">
              <div className="form-group full">
                <label>Email Address *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </div>
          </div>

          <div className="checkout-section">
            <div className="section-title">Shipping</div>
            <div className="form-grid two-col">
              <div className="form-group full">
                <label>Address *</label>
                <input
                  type="text"
                  value={address1}
                  onChange={(e) => setAddress1(e.target.value)}
                  placeholder="House no, street, area"
                  required
                />
              </div>

              <div className="form-group">
                <label>City *</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City"
                  required
                />
              </div>

              <div className="form-group">
                <label>Postal Code *</label>
                <input
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="Postal code"
                  required
                />
              </div>

              <div className="form-group">
                <label>Country Code *</label>
                <input
                  type="text"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value.toUpperCase())}
                  placeholder="IN"
                  maxLength={2}
                  required
                />
              </div>

              <div className="form-group">
                <label>Currency Code</label>
                <input
                  type="text"
                  value={currencyCode}
                  onChange={(e) =>
                    setCurrencyCode(e.target.value.toLowerCase())
                  }
                  placeholder="usd"
                  maxLength={3}
                />
              </div>
            </div>
          </div>

          <button type="submit" className="place-order-btn" disabled={loading}>
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </form>

        <p className="order-note">
          By placing this order, you agree to our terms and conditions. We will
          send order confirmation and updates to your email.
        </p>
      </div>
    </div>
  );
};

export default OrderModal;
