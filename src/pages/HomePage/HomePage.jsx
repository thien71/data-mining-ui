import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import CorrelationMapChart from "../CorrelationMapChart";
import DataCharts from "../DataCharts";
import SeasonalChart from "../SeasonalChart";
import TrendChart from "../TrendChart";

import "./HomePage.scss";

const HomePage = () => {
  return (
    <div className="container">
      <Sidebar />
      <main>
        <Header />

        <div className="chart">
          {/* <TrendChart /> */}
          <DataCharts />
          {/* <SeasonalChart />
          <CorrelationMapChart /> */}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
