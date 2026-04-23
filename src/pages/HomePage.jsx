// src/pages/HomePage.jsx
import React, { useEffect, useState } from "react";
import { fetchCombinations, fetchStoreProducts } from "../api/storeProducts";
import ProductCard from "../Components/ProductCard";
import "./HomePage.css";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");
        const [storeProducts, combinations] = await Promise.all([
          fetchStoreProducts(),
          fetchCombinations(),
        ]);

        const minPriceByProductId = new Map();
        combinations.forEach((c) => {
          const productId = c?.product_id;
          const price = Number(c?.price);
          if (!productId || !Number.isFinite(price) || price <= 0) return;

          const current = minPriceByProductId.get(productId);
          if (!Number.isFinite(current) || price < current) {
            minPriceByProductId.set(productId, price);
          }
        });

        const enriched = storeProducts.map((p) => ({
          ...p,
          combination_min_price: minPriceByProductId.get(p.id) ?? null,
        }));

        setProducts(enriched);
      } catch (err) {
        console.error(err);
        setError("Unable to load products from the store API.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return <div className="loader">Loading beautiful jewelry...</div>;
  }

  if (error) {
    return <div className="loader">{error}</div>;
  }

  return (
    <>
      {/* Hero Section with Dynamic Image from Public Folder */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-background">
          <img
            src="/hero.png"
            alt="ZEPHICO Timeless Jewellery"
            className="hero-bg-image"
          />
        </div>
        <div className="hero-content">
          <span className="hero-tagline">
            ✨ CRAFTED WITH PASSION SINCE 2023 ✨
          </span>
          <h1 className="hero-title">
            Timeless Elegance
            <br />
            <span className="hero-subtitle">For Every Moment</span>
          </h1>
          <p className="hero-description">
            Discover our exquisite collection of handcrafted fine jewelry,
            designed to celebrate life's most precious moments with timeless
            beauty.
          </p>
          <div className="hero-buttons">
            <button
              className="btn-primary"
              onClick={() =>
                document
                  .getElementById("products-section")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Shop Now
            </button>
            <button className="btn-secondary">View Collections</button>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">100%</span>
              <span className="stat-label">Certified</span>
            </div>
            <div className="stat">
              <span className="stat-number">Free</span>
              <span className="stat-label">Shipping</span>
            </div>
            <div className="stat">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Support</span>
            </div>
          </div>
        </div>
        <div className="hero-scroll-indicator">
          <span>Scroll to Explore</span>
          <div className="scroll-mouse"></div>
        </div>
      </section>

      {/* Products Section */}
      <div className="home-page" id="products-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Our Collections</span>
            <h2>Featured Masterpieces</h2>
            
          </div>
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
