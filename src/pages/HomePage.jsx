// src/pages/HomePage.jsx
import React, { useEffect, useState } from 'react';
import { fetchStoreProducts } from '../api/storeProducts';
import ProductCard from '../Components/ProductCard';
import './HomePage.css';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError('');
        const storeProducts = await fetchStoreProducts();
        setProducts(storeProducts);
      } catch (err) {
        console.error(err);
        setError('Unable to load products from the store API.');
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
    <div className="home-page">
      <div className="container">
        <div className="products-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
