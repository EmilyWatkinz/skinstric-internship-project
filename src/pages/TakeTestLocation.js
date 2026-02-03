import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import './TakeTest.css';

function TakeTestLocation() {
  const [location, setLocation] = useState('');
  const [showProceedButton, setShowProceedButton] = useState(false);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (location.trim() !== '' && /^[a-zA-Z\s]+$/.test(location.trim())) {
        localStorage.setItem('userLocation', location);
        setShowProceedButton(true);
        setShowError(false);
      } else {
        setShowError(true);
        setShowProceedButton(false);
      }
    }
  };

  return (
    <div className="take-test-page">
      <Header showStartAnalysis={true} showEnterCode={true} />
      <div className="diamond diamond-outer"></div>
      <div className="diamond diamond-middle"></div>
      <div className="diamond diamond-inner"></div>
      <div className="click-to-type-text">
        click to type
      </div>
      {showError && (
        <div className="error-message">Please enter a valid city name</div>
      )}
      <input 
        type="text"
        value={location}
        onChange={(e) => {
          setLocation(e.target.value);
          setShowError(false);
        }}
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
          onClick={() => navigate('/next-step')}
        />
      )}
    </div>
  );
}

export default TakeTestLocation;
