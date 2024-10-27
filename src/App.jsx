// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TrendChart from "./pages/TrendChart";
import SeasonalDecompositionChart from "./pages/SeasonalChart";
import FourierTransformChart from "./pages/PeriodChart";
import CorrelationMapChart from "./pages/CorrelationMapChart";

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Trang chủ</Link>
            </li>
            <li>
              <Link to="/trend">Biểu đồ Xu Hướng</Link>
            </li>
            <li>
              <Link to="/seasonal">Phân Tích Mùa Vụ</Link>
            </li>
            <li>
              <Link to="/fourier">Fourier Transform</Link>
            </li>
            <li>
              <Link to="/correlation">Bản Đồ Tương Quan</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<div>Trang Chủ</div>} />
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
