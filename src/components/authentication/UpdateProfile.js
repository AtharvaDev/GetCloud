import React from "react";
import RespSideBar from "../getCloud/sidebars/responsive/RespSideBar";
import Sidebar from "../getCloud/sidebars/Sidebar";
import UpdateProfileMenu from "./UpdateProfileMenu";

function UpdateProfile() {
  return (
    <>
      <div className="home">
        <div className="mobileOnly__sidebar">
          <RespSideBar />
          <UpdateProfileMenu />
        </div>
        <div className="bigScreenOnly__sidebar">
          <div className="home__body">
            <Sidebar />
            <UpdateProfileMenu />
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateProfile;
