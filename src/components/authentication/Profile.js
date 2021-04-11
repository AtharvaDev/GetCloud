import { motion } from "framer-motion";
import React from "react";
import RespSideBar from "../getCloud/sidebars/responsive/RespSideBar";
import Sidebar from "../getCloud/sidebars/Sidebar";
import { pageAnimation } from "../styles/animation";
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
            <div>
              <Sidebar />
            </div>
            <motion.div
              variants={pageAnimation}
              initial="hidden"
              animate="show"
              exit="exit"
              className="w-100"
            >
              <ProfileMenu />
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
