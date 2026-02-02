import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import './Demographics.css';

function Demographics() {
  const navigate = useNavigate();
  const [demographicsData, setDemographicsData] = useState(null);
  const [selectedRace, setSelectedRace] = useState(null);
  const [selectedAge, setSelectedAge] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem('analysisResults');
    if (data) {
      const parsed = JSON.parse(data);
      setDemographicsData(parsed.data);
      
      // Set initial selections to highest scored values
      if (parsed.data.race) {
        const topRace = Object.entries(parsed.data.race).sort((a, b) => b[1] - a[1])[0];
        setSelectedRace(topRace[0]);
      }
      if (parsed.data.age) {
        const topAge = Object.entries(parsed.data.age).sort((a, b) => b[1] - a[1])[0];
        setSelectedAge(topAge[0]);
      }
      if (parsed.data.gender) {
        const topGender = Object.entries(parsed.data.gender).sort((a, b) => b[1] - a[1])[0];
        setSelectedGender(topGender[0]);
      }
    }
  }, []);

  const getSortedData = (dataObj) => {
    if (!dataObj) return [];
    return Object.entries(dataObj)
      .sort((a, b) => b[1] - a[1])
      .map(([key, value]) => ({ key, value: (value * 100).toFixed(2) }));
  };

  const formatLabel = (str) => {
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="demographics-page">
      <Header showStartAnalysis={false} showAnalysis={true} />
      <div className="demographics-content">
        <div className="ai-analysis-title">A.I. ANALYSIS</div>
        <div className="demographics-subtitle">DEMOGRAPHICS</div>
        <div className="predicted-text">PREDICTED RACE & AGE</div>
      </div>
      <div className="demographics-boxes">
        <div className="demographics-box race-box">
          <div className="race-value">{selectedRace ? formatLabel(selectedRace) : 'N/A'}</div>
          <div className="race-label">RACE</div>
        </div>
        <div className="demographics-box age-box">
          <div className="age-value">{selectedAge || 'N/A'}</div>
          <div className="age-label">AGE</div>
        </div>
        <div className="demographics-box gender-box">
          <div className="gender-value">{selectedGender ? formatLabel(selectedGender) : 'N/A'}</div>
          <div className="gender-label">SEX</div>
        </div>
      </div>
      <div className="large-demographics-box">
        <div className="selected-race-display">{selectedRace ? formatLabel(selectedRace) : 'N/A'}</div>
        <div className="circular-graph">
          <div className="circle-progress" style={{
            background: `conic-gradient(#1A1B1C ${demographicsData && selectedRace ? (demographicsData.race[selectedRace] * 360) : 0}deg, #E0E0E0 0deg)`
          }}>
            <div className="circle-inner">
              <span className="percentage-text">
                {demographicsData && selectedRace ? (demographicsData.race[selectedRace] * 100).toFixed(2) : '0.00'}%
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="instruction-text">If A.I estimate is wrong, select the correct one.</div>
      <div className="right-demographics-box">
        <div className="box-header">
          <div className="box-title">RACE</div>
          <div className="box-title">A.I. CONFIDENCE</div>
        </div>
        <div className="predictions-list">
          {demographicsData && getSortedData(demographicsData.race).map((item) => (
            <div 
              key={item.key}
              className={`prediction-item ${selectedRace === item.key ? 'selected' : ''}`}
              onClick={() => setSelectedRace(item.key)}
            >
              <span className="prediction-label">{formatLabel(item.key)}</span>
              <span className="prediction-value">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
      <div className="instruction-text">If A.I estimate is wrong, select the correct one.</div>
      <div className="action-buttons">
        <button className="reset-button" onClick={() => navigate('/')}>RESET</button>
        <button className="confirm-button">CONFIRM</button>
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
