import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

const SeasonalChart = () => {
  const [seasonalData, setSeasonalData] = useState([]);

  useEffect(() => {
    // Fetch seasonal data from API
    fetch("http://localhost:8000/api/seasonal")
      .then((response) => response.json())
      .then((data) => {
        const seasonal = data.seasonal;

        const currentYear = new Date().getFullYear();
        // const previousYear = currentYear - 1;

        const filteredData = seasonal.filter((item) => {
          const year = new Date(item.date).getFullYear();
          return year === currentYear;
        });

        // Chuyển dữ liệu ngày và giá trị thành mảng thời gian và giá trị tương ứng
        const dates = filteredData.map((item) => item.date);
        const values = filteredData.map((item) => item.value);

        setSeasonalData([
          {
            x: dates,
            y: values,
            type: "scatter",
            mode: "lines+markers",
            marker: {
              color: "black",
              size: 5,
            },
            line: {
              color: "rgba(30,144,255,0.8)",
              width: 2,
            },
          },
        ]);
      })
      .catch((error) => {
        console.error("Error fetching seasonal data:", error);
      });
  }, []);

  return (
    <div className="chart-item">
      <h2>Biểu đồ Seasonal - Xu hướng theo chu kỳ</h2>
      <Plot
        data={seasonalData}
        layout={{
          title: "Biểu Đồ Xu Hướng Seasonal",
          xaxis: {
            title: "Ngày",
            tickangle: -45,
            tickformat: "%Y-%m-%d",
          },
          yaxis: {
            title: "Giá trị Seasonal",
          },
          width: 1400,
          height: 400,
          showlegend: false,
        }}
      />
    </div>
  );
};

export default SeasonalChart;
