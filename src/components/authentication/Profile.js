import React from "react";
import RespSideBar from "../getCloud/sidebars/responsive/RespSideBar";
import Sidebar from "../getCloud/sidebars/Sidebar";
import ProfileMenu from "./ProfileMenu";

function Profile() {
  return (
    <>
      <div className="home">
        <div className="mobileOnly__sidebar">
          <RespSideBar />
          <ProfileMenu />
        </div>
        <div className="bigScreenOnly__sidebar">
          <div className="home__body">
            <Sidebar />
            <ProfileMenu />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
