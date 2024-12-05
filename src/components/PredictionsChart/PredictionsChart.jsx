import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

const PredictionsChart = () => {
  const [chartData, setChartData] = useState([]);
  const [predictedPoint, setPredictedPoint] = useState(null);

  // Fetching the data from your API
  useEffect(() => {
    fetch("http://localhost:8000/api/predict-outage")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);
        const { df_result, predicted_date, predicted_percent_outage } = data;

        // Add predicted point to chart
        setChartData(df_result);
        setPredictedPoint({
          date: predicted_date,
          percent_outage: predicted_percent_outage,
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="chart-item">
      <h2>Biểu đồ dự đoán tỉ lệ mất điện</h2>
      <Plot
        data={[
          // Line for historical data
          {
            x: chartData.map((item) => item.date), // Lấy ngày từ dữ liệu
            y: chartData.map((item) => item.percent_outage), // Lấy tỉ lệ mất điện
            type: "scatter", // Loại biểu đồ là line chart
            mode: "lines+markers", // Hiển thị cả đường và điểm
            marker: { color: "#78BCFF", size: 8 },
            name: "Tỉ lệ mất điện (Lịch sử)",
          },
          // Highlighted point for predicted data
          ...(predictedPoint
            ? [
                {
                  x: [predictedPoint.date],
                  y: [predictedPoint.percent_outage],
                  type: "scatter",
                  mode: "markers",
                  marker: { color: "red", size: 16 }, // Làm nổi bật symbol: "star"
                  name: "Dự đoán (Nổi bật)",
                },
              ]
            : []),
        ]}
        layout={{
          title: "Dự đoán tỉ lệ mất điện hạt nhân",
          xaxis: {
            title: "Ngày",
            tickangle: 45,
          },
          yaxis: {
            title: "Tỉ lệ mất điện (%)",
          },
          width: 1400,
          height: 600,
        }}
      />
    </div>
  );
};

export default PredictionsChart;
