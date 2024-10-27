// SeasonalChart.jsx
import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import Papa from "papaparse";

const SeasonalChart = () => {
  const [trendData, setTrendData] = useState([]);
  const [seasonalData, setSeasonalData] = useState([]);
  const [residualData, setResidualData] = useState([]);

  useEffect(() => {
    Papa.parse("/selected_crude_oil_imports.csv", {
      download: true,
      header: true,
      complete: (result) => {
        const csvData = result.data;
        const periods = csvData.map((row) => row.Period);

        setTrendData([
          {
            x: periods,
            y: csvData.map((row) => parseFloat(row.Trend)),
            type: "scatter",
            mode: "lines",
            name: "Trend",
          },
        ]);
        setSeasonalData([
          {
            x: periods,
            y: csvData.map((row) => parseFloat(row.Seasonal)),
            type: "scatter",
            mode: "lines",
            name: "Seasonal",
          },
        ]);
        setResidualData([
          {
            x: periods,
            y: csvData.map((row) => parseFloat(row.Residual)),
            type: "scatter",
            mode: "lines",
            name: "Residual",
          },
        ]);
      },
    });
  }, []);

  return (
    <div>
      <h2>Phân Tích Mùa Vụ</h2>
      <Plot data={trendData} layout={{ title: "Trend Component" }} />
      <Plot data={seasonalData} layout={{ title: "Seasonal Component" }} />
      <Plot data={residualData} layout={{ title: "Residual Component" }} />
    </div>
  );
};

export default SeasonalChart;
