import Header from "../../components/Header/Header";
import TimeSeriesChart from "../../components/TimeSeriesChart/TimeSeriesChart";
import TrendChart from "../../components/TrendChart/TrendChart";
import SeasonalChart from "../../components/SeasonalChart/SeasonalChart";
import CorrelationMatrixChart from "../../components/CorrelationMatrixChart/CorrelationMatrixChart";
import SpiderChart from "../../components/SpiderChart/SpiderChart";
import ClusteringChart from "../../components/ClusteringChart/ClusteringChart";

import "./HomePage.scss";

const HomePage = () => {
  return (
    <div className="container">
      {/* <Sidebar /> */}
      <main>
        <Header />

        <div className="chart">
          <TimeSeriesChart chartType={"day"} />
          <TimeSeriesChart chartType={"month"} />
          <TrendChart />
          {/* <MonthlyChart /> */}
          <SeasonalChart />
          <CorrelationMatrixChart />
          <ClusteringChart />
          <SpiderChart />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
