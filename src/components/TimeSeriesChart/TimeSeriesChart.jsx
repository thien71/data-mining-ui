import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import Papa from "papaparse";

const TimeSeriesChart = () => {
  const [timeSeriesData, setTimeSeriesData] = useState([]);

  useEffect(() => {
    Papa.parse("/crude_oil_imports.csv", {
      download: true,
      header: true,
      complete: (result) => {
        const csvData = result.data;

        // Gộp dữ liệu theo tháng (Period)
        const aggregatedData = csvData.reduce((acc, row) => {
          const period = row.Period;
          const quantity = parseFloat(row.Quantity) / 1000; // Chuyển đổi sang triệu thùng

          if (!acc[period]) {
            acc[period] = 0;
          }
          acc[period] += quantity; // Cộng dồn lượng nhập khẩu cho mỗi tháng

          return acc;
        }, {});

        // Chuyển dữ liệu gộp thành mảng để dùng cho biểu đồ
        const periods = Object.keys(aggregatedData);
        const quantities = Object.values(aggregatedData);

        setTimeSeriesData([
          {
            x: periods,
            y: quantities,
            type: "bar",
            marker: {
              color: "rgba(30,144,255,0.6)",
              line: {
                color: "rgb(30,144,255)",
                width: 1,
              },
            },
          },
        ]);
      },
    });
  }, []);

  return (
    <div className="chart-item">
      <h2>Biểu đồ 1 - Hiển thị dữ liệu theo thời gian</h2>
      <Plot
        data={timeSeriesData}
        layout={{
          title: "Lượng Dầu Nhập Khẩu Theo Thời Gian",
          xaxis: {
            title: "Thời gian",
            tickangle: -45,
          },
          yaxis: {
            title: "Lượng nhập khẩu (nghìn thùng)",
          },
          bargap: 0.2,
          width: 1200,
          height: 450,
        }}
      />
    </div>
  );
};

export default TimeSeriesChart;
