// DataChart.jsx
import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import Papa from "papaparse";

const DataChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Sử dụng PapaParse để tải dữ liệu CSV từ thư mục public
    Papa.parse("/selected_crude_oil_imports.csv", {
      // Chỉ cần '/data.csv' nếu file ở thư mục public
      download: true,
      header: true,
      complete: (result) => {
        const csvData = result.data;

        // Trích xuất cột thời gian và lượng nhập khẩu từ CSV
        const periods = csvData.map((row) => row.Period);
        const quantities = csvData.map((row) => parseFloat(row.Quantity));

        // Đặt dữ liệu cho Plotly
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
      <h2>Biểu đồ Lượng Dầu Nhập Khẩu</h2>
      <Plot
        data={chartData}
        layout={{
          title: "Xu hướng Lượng Dầu Nhập Khẩu Theo Thời Gian",
          xaxis: { title: "Thời gian" },
          yaxis: { title: "Lượng nhập khẩu (nghìn thùng)" },
        }}
      />
    </div>
  );
};

export default DataChart;
