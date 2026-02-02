import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TakeTest from './pages/TakeTest';
import TakeTestLocation from './pages/TakeTestLocation';
import NextStep from './pages/NextStep';
import AnalysisLoading from './pages/AnalysisLoading';
import AnalysisResults from './pages/AnalysisResults';
import Demographics from './pages/Demographics';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/take-test" element={<TakeTest />} />
        <Route path="/take-test-location" element={<TakeTestLocation />} />
        <Route path="/next-step" element={<NextStep />} />
        <Route path="/analysis-loading" element={<AnalysisLoading />} />
        <Route path="/analysis-results" element={<AnalysisResults />} />
        <Route path="/demographics" element={<Demographics />} />
      </Routes>
    </Router>
  );
}

export default App;
