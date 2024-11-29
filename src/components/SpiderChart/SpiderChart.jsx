import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

const SpiderChart = () => {
  const [seasonalDataByYear, setSeasonalDataByYear] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/seasons/chart")
      .then((response) => response.json())
      .then((data) => setSeasonalDataByYear(data))
      .catch((error) => console.error("Error fetching seasons data:", error));
  }, []);

  // Colors for the year with increased transparency
  const colors = [
    "rgba(255, 193, 7, 0.4)", // Yellow
    "rgba(76, 175, 80, 0.4)", // Green
    "rgba(156, 39, 176, 0.4)", // Purple
    "rgba(100, 181, 246, 0.4)", // Light Blue
    "rgba(255, 82, 82, 0.4)", // Soft Red
  ];

  return (
    <div className="chart-item">
      <h2>Biểu đồ Spider - Số ngày theo mùa</h2>

      {/* First row: All 6 charts displayed evenly */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginBottom: "20px",
        }}
      >
        {/* Combined SpiderChart for all years */}
        <Plot
          data={seasonalDataByYear.map((yearData, index) => ({
            type: "scatterpolar",
            r: [
              parseInt(yearData.High),
              parseInt(yearData.Medium),
              parseInt(yearData.Low),
              parseInt(yearData["Very low"]),
            ],
            theta: ["Very Low", "Low", "Medium", "High"],
            fill: "toself",
            name: `Năm ${yearData.year}`,
            marker: { color: colors[index % colors.length], size: 10 },
            line: {
              color: colors[index % colors.length],
              width: 2,
            },
          }))}
          layout={{
            polar: {
              radialaxis: {
                visible: true,
                tickangle: 45,
                tickfont: { size: 14 },
                gridcolor: "rgba(229, 236, 246, 1)",
              },
              angularaxis: {
                tickfont: { size: 16 },
                rotation: 0,
              },
            },
            showlegend: true,
            title: {
              text: "Dữ liệu theo mùa - Tất cả các năm",
              font: { size: 18 },
            },
            width: 440,
            height: 440,
            plot_bgcolor: "rgba(229, 236, 246, 1)",
            paper_bgcolor: "white",
          }}
        />

        {/* Individual SpiderCharts for each year */}
        {seasonalDataByYear.map((yearData, index) => (
          <Plot
            key={yearData.year}
            data={[
              {
                type: "scatterpolar",
                r: [
                  parseInt(yearData.High),
                  parseInt(yearData.Medium),
                  parseInt(yearData.Low),
                  parseInt(yearData["Very low"]),
                ],
                theta: ["Very low", "Low", "Medium", "High"],
                fill: "toself",
                name: `Năm ${yearData.year}`,
                marker: { color: colors[index % colors.length], size: 10 },
                line: {
                  color: colors[index % colors.length],
                  width: 4,
                },
              },
            ]}
            layout={{
              polar: {
                radialaxis: {
                  visible: true,
                  tickangle: 45,
                  tickfont: { size: 14 },
                  gridcolor: "rgba(229, 236, 246, 1)",
                },
                angularaxis: {
                  tickfont: { size: 16 },
                  rotation: 0,
                },
              },
              showlegend: true,
              title: {
                text: `Dữ liệu theo mùa - ${yearData.year}`,
                font: { size: 18 },
              },
              width: 440,
              height: 440,
              plot_bgcolor: "rgba(229, 236, 246, 1)",
              paper_bgcolor: "white",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SpiderChart;
