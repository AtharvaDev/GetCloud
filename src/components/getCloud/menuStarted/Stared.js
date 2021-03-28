import React from "react";
import RespSideBar from "../sidebars/responsive/RespSideBar";
import Sidebar from "../sidebars/Sidebar";
import Staredmenu from "./Staredmenu";

function Stared() {
  return (
    <>
        <div className="home">
          <div className="mobileOnly__sidebar">
            <RespSideBar />
            <Staredmenu />
          </div>
          <div className="bigScreenOnly__sidebar">
            <div className="home__body">
              <Sidebar />
              <Staredmenu />
            </div>
          </div>
        </div>
    </>
  );
}

export default Stared;
