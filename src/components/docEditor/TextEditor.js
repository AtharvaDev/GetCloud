import { motion } from "framer-motion";
import React from "react";
import RespSideBar from "../getCloud/sidebars/responsive/RespSideBar";
import Sidebar from "../getCloud/sidebars/Sidebar";
import { pageAnimation } from "../styles/animation";
import TextEditorMenu from "./TextEditorMenu";

function TextEditor() {
  return (
    <>
      <div className="home">
        <div className="mobileOnly__sidebar">
          <RespSideBar />
          <TextEditorMenu />
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
              <TextEditorMenu />
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TextEditor;
