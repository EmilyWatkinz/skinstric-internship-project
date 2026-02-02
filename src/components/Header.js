import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header({ showStartAnalysis = false }) {
  return (
    <>
      <div className="top-left-text">
        <Link to="/" className="skinstric-link">
          <span className="skinstric-text">Skinstric</span>
        </Link>
        <span className="intro-text">[ Intro ]</span>
      </div>
      {showStartAnalysis && (
        <div className="start-analysis-text">
          TO START ANALYSIS
        </div>
      )}
      <img src="/header.png" alt="Header" className="header-image" />
    </>
  );
}

export default Header;
