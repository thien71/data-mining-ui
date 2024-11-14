import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import Papa from "papaparse";

const SeasonalChart = () => {
  const [seasonalData, setSeasonalData] = useState([]);

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
        const averageMonthlyQuantities = {};
        for (let month = 1; month <= 12; month++) {
          const monthKey = String(month).padStart(2, "0");
          const yearCount = monthlyCounts[monthKey].size; // Số năm duy nhất có dữ liệu cho tháng này
          averageMonthlyQuantities[monthKey] =
            monthlyTotals[monthKey] / yearCount; // Tính trung bình
        }

        // Nhóm các tháng vào 4 mùa và tính trung bình lượng nhập khẩu cho từng mùa
        const seasonalTotals = {
          Spring:
            (averageMonthlyQuantities["03"] +
              averageMonthlyQuantities["04"] +
              averageMonthlyQuantities["05"]) /
            3,
          Summer:
            (averageMonthlyQuantities["06"] +
              averageMonthlyQuantities["07"] +
              averageMonthlyQuantities["08"]) /
            3,
          Fall:
            (averageMonthlyQuantities["09"] +
              averageMonthlyQuantities["10"] +
              averageMonthlyQuantities["11"]) /
            3,
          Winter:
            (averageMonthlyQuantities["12"] +
              averageMonthlyQuantities["01"] +
              averageMonthlyQuantities["02"]) /
            3,
        };

        const seasons = ["Winter", "Spring", "Summer", "Fall"];
        const averageQuantities = seasons.map(
          (season) => seasonalTotals[season]
        );

        setSeasonalData([
          {
            x: seasons,
            y: averageQuantities,
            type: "bar",
            marker: { color: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728"] },
          },
        ]);
      },
    });
  }, []);

  return (
    <div className="chart-item">
      <h2>Biểu đồ Seasonal - Xu hướng mùa vụ theo mùa</h2>
      <Plot
        data={seasonalData}
        layout={{
          title: "Lượng Nhập Khẩu Trung Bình Theo Mùa (Triệu Thùng)",
          xaxis: { title: "Mùa" },
          yaxis: {
            title: "Lượng nhập khẩu trung bình (triệu thùng)",
          },
          width: 1200,
          height: 450,
          bargap: 0.6,
        }}
      />
    </div>
  );
};

export default SeasonalChart;
