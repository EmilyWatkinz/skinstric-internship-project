import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import './TakeTest.css';

function TakeTest() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && name.trim() !== '') {
      localStorage.setItem('userName', name);
      navigate('/take-test-location');
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
      <input 
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
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
