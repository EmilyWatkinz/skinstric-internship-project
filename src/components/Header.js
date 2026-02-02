import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header({ showStartAnalysis = false, showAnalysis = false }) {
  return (
    <>
      <div className="top-left-text">
        <Link to="/" className="skinstric-link">
          <span className="skinstric-text">SKINSTRIC</span>
        </Link>
        <span className="intro-text">{showAnalysis ? '[ Analysis ]' : '[ Intro ]'}</span>
      </div>
      {showStartAnalysis && (
        <div className="start-analysis-text">
          TO START ANALYSIS
        </div>
      )}
    </>
  );
}

export default Header;
