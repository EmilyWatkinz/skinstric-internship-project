import './App.css';

function App() {
  return (
    <div className="App">
      <div className="top-left-text">
        <span className="skinstric-text">Skinstric</span>
        <span className="intro-text">[ Intro ]</span>
      </div>
      <img src="/header.png" alt="Header" className="header-image" />
      <div className="triangle triangle-left"></div>
      <div className="triangle triangle-right"></div>
      <img src="/ai-button-icon-text-shrunk.png" alt="AI Button" className="ai-button" />
      <img src="/button-icon-text-shrunk.png" alt="Take Test" className="take-test-button" />
      <div className="sophisticated-page">
        <div className="sophisticated-text">Sophisticated</div>
        <div className="skincare-text">skincare</div>
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
