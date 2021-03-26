import React from "react";
import RespSideBar from "../sidebars/responsive/RespSideBar";
import Sidebar from "../sidebars/Sidebar";
import Recentmenu from "./Recentmenu";

function Recent() {
  return (
    <div>
      <div className="home">
        <div className="mobileOnly__sidebar">
          <RespSideBar />
          <Recentmenu />
        </div>
        <div className="bigScreenOnly__sidebar">
          <div className="home__body">
            <Sidebar />
            <Recentmenu />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recent;
