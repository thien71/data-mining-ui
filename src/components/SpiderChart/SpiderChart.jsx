import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import Papa from "papaparse";

const SpiderChart = () => {
  const [seasonalDataByYear, setSeasonalDataByYear] = useState([]);

  useEffect(() => {
    Papa.parse("/seasonal_averages_by_year.csv", {
      download: true,
      header: true,
      complete: (result) => {
        const csvData = result.data.filter((row) => row.Year); // Lọc ra các dòng có giá trị hợp lệ
        setSeasonalDataByYear(csvData);
      },
    });
  }, []);

  // Tạo danh sách màu sắc để dùng cho từng năm
  const colors = [
    "rgba(31, 119, 180, 0.7)",
    "rgba(255, 127, 14, 0.7)",
    "rgba(44, 160, 44, 0.7)",
    "rgba(214, 39, 40, 0.7)",
    "rgba(148, 103, 189, 0.7)",
  ];

  return (
    <div>
      <h2>
        Biểu đồ Seasonal - Lượng nhập khẩu trung bình theo mùa (2020-2024)
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "20px",
        }}
      >
        {seasonalDataByYear.map((yearData, index) => (
          <div key={yearData.Year}>
            <Plot
              data={[
                {
                  type: "scatterpolar",
                  r: [
                    parseFloat(yearData.Spring),
                    parseFloat(yearData.Summer),
                    parseFloat(yearData.Fall),
                    parseFloat(yearData.Winter),
                  ],
                  theta: ["Spring", "Summer", "Fall", "Winter"],
                  fill: "toself",
                  name: `Năm ${yearData.Year}`,
                  marker: { color: colors[index % colors.length] }, // Màu sắc biểu đồ theo năm
                },
              ]}
              layout={{
                polar: {
                  radialaxis: {
                    visible: true,
                    range: [
                      0,
                      Math.max(
                        parseFloat(yearData.Spring),
                        parseFloat(yearData.Summer),
                        parseFloat(yearData.Fall),
                        parseFloat(yearData.Winter)
                      ),
                    ],
                    tickangle: 45, // Điều chỉnh tickangle để dễ đọc hơn
                    tickfont: { size: 14 },
                    showline: true, // Thêm đường cho trục
                    gridcolor: "lightgray", // Màu sắc của các đường lưới
                  },
                  angularaxis: {
                    tickfont: { size: 16 },
                    rotation: 0, // Xoay trục để cân chỉnh
                  },
                },
                showlegend: false,
                title: {
                  text: `Lượng Nhập Khẩu Trung Bình Theo Mùa - ${yearData.Year}`,
                  font: { size: 18 },
                },
                width: 600,
                height: 600,
                margin: { t: 40, b: 40 },
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpiderChart;
