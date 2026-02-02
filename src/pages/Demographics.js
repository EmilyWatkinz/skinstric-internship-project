import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Demographics.css';

function Demographics() {
  const navigate = useNavigate();

  return (
    <div className="demographics-page">
      <div className="demographics-header">
        <div className="skinstric-text">SKINSTRIC</div>
        <div className="ai-analysis-text-bold">A.I. ANALYSIS</div>
      </div>
      <img 
        src={process.env.PUBLIC_URL + "/back-button-icon-text-shrunk.svg"}
        alt="Back" 
        className="back-button-icon"
        onClick={() => navigate('/analysis-results')}
      />
    </div>
  );
}

export default Demographics;
