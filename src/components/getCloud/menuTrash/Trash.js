import React from "react";
import RespSideBar from "../sidebars/responsive/RespSideBar";
import Sidebar from "../sidebars/Sidebar";
import Trashmenu from "./Trashmenu";

function Trash() {
  return (
    <>
      <div className="home">
        <div className="mobileOnly__sidebar">
          <RespSideBar />
          <Trashmenu />
        </div>
        <div className="bigScreenOnly__sidebar">
          <div className="home__body">
            <Sidebar   />
            <Trashmenu   />
          </div>
        </div>
      </div>
    </>
  );
}

export default Trash;
