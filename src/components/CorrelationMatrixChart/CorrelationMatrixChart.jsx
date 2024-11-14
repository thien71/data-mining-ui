import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

function CorrelationMatrixChart() {
  const [correlationData, setCorrelationData] = useState(null);

  useEffect(() => {
    // Tải dữ liệu từ file JSON trong thư mục public
    fetch("/correlation_matrix.json")
      .then((response) => response.json())
      .then((data) => {
        // Đặt nhãn theo thứ tự mong muốn
        const labels = ["Quantity", "Origin ID", "Destination ID", "Grade ID"];

        // Đảo ngược thứ tự nhãn trên trục Y để tạo đường chéo từ trái trên xuống phải dưới
        const labelsY = [...labels].reverse();

        // Tạo zValues theo thứ tự của labels (không cần đảo ngược dữ liệu)
        const zValues = labelsY.map((row) =>
          labels.map((col) => data[row][col])
        );

        setCorrelationData({
          z: zValues,
          x: labels,
          y: labelsY,
          type: "heatmap",
          colorscale: "coolwarm", // Đặt bảng màu coolwarm
          colorbar: {
            title: "Correlation",
            titleside: "right",
          },
          text: zValues.map((row) => row.map((value) => value.toFixed(2))),
          texttemplate: "%{text}", // Hiển thị giá trị trong các ô
          hoverinfo: "z", // Hiển thị giá trị khi di chuột
        });
      });
  }, []);

  if (!correlationData) return <div>Loading...</div>;

  return (
    <div>
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
