// src/pages/TestSizePage.jsx
import React, { useState } from 'react';
import SizeSelector from '../Components/SizeSelector';
import './TestSizePage.css';

const TestSizePage = () => {
  const [selectedSizeData, setSelectedSizeData] = useState(null);

  const handleSizeSelect = (sizeData) => {
    setSelectedSizeData(sizeData);
  };

  return (
    <div className="test-size-page">
      <div className="test-header">
        <h1>🔍 Size Component Testing</h1>
        <p>Complete size selector with all variations and detailed information</p>
      </div>

      {/* Main Size Component */}
      <SizeSelector onSizeSelect={handleSizeSelect} />

      {selectedSizeData && (
        <div className="testing-info">
          <h3>Selected Size:</h3>
          <p>
            Size {selectedSizeData.size} ({selectedSizeData.mm})
          </p>
        </div>
      )}

      {/* Testing Information */}
      <div className="testing-info">
        <h3>📊 Testing Scenarios Covered:</h3>
        <div className="test-cases">
          <div className="test-case">
            <div className="test-badge">✓</div>
            <div>Different stock statuses (In Stock, Limited, Made to Order)</div>
          </div>
          <div className="test-case">
            <div className="test-badge">✓</div>
            <div>Price variations across different sizes</div>
          </div>
          <div className="test-case">
            <div className="test-badge">✓</div>
            <div>International size conversions (US, UK, mm)</div>
          </div>
          <div className="test-case">
            <div className="test-badge">✓</div>
            <div>Available metals per size</div>
          </div>
          <div className="test-case">
            <div className="test-badge">✓</div>
            <div>Available diamond qualities per size</div>
          </div>
          <div className="test-case">
            <div className="test-badge">✓</div>
            <div>Delivery time variations</div>
          </div>
          <div className="test-case">
            <div className="test-badge">✓</div>
            <div>Interactive size selection with detailed view</div>
          </div>
          <div className="test-case">
            <div className="test-badge">✓</div>
            <div>Responsive design for mobile and desktop</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestSizePage;
