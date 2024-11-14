import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import TimeSeriesChart from "../../components/TimeSeriesChart/TimeSeriesChart";
import TrendChart from "../../components/TrendChart/TrendChart";
import MonthlyChart from "../../components/MonthlyChart/MonthlyChart";
import SeasonalChart from "../../components/SeasonalChart/SeasonalChart";
import CorrelationMatrixChart from "../../components/CorrelationMatrixChart/CorrelationMatrixChart";
import SpiderChart from "../../components/SpiderChart/SpiderChart";

import "./HomePage.scss";

const HomePage = () => {
  return (
    <div className="container">
      <Sidebar />
      <main>
        <Header />

        <div className="chart">
          <TimeSeriesChart />
          <TrendChart />
          {/* <MonthlyChart /> */}
          <SeasonalChart />
          <CorrelationMatrixChart />
          <SpiderChart />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
