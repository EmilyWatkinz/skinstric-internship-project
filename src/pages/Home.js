import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import './Home.css';

function Home() {
  const [hoveredButton, setHoveredButton] = useState(null);
  const navigate = useNavigate();

  const handleTakeTestClick = () => {
    navigate('/take-test');
  };

  return (
    <div className="App">
      <Header />
      <div className={`triangle triangle-left ${hoveredButton === 'right' ? 'hidden' : ''}`}></div>
      <div className={`triangle triangle-right ${hoveredButton === 'left' ? 'hidden' : ''}`}></div>
      <div 
        className={`ai-button ${hoveredButton === 'right' ? 'hidden' : ''}`}
        onMouseEnter={() => setHoveredButton('left')}
        onMouseLeave={() => setHoveredButton(null)}
      >
        <img src="/ai-button-icon-text-shrunk.svg" alt="" className="button-icon" />
      </div>
      <div 
        className={`take-test-button ${hoveredButton === 'left' ? 'hidden' : ''}`}
        onMouseEnter={() => setHoveredButton('right')}
        onMouseLeave={() => setHoveredButton(null)}
        onClick={handleTakeTestClick}
      >
        <img src="/button-icon-text-shrunk.svg" alt="" className="button-icon" />
      </div>
      <div className={`sophisticated-page ${hoveredButton === 'left' ? 'shift-right' : ''} ${hoveredButton === 'right' ? 'shift-left' : ''}`}>
        <div className="sophisticated-text">Sophisticated</div>
        <div className={`skincare-text ${hoveredButton === 'left' ? 'slide-right' : ''} ${hoveredButton === 'right' ? 'slide-left' : ''}`}>skincare</div>
      </div>
      <div className="bottom-left-text">
        Skinstric developed an A.I. that creates<br />
        a highly-personalised routine tailored<br />
        to what your skin needs.
      </div>
    </div>
  );
}

export default Home;
