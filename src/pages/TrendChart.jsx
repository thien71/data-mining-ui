// TrendChart.jsx
import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import Papa from "papaparse";

const TrendChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    Papa.parse("/selected_crude_oil_imports.csv", {
      download: true,
      header: true,
      complete: (result) => {
        const csvData = result.data;
        const periods = csvData.map((row) => row.Period);
        const quantities = csvData.map((row) => parseFloat(row.Quantity));

        setChartData([
          {
            x: periods,
            y: quantities,
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "blue" },
          },
        ]);
      },
    });
  }, []);

  return (
    <div>
      <h2>Biểu đồ Xu Hướng</h2>
      <Plot
        data={chartData}
        layout={{
          title: "Xu Hướng Lượng Dầu Nhập Khẩu Theo Thời Gian",
          xaxis: { title: "Thời gian" },
          yaxis: { title: "Lượng nhập khẩu" },
        }}
      />
    </div>
  );
};

export default TrendChart;
