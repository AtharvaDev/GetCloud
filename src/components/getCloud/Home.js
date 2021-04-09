import { motion } from "framer-motion";
import React from "react";
import Skeleton from "react-loading-skeleton";
import { pageAnimation } from "../styles/animation";
import Dashboard from "./Dashboard";
import "./Home.css";
import RespSideBar from "./sidebars/responsive/RespSideBar";
import Sidebar from "./sidebars/Sidebar";
import Test from "./Test";
import VoiceEnabled from "./voiceEnabled/VoiceEnabled";

function Home() {
  // console.log()
  return (
    <div className="home">
      <div className="mobileOnly__sidebar">
        <RespSideBar />
        <Dashboard />
      </div>
      <div className="bigScreenOnly__sidebar">
        <div className="home__body">
          <div className="">
            <Sidebar />
          </div>
          <motion.div
            variants={pageAnimation}
            initial="hidden"
            animate="show"
            exit="exit"
            className="w-100"
          >
            <Dashboard />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Home;
