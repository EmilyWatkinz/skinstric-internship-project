import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import './AnalysisResults.css';

function AnalysisResults() {
  const navigate = useNavigate();

  const handleDemographicsClick = () => {
    navigate('/demographics');
  };

  return (
    <div className="analysis-results-page">
      <Header showStartAnalysis={false} showAnalysis={true} />
      <div className="diamonds-container">
        <div className="diamond diamond-outer"></div>
        <div className="diamond diamond-middle"></div>
        <div className="diamond diamond-inner"></div>
      </div>
      
      <div className="center-diamond">
        <div className="center-diamond-quadrant top-quadrant">
          <span className="quadrant-label">COSMETIC CONCERNS</span>
        </div>
        <div className="center-diamond-quadrant right-quadrant">
          <span className="quadrant-label">WEATHER</span>
        </div>
        <div className="center-diamond-quadrant bottom-quadrant">
          <span className="quadrant-label">SKIN TYPE DETAILS</span>
        </div>
        <div className="center-diamond-quadrant left-quadrant">
          <span className="quadrant-label clickable" onClick={handleDemographicsClick}>DEMOGRAPHICS</span>
        </div>
      </div>
      
      <div className="ai-analysis-text">
        <div className="ai-analysis-title">A.I. ANALYSIS</div>
        <div className="ai-analysis-subtitle">A.I. HAS ESTIMATED THE FOLLOWING.</div>
        <div className="ai-analysis-subtitle">FIX ESTIMATED INFORMATION IF NEEDED.</div>
      </div>
      <img 
        src={process.env.PUBLIC_URL + "/back-button-icon-text-shrunk.svg"}
        alt="Back" 
        className="back-button-icon"
        onClick={() => navigate('/next-step')}
      />
      <img 
        src={process.env.PUBLIC_URL + "/summary-button-icon-text-shrunk.svg"}
        alt="Summary" 
        className="summary-button-icon"
        onClick={() => navigate('/demographics')}
      />
    </div>
  );
}

export default AnalysisResults;
