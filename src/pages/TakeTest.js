import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import './TakeTest.css';

function TakeTest() {
  const [name, setName] = useState('');
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (name.trim() !== '' && /^[a-zA-Z\s]+$/.test(name.trim())) {
        localStorage.setItem('userName', name);
        setShowError(false);
        navigate('/take-test-location');
      } else {
        setShowError(true);
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
        <div className="error-message">Please enter your name (letters only)</div>
      )}
      <input 
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setShowError(false);
        }}
        onKeyPress={handleKeyPress}
        placeholder="Introduce Yourself"
        className="introduce-yourself-text"
      />
      <img 
        src={process.env.PUBLIC_URL + "/back-button-icon-text-shrunk.svg"}
        alt="Back" 
        className="back-button-icon"
        onClick={() => navigate('/')}
      />
    </div>
  );
}

export default TakeTest;
