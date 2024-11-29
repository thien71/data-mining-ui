import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

const TimeSeriesChart = ({ chartType }) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const [timeSeriesData, setTimeSeriesData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  useEffect(() => {
    const fetchData = async () => {
      let url = "";

      // Quyết định URL dựa trên loại biểu đồ
      if (chartType === "month") {
        // Biểu đồ theo tháng
        url = `http://localhost:8000/api/time_series/month?year=${selectedYear}`;
      } else if (chartType === "day") {
        // Biểu đồ theo ngày
        url = `http://localhost:8000/api/time_series/day?year=${selectedYear}&month=${selectedMonth}`;
      }

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (chartType === "month") {
          const months = data.map((row) => `Tháng ${row.month}`);
          const outages = data.map((row) => row.avg_percent_outage);

          setTimeSeriesData([
            {
              x: months,
              y: outages,
              type: "bar",
              text: outages, // Hiển thị giá trị trên cột
              textposition: "outside",
              marker: {
                color: "rgba(30,144,255,0.6)",
                line: {
                  color: "rgb(30,144,255)",
                  width: 1,
                },
              },
            },
          ]);
        } else if (chartType === "day") {
          const days = data.map((row) => row.day);
          const outages = data.map((row) => row.percent_outage);

          setTimeSeriesData([
            {
              x: days,
              y: outages,
              type: "bar",
              text: outages, // Hiển thị giá trị trên cột
              textposition: "outside",
              marker: {
                color: "rgba(30,144,255,0.6)",
                line: {
                  color: "rgb(30,144,255)",
                  width: 1,
                },
              },
            },
          ]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [chartType, selectedYear, selectedMonth]);

  const handleYearChange = (direction) => {
    if (direction === "prev") {
      setSelectedYear((prevYear) => prevYear - 1);
    } else if (direction === "next") {
      setSelectedYear((prevYear) => prevYear + 1);
    }
  };

  const handleMonthChange = (direction) => {
    if (direction === "prev") {
      if (selectedMonth === 1) {
        // Nếu tháng hiện tại là tháng 1, chuyển về tháng 12 của năm trước
        setSelectedMonth(12);
        setSelectedYear((prevYear) => prevYear - 1);
      } else {
        setSelectedMonth((prevMonth) => prevMonth - 1);
      }
    } else if (direction === "next") {
      if (selectedMonth === 12) {
        // Nếu tháng hiện tại là tháng 12, chuyển về tháng 1 của năm sau
        setSelectedMonth(1);
        setSelectedYear((prevYear) => prevYear + 1);
      } else {
        setSelectedMonth((prevMonth) => prevMonth + 1);
      }
    }
  };

  return (
    <div className="chart-item">
      <h2>
        {chartType === "month"
          ? "Biểu đồ tỉ lệ mất điện theo tháng"
          : "Biểu đồ tỉ lệ mất điện theo ngày"}
      </h2>

      {chartType === "month" ? (
        <div className="chart-button">
          <button onClick={() => handleYearChange("prev")}>Năm trước</button>
          <button onClick={() => handleYearChange("next")}>Năm sau</button>
        </div>
      ) : (
        <div className="chart-button">
          <button onClick={() => handleMonthChange("prev")}>Tháng trước</button>
          <button onClick={() => handleMonthChange("next")}>Tháng sau</button>
        </div>
      )}

      <Plot
        data={timeSeriesData}
        layout={{
          title:
            chartType === "month"
              ? `Tỉ lệ mất điện theo tháng - ${selectedYear}`
              : `Tỉ lệ mất điện theo ngày - ${selectedMonth}/${selectedYear}`,
          xaxis: {
            title: chartType === "month" ? "Tháng" : "Ngày",
            tickangle: -45,
          },
          yaxis: {
            title: "Phần trăm mất điện",
          },
          bargap: 0.2,
          width: 1400,
          height: 400,
        }}
      />
    </div>
  );
};

export default TimeSeriesChart;
