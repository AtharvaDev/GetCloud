import { faArrowCircleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { springAnim, titileAnimations } from "../../styles/animation";
import LottieAnimation from "../lottiefiles/Lottie";
import "./HeadSection.css";

const HeadSection = ({
  title,
  desc,
  backgroundImg,
  leftBtnTxt,
  leftBtnLink,
  twoBtns,
  first,
  lottie,
  features,
}) => {
  return (
    <div className="HeadSection">
      <div className="HeadSection__container">
        <div className="HeadSection__text">
          <motion.p variants={springAnim}>{title}</motion.p>
          <motion.div variants={springAnim} className="HeadSection__textDesc">
            <p>{desc}</p>
          </motion.div>
        </div>
        <div className="HeadSection__lower">
          {/* {console.log(twoBtns)} */}
          {twoBtns === "true" && (
            <div variants={springAnim} className="HeadSection__buttons">
              <Button className="yellow_airplane" as={Link} to={leftBtnLink}>
                {leftBtnTxt}
              </Button>
            </div>
          )}
        </div>
        {first && (
          <motion.div variants={springAnim} className="HeadSection__expand">
            <FontAwesomeIcon icon={faArrowCircleDown}></FontAwesomeIcon>
          </motion.div>
        )}
        {lottie && (
          <div className="HeadSection__expand">
            <LottieAnimation
              lotti={features}
              height={"null"}
              width={"null"}
              speed={2}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HeadSection;
