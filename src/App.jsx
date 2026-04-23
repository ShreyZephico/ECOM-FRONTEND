// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import TestSizePage from './pages/TestSizePage';
import Header from './Components/Header';
import IntroSplash from './Components/IntroSplash';

import './index.css';

function App() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    if (!showIntro) {
      return undefined;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [showIntro]);

  return (
    <Router basename={import.meta.env.BASE_URL}>
      {showIntro && <IntroSplash onComplete={() => setShowIntro(false)} />}
      {!showIntro && (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/test-size" element={<TestSizePage />} />
          </Routes>
        </>
      )}
    </Router>
  );
}

export default App;
