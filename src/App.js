import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TakeTest from './pages/TakeTest';
import TakeTestLocation from './pages/TakeTestLocation';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/take-test" element={<TakeTest />} />
        <Route path="/take-test-location" element={<TakeTestLocation />} />
      </Routes>
    </Router>
  );
}

export default App;
