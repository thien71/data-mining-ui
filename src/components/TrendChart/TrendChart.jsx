import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import Papa from "papaparse";

const TrendChart = () => {
  const [trendData, setTrendData] = useState([]);

  useEffect(() => {
    Papa.parse("/crude_oil_imports.csv", {
      download: true,
      header: true,
      complete: (result) => {
        const csvData = result.data;

        // Tạo nhóm dữ liệu theo tháng (Year-Month), tính tổng lượng nhập khẩu cho từng tháng
        const monthlyData = csvData.reduce((acc, row) => {
          const month = row.Period.slice(0, 7); // Lấy phần năm-tháng (YYYY-MM)
          const quantity = parseFloat(row.Quantity); // Chuyển đổi sang triệu thùng

          if (!acc[month]) {
            acc[month] = 0;
          }
          acc[month] += quantity;

          return acc;
        }, {});

        // Chuyển dữ liệu gộp thành mảng để dùng cho biểu đồ
        const months = Object.keys(monthlyData);
        const quantities = Object.values(monthlyData);

        setTrendData([
          {
            x: months,
            y: quantities,
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "green" },
            line: { shape: "linear" },
          },
        ]);
      },
    });
  }, []);

  return (
    <div className="chart-item">
      <h2>Biểu đồ Trend - Xu hướng lượng nhập khẩu theo thời gian</h2>
      <Plot
        data={trendData}
        layout={{
          title: "Xu Hướng Lượng Dầu Nhập Khẩu Hàng Tháng",
          xaxis: { title: "Thời gian", tickangle: -45 },
          yaxis: { title: "Lượng nhập khẩu (triệu thùng)" },
          width: 1200,
          height: 450,
        }}
      />
    </div>
  );
};

export default TrendChart;
