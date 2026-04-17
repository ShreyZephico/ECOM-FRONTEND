// src/pages/HomePage.jsx
import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import './HomePage.css';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call - Replace with actual API
    setTimeout(() => {
      const dummyProducts = [
        {
          id: 1,
          name: 'Ray Of Infinite Diamond Ring',
          price: 12342,
          comparePrice: 15146,
          image: 'https://via.placeholder.com/300x300?text=Ray+Infinite+Ring',
          rating: 4.9,
          reviews: 515
        },
        {
          id: 2,
          name: 'Classy Knot Diamond Ring',
          price: 12170,
          comparePrice: 14924,
          image: 'https://via.placeholder.com/300x300?text=Classy+Knot+Ring',
          rating: 4.8,
          reviews: 423
        },
        {
          id: 3,
          name: 'Twight Twirl Diamond Ring',
          price: 12675,
          comparePrice: 15689,
          image: 'https://via.placeholder.com/300x300?text=Twight+Twirl+Ring',
          rating: 4.9,
          reviews: 387
        },
        {
          id: 4,
          name: 'SUNSHINE Diamond Band',
          price: 12162,
          comparePrice: 14719,
          image: 'https://via.placeholder.com/300x300?text=SUNSHINE+Band',
          rating: 4.7,
          reviews: 298
        }
      ];
      setProducts(dummyProducts);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <div className="loader">Loading beautiful jewelry...</div>;
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