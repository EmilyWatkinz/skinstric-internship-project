import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import './TakeTest.css';

function TakeTestLocation() {
  const [location, setLocation] = useState('');
  const [showProceedButton, setShowProceedButton] = useState(false);
  const navigate = useNavigate();

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && location.trim() !== '') {
      localStorage.setItem('userLocation', location);
      setShowProceedButton(true);
    }
  };

  return (
    <div className="take-test-page">
      <Header showStartAnalysis={true} />
      <div className="diamond diamond-outer"></div>
      <div className="diamond diamond-middle"></div>
      <div className="diamond diamond-inner"></div>
      <div className="click-to-type-text">
        click to type
      </div>
      <input 
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="your city name"
        className="introduce-yourself-text"
      />
      <img 
        src={process.env.PUBLIC_URL + "/back-button-icon-text-shrunk.svg"}
        alt="Back" 
        className="back-button-icon"
        onClick={() => navigate('/')}
      />
      {showProceedButton && (
        <img 
          src={process.env.PUBLIC_URL + "/proceed-button-icon-text-shrunk.svg"}
          alt="Proceed" 
          className="proceed-button-icon"
          onClick={() => console.log('Proceed clicked')}
        />
      )}
    </div>
  );
}

export default TakeTestLocation;
