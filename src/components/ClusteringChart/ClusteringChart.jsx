import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import "./ClusteringChart.scss";

const ClusteringChart = () => {
  const [clusterData, setClusterData] = useState([]);

  const clusterLabels = {
    // 2 0 3 1
    3: "High",
    2: "Medium",
    1: "Low",
    0: "Very low",
  };

  const clusterColors = {
    3: "#440154",
    2: "#31688D",
    1: "#FDE725",
    0: "#36B778",
  };

  useEffect(() => {
    fetch("http://localhost:8000/api/clusters/chart")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched cluster data:", data);
        setClusterData(data);
      })
      .catch((error) =>
        console.error("Error fetching clustering data:", error)
      );
  }, []);

  return (
    <div className="chart-item">
      <h2>Biểu đồ Clustering - Dữ liệu phân cụm</h2>
      <Plot
        data={[
          {
            x: clusterData.map((item) => item.period),
            y: clusterData.map((item) => item.percent_outage),

            mode: "markers",
            marker: {
              size: 12,
              // color: clusterData.map((item) => clusterColors[item.cluster]),
              color: clusterData.map((item) => item.cluster),
              colorscale: "Viridis",
              colorbar: {
                tickvals: [0, 1, 2, 3],
                ticktext: ["Very low", "Low", "Medium", "High"],
                title: "Cluster Level",
              },
            },
          },
        ]}
        layout={{
          title: "Dữ liệu phân cụm theo thời gian",
          xaxis: {
            title: "Thời gian",
            tickangle: 45,
          },
          yaxis: {
            title: "Tỉ lệ sự cố (%)",
          },
          width: 1400,
          height: 600,
        }}
      />
      {/* <ul className="legend">
        {Object.entries(clusterLabels).map(([key, label]) => (
          <li key={key}>
            <span
              style={{
                display: "inline-block",
                width: "15px",
                height: "15px",
                backgroundColor: clusterColors[key],
              }}
            ></span>
            {label}
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default ClusteringChart;
