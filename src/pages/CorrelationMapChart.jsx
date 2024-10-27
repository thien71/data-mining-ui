// CorrelationMapChart.jsx
import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import Papa from "papaparse";

const CorrelationMapChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    Papa.parse("/data.csv", {
      download: true,
      header: true,
      complete: (result) => {
        const csvData = result.data;

        const zValues = [
          [1, 0.5, 0.2], // correlation values for each variable pair
          [0.5, 1, 0.3],
          [0.2, 0.3, 1],
        ];

        setChartData([
          {
            z: zValues,
            type: "heatmap",
            colorscale: "Viridis",
          },
        ]);
      },
    });
  }, []);

  return (
    <div>
      <h2>Bản Đồ Tương Quan</h2>
      <Plot
        data={chartData}
        layout={{
          title: "Correlation Map",
          xaxis: { title: "Variables" },
          yaxis: { title: "Variables" },
        }}
      />
    </div>
  );
};

export default CorrelationMapChart;
