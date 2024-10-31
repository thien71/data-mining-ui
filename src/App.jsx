// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TrendChart from "./pages/TrendChart";
import SeasonalDecompositionChart from "./pages/SeasonalChart";
import FourierTransformChart from "./pages/PeriodChart";
import CorrelationMapChart from "./pages/CorrelationMapChart";
import HomePage from "./pages/HomePage/HomePage";

import "./App.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/trend" element={<TrendChart />} />
          <Route path="/seasonal" element={<SeasonalDecompositionChart />} />
          <Route path="/fourier" element={<FourierTransformChart />} />
          <Route path="/correlation" element={<CorrelationMapChart />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
