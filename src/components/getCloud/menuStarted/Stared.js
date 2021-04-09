import { motion } from "framer-motion";
import React from "react";
import { pageAnimation } from "../../styles/animation";
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
              <Staredmenu />
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Stared;
