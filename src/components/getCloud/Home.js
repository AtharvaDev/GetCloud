import React from "react";
import Dashboard from "./Dashboard";
import "./Home.css";
import RespSideBar from "./sidebars/responsive/RespSideBar";
import Sidebar from "./sidebars/Sidebar";
import Test from "./Test";

function Home() {
  return (
    <div className="home">
      <div className="mobileOnly__sidebar">
        <RespSideBar />
        {/* <Sidebar/> */}
        <Dashboard />
      </div>
      <div className="bigScreenOnly__sidebar">
        <div className="home__body">
          <Sidebar />
          <Dashboard />
        </div>
      </div>
    </div>
  );
}

export default Home;
