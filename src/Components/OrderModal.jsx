import React, { useState } from "react";
import { formatPrice, getProductTitle } from "../utils/storeProduct";
import "./OrderModal.css";

const OrderModal = ({
  product,
  selectedSize,
  selectedMetal,
  selectedDiamond,
  quantity,
  totalPrice,
  onClose,
}) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      console.log("Order placed:", {
        product: getProductTitle(product),
        productId: product?.id,
        email,
        name,
        phone,
        quantity,
        size: selectedSize,
        metal: selectedMetal,
        variantId: selectedMetal?.variant?.id,
        diamond: selectedDiamond,
        totalPrice,
      });
      setSubmitted(true);
      setLoading(false);

      setTimeout(() => {
        onClose();
      }, 3000);
    }, 1500);
  };

  const displayTotal = formatPrice(totalPrice) || "To be confirmed";

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
          <p>Our team will contact you shortly to confirm the order.</p>
          <button className="close-modal-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="order-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          x
        </button>

        <h2>Complete Your Order</h2>

        <div className="order-summary">
          <h3>{getProductTitle(product)}</h3>
          <div className="selected-options">
            {selectedSize && (
              <p>
                Size: {selectedSize.size} ({selectedSize.mm})
              </p>
            )}
            {selectedMetal && <p>Metal: {selectedMetal.name}</p>}
            {selectedDiamond && <p>Diamond: {selectedDiamond.quality}</p>}
            <p>Quantity: {quantity}</p>
          </div>
          <div className="total-price">
            <strong>Total Amount: {displayTotal}</strong>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
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
            <label>Phone Number (Optional)</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
            />
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
