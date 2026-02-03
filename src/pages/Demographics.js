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
  const [activeCategory, setActiveCategory] = useState('race');

  useEffect(() => {
    const data = localStorage.getItem('analysisResults');
    if (data) {
      const parsed = JSON.parse(data);
      setDemographicsData(parsed.data);
      
      
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
      .sort((a, b) => {
        // For age data, sort numerically from oldest to youngest
        if (activeCategory === 'age') {
          // Extract numeric values from age ranges (e.g., "20-29" -> 20)
          const getAgeValue = (str) => {
            const match = str.match(/\d+/);
            return match ? parseInt(match[0]) : 0;
          };
          return getAgeValue(b[0]) - getAgeValue(a[0]);
        }
        // For race and gender, sort by confidence (highest first)
        return b[1] - a[1];
      })
      .map(([key, value]) => ({ key, value: (value * 100).toFixed(2) }));
  };

  const formatLabel = (str) => {
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const getCurrentData = () => {
    if (!demographicsData) return { selectedValue: 'N/A', selectedKey: null, dataObj: null };
    
    if (activeCategory === 'race') {
      return {
        selectedValue: selectedRace ? formatLabel(selectedRace) : 'N/A',
        selectedKey: selectedRace,
        dataObj: demographicsData.race
      };
    } else if (activeCategory === 'age') {
      return {
        selectedValue: selectedAge || 'N/A',
        selectedKey: selectedAge,
        dataObj: demographicsData.age
      };
    } else if (activeCategory === 'gender') {
      return {
        selectedValue: selectedGender ? formatLabel(selectedGender) : 'N/A',
        selectedKey: selectedGender,
        dataObj: demographicsData.gender
      };
    }
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const handleItemSelect = (key) => {
    if (activeCategory === 'race') {
      setSelectedRace(key);
    } else if (activeCategory === 'age') {
      setSelectedAge(key);
    } else if (activeCategory === 'gender') {
      setSelectedGender(key);
    }
  };

  const currentData = getCurrentData();

  return (
    <div className="demographics-page">
      <Header showStartAnalysis={false} showAnalysis={true} />
      <div className="demographics-content">
        <div className="ai-analysis-title">A.I. ANALYSIS</div>
        <div className="demographics-subtitle">DEMOGRAPHICS</div>
        <div className="predicted-text">PREDICTED RACE & AGE</div>
      </div>
      <div className="demographics-boxes-container">
        <div className="demographics-boxes">
          <div 
            className={`demographics-box race-box ${activeCategory === 'race' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('race')}
            style={{ cursor: 'pointer' }}
          >
            <div className="race-value">{selectedRace ? formatLabel(selectedRace) : 'N/A'}</div>
            <div className="race-label">RACE</div>
          </div>
          <div 
            className={`demographics-box age-box ${activeCategory === 'age' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('age')}
            style={{ cursor: 'pointer' }}
          >
            <div className="age-value">{selectedAge || 'N/A'}</div>
            <div className="age-label">AGE</div>
          </div>
          <div 
            className={`demographics-box gender-box ${activeCategory === 'gender' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('gender')}
            style={{ cursor: 'pointer' }}
          >
            <div className="gender-value">{selectedGender ? formatLabel(selectedGender) : 'N/A'}</div>
            <div className="gender-label">SEX</div>
          </div>
        </div>
        <div className="large-demographics-box">
          <div className="selected-race-display">{currentData.selectedValue}</div>
          <div className="circular-graph">
            <div className="circle-progress" style={{
              background: `conic-gradient(#1A1B1C ${currentData.dataObj && currentData.selectedKey ? (currentData.dataObj[currentData.selectedKey] * 360) : 0}deg, #E0E0E0 0deg)`
            }}>
              <div className="circle-inner">
                <span className="percentage-text">
                  {currentData.dataObj && currentData.selectedKey ? (currentData.dataObj[currentData.selectedKey] * 100).toFixed(2) : '0.00'}%
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="right-demographics-box">
          <div className="box-header">
            <div className="box-title">{activeCategory.toUpperCase()}</div>
            <div className="box-title">A.I. CONFIDENCE</div>
          </div>
          <div className="predictions-list">
            {currentData.dataObj && getSortedData(currentData.dataObj).map((item) => (
              <div 
                key={item.key}
                className={`prediction-item ${currentData.selectedKey === item.key ? 'selected' : ''}`}
                onClick={() => handleItemSelect(item.key)}
              >
                <span className="prediction-label">{activeCategory === 'age' ? item.key : formatLabel(item.key)}</span>
                <span className="prediction-value">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="instruction-text">If A.I estimate is wrong, select the correct one.</div>
      <div className="action-buttons">
        <button className="reset-button" onClick={() => navigate('/')}>RESET</button>
        <button className="confirm-button" onClick={() => navigate('/')}>CONFIRM</button>
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
