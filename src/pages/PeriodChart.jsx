// FourierTransformChart.jsx
import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import Papa from "papaparse";

const PeriodChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    Papa.parse("/selected_crude_oil_imports.csv", {
      download: true,
      header: true,
      complete: (result) => {
        const csvData = result.data;
        const frequencies = csvData.map((row) => parseFloat(row.Frequency));
        const magnitudes = csvData.map((row) => parseFloat(row.Magnitude));

        setChartData([
          {
            x: frequencies,
            y: magnitudes,
            type: "scatter",
            mode: "lines",
            marker: { color: "purple" },
          },
        ]);
      },
    });
  }, []);

  return (
    <div>
      <h2>Fourier Transform - Magnitude Spectrum</h2>
      <Plot
        data={chartData}
        layout={{
          title: "Fourier Transform Spectrum",
          xaxis: { title: "Frequency" },
          yaxis: { title: "Magnitude" },
        }}
      />
    </div>
  );
};

export default PeriodChart;
