import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

function CorrelationMatrixChart() {
  const [correlationData, setCorrelationData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Gọi API để lấy dữ liệu ma trận tương quan
    fetch("http://localhost:8000/api/correlation_matrix")
      .then((response) => {
        // Kiểm tra xem phản hồi có phải là JSON không
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Phản hồi phải là JSON
      })
      .then((data) => {
        console.log(data); // Log dữ liệu API để kiểm tra

        let labels = ["capacity", "outage", "percent_outage"];

        // Tạo zValues từ dữ liệu API
        const zValues = labels.map((row) =>
          labels.map((col) => {
            return data[col][row];
          })
        );

        setCorrelationData({
          x: labels,
          y: labels,
          z: zValues,
          type: "heatmap",
          colorscale: "coolwarm",
          colorbar: {
            title: "Correlation",
            titleside: "right",
          },
          text: zValues.map((row) => row.map((value) => value.toFixed(6))),
          texttemplate: "%{text}",
          hoverinfo: "z",
        });
      })
      .catch((error) => {
        console.error("Error fetching correlation matrix data:", error);
        setError(error.message); // Lưu thông báo lỗi vào state
      });
  }, []);

  if (!correlationData) return <div>Loading...</div>;

  return (
    <div className="chart-item">
      <h2>Biểu đồ Correlation Matrix</h2>
      <Plot
        data={[correlationData]}
        layout={{
          title: "Correlation Map",
          xaxis: { title: "Variables", side: "bottom", automargin: true },
          yaxis: { title: "Variables", automargin: true },
          width: 600,
          height: 500,
        }}
      />
    </div>
  );
}

export default CorrelationMatrixChart;
