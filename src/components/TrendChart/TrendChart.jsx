import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

const TrendChart = () => {
  const [trendData, setTrendData] = useState([]);

  useEffect(() => {
    // Fetch data from the API endpoint
    fetch("http://localhost:8000/api/trending")
      .then((response) => response.json())
      .then((data) => {
        // Assuming the response is in the format you shared for `trend`
        const trend = data.trend;

        // Convert date and value arrays for plotting
        const dates = trend.map((item) => item.date); // Extract dates
        const trendValues = trend.map((item) => item.value); // Extract values (trend)

        // Set the data for Plotly
        setTrendData([
          {
            x: dates,
            y: trendValues,
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "green", size: 2 },
            line: { shape: "linear" },
          },
        ]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="chart-item">
      <h2>Biểu đồ Trend - Xu hướng tỷ lệ mất điện theo thời gian</h2>
      <Plot
        data={trendData}
        layout={{
          title: "Xu hướng tỷ lệ mất điện theo thời gian",
          xaxis: {
            title: "Ngày",
            tickangle: -45,
            type: "date",
          },
          yaxis: { title: "Tỷ lệ ngừng hoạt động" },
          width: 1400,
          height: 400,
        }}
      />
    </div>
  );
};

export default TrendChart;
