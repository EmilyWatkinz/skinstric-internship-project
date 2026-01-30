import './App.css';
import { useState } from 'react';

function App() {
  const [hoveredButton, setHoveredButton] = useState(null);

  return (
    <div className="App">
      <div className="top-left-text">
        <a href="/" className="skinstric-link">
          <span className="skinstric-text">Skinstric</span>
        </a>
        <span className="intro-text">[ Intro ]</span>
      </div>
      <img src="/header.png" alt="Header" className="header-image" />
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

export default App;
