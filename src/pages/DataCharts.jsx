import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import Papa from "papaparse";

const DataCharts = () => {
  const [timeSeriesData, setTimeSeriesData] = useState([]);
  const [trendData, setTrendData] = useState([]);
  const [periodicityData, setPeriodicityData] = useState([]);
  const [seasonalData, setSeasonalData] = useState([]);
  const [correlationData, setCorrelationData] = useState([]);

  useEffect(() => {
    Papa.parse("/selected_crude_oil_imports.csv", {
      download: true,
      header: true,
      complete: (result) => {
        const csvData = result.data;

        // Biểu đồ 1 - Hiển thị dữ liệu theo thời gian
        const periods = csvData.map((row) => row.Period);
        const quantities = csvData.map((row) => parseFloat(row.Quantity));

        setTimeSeriesData([
          {
            x: periods,
            y: quantities,
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "blue" },
          },
        ]);

        // Biểu đồ xu hướng (Trend)
        const monthlyTrend = csvData.reduce((acc, row) => {
          const month = row.Period.slice(0, 7); // Lấy năm-tháng
          if (!acc[month]) acc[month] = [];
          acc[month].push(parseFloat(row.Quantity));
          return acc;
        }, {});

        const trendDataArray = Object.keys(monthlyTrend).map((month) => {
          const avgQuantity =
            monthlyTrend[month].reduce((sum, val) => sum + val, 0) /
            monthlyTrend[month].length;
          return { month, avgQuantity };
        });

        setTrendData([
          {
            x: trendDataArray.map((item) => item.month),
            y: trendDataArray.map((item) => item.avgQuantity),
            type: "scatter",
            mode: "lines",
            marker: { color: "green" },
          },
        ]);

        // Biểu đồ chu kỳ (Periodicity) theo từng năm
        const yearlyData = csvData.reduce((acc, row) => {
          const year = row.Period.slice(0, 4); // Lấy năm (YYYY)
          if (!acc[year]) acc[year] = [];
          acc[year].push(parseFloat(row.Quantity));
          return acc;
        }, {});

        const yearlyAvg = Object.keys(yearlyData).map((year) => {
          const avgQuantity =
            yearlyData[year].reduce((sum, val) => sum + val, 0) /
            yearlyData[year].length;
          return { year, avgQuantity };
        });

        setPeriodicityData([
          {
            x: yearlyAvg.map((item) => item.year),
            y: yearlyAvg.map((item) => item.avgQuantity),
            type: "bar",
            marker: { color: "purple" },
          },
        ]);

        // Biểu đồ mùa vụ (Seasonality) theo từng tháng
        const monthlyData = csvData.reduce((acc, row) => {
          const month = row.Period.slice(5, 7); // Lấy tháng (MM)
          if (!acc[month]) acc[month] = 0;
          acc[month] += parseFloat(row.Quantity);
          return acc;
        }, {});

        setSeasonalData([
          {
            x: [
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
            ],
            y: [
              monthlyData["01"],
              monthlyData["02"],
              monthlyData["03"],
              monthlyData["04"],
              monthlyData["05"],
              monthlyData["06"],
              monthlyData["07"],
              monthlyData["08"],
              monthlyData["09"],
              monthlyData["10"],
              monthlyData["11"],
              monthlyData["12"],
            ],
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "orange" },
          },
        ]);

        // Biểu đồ ma trận tương quan
        const correlationMatrix = {};
        csvData.forEach((row) => {
          const country = row["Origin Country"];
          const grade = row["Grade Name"];
          if (!correlationMatrix[country]) correlationMatrix[country] = {};
          if (!correlationMatrix[country][grade])
            correlationMatrix[country][grade] = 0;
          correlationMatrix[country][grade] += parseFloat(row.Quantity);
        });

        const countries = Object.keys(correlationMatrix);
        const grades = [...new Set(csvData.map((row) => row["Grade Name"]))];
        const zValues = countries.map((country) =>
          grades.map((grade) => correlationMatrix[country][grade] || 0)
        );

        setCorrelationData([
          {
            z: zValues,
            x: grades,
            y: countries,
            type: "heatmap",
            colorscale: "Viridis",
          },
        ]);
      },
    });
  }, []);

  return (
    <>
      <div className="chart-item">
        <h2>Biểu đồ 1 - Hiển thị dữ liệu theo thời gian</h2>
        <Plot
          data={timeSeriesData}
          layout={{
            title: "Lượng Dầu Nhập Khẩu Theo Thời Gian",
            xaxis: { title: "Thời gian" },
            yaxis: { title: "Lượng nhập khẩu" },
            width: 665,
            height: 450,
          }}
        />
      </div>

      <div className="chart-item">
        <h2>Biểu đồ Trend - Xu hướng trung bình hàng tháng</h2>
        <Plot
          data={trendData}
          layout={{
            title: "Xu Hướng Trung Bình Hàng Tháng",
            xaxis: { title: "Tháng" },
            yaxis: { title: "Lượng nhập khẩu trung bình" },
            width: 665,
            height: 450,
          }}
        />
      </div>

      <div className="chart-item">
        <h2>Biểu đồ Seasonality hàng tháng</h2>
        <Plot
          data={seasonalData}
          layout={{
            title: "Tính mùa vụ theo tháng",
            xaxis: { title: "Tháng" },
            yaxis: { title: "Tổng lượng nhập khẩu" },
            width: 665,
            height: 450,
          }}
        />
      </div>

      <div className="chart-item">
        <h2>Biểu đồ Period hàng năm</h2>
        <Plot
          data={periodicityData}
          layout={{
            title: "Chu Kỳ Nhập Khẩu Theo Năm",
            xaxis: { title: "Năm" },
            yaxis: { title: "Lượng nhập khẩu trung bình" },
            width: 665,
            height: 450,
          }}
        />
      </div>

      <div className="chart-item">
        <h2>Correlation map</h2>
        <Plot
          data={correlationData}
          layout={{
            title: "Ma Trận Tương Quan giữa Quốc Gia và Loại Dầu Thô",
            xaxis: { title: "Loại Dầu Thô" },
            yaxis: { title: "Quốc Gia Xuất Xứ" },
            width: 665,
            height: 450,
          }}
        />
      </div>
    </>
  );
};

export default DataCharts;
