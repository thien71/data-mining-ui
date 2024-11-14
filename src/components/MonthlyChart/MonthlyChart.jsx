import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import Papa from "papaparse";

const MonthlyChart = () => {
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    Papa.parse("/crude_oil_imports.csv", {
      download: true,
      header: true,
      complete: (result) => {
        const csvData = result.data;

        // Khởi tạo đối tượng để tích lũy tổng lượng nhập khẩu và đếm số lần xuất hiện của từng tháng
        const monthlyTotals = {};
        const monthlyCounts = {};

        csvData.forEach((row) => {
          const month = row.Period.slice(5, 7); // Lấy phần tháng (MM)
          const year = row.Period.slice(0, 4); // Lấy phần năm (YYYY)
          const quantity = parseFloat(row.Quantity); // Chuyển đổi sang triệu thùng

          // Khởi tạo nếu chưa có tháng trong đối tượng
          if (!monthlyTotals[month]) {
            monthlyTotals[month] = 0;
            monthlyCounts[month] = new Set();
          }

          monthlyTotals[month] += quantity;
          monthlyCounts[month].add(year); // Thêm năm vào Set để đếm số năm duy nhất cho mỗi tháng
        });

        // Tính trung bình cho mỗi tháng
        const months = [
          "Tháng 1",
          "Tháng 2",
          "Tháng 3",
          "Tháng 4",
          "Tháng 5",
          "Tháng 6",
          "Tháng 7",
          "Tháng 8",
          "Tháng 9",
          "Tháng 10",
          "Tháng 11",
          "Tháng 12",
        ];
        const averageQuantities = Array.from({ length: 12 }, (_, i) => {
          const monthKey = String(i + 1).padStart(2, "0");
          const yearCount = monthlyCounts[monthKey].size; // Số năm duy nhất có dữ liệu cho tháng này
          return monthlyTotals[monthKey] / yearCount; // Tính trung bình
        });

        setMonthlyData([
          {
            x: months,
            y: averageQuantities,
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "orange" },
            line: { shape: "linear" },
          },
        ]);
      },
    });
  }, []);

  return (
    <div className="chart-item">
      <h2>Biểu đồ Seasonal - Xu hướng mùa vụ hàng tháng</h2>
      <Plot
        data={monthlyData}
        layout={{
          title: "Xu Hướng Mùa Vụ Hàng Tháng (Trung Bình Qua Các Năm)",
          xaxis: { title: "Tháng" },
          yaxis: {
            title: "Lượng nhập khẩu trung bình (triệu thùng)",
          },
          width: 1200,
          height: 450,
        }}
      />
    </div>
  );
};

export default MonthlyChart;
