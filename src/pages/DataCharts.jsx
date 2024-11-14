import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import Papa from "papaparse";
import TimeSeriesChart from "../components/TimeSeriesChart/TimeSeriesChart";
import TrendChart from "../components/TrendChart/TrendChart";

const DataCharts = () => {
  return (
    <>
      <TimeSeriesChart />
      <TrendChart />
    </>
  );
};

export default DataCharts;
