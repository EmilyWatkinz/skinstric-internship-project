import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import './AnalysisLoading.css';

function AnalysisLoading() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkResults = setInterval(() => {
      const results = localStorage.getItem('analysisResults');
      if (results) {
        clearInterval(checkResults);
        setTimeout(() => {
          navigate('/analysis-results');
        }, 1500);
      }
    }, 500);

    return () => clearInterval(checkResults);
  }, [navigate]);

  return (
    <div className="analysis-loading-page">
      <Header showStartAnalysis={true} />
      <div className="diamond diamond-outer"></div>
      <div className="diamond diamond-middle"></div>
      <div className="diamond diamond-inner"></div>
      <div className="preparing-text">
        Preparing your analysis...
      </div>
    </div>
  );
}

export default AnalysisLoading;
