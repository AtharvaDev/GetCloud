// this is the product.js page

import React from "react";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import HeadSection from "./Components/HeadSection";
import LandNav from "./Components/LandNav";
import "./Landing.css";
import LottieAnimation from "./lottiefiles/Lottie";
import home1 from "./lottiefiles/land-1-kid-on-laptop.json";
import home2 from "./lottiefiles/land-2-upload-on-cloud.json";

import Typed from "react-typed";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Wave from "../styles/Wave";
import { motion } from "framer-motion";
import { fade, pageAnimation, titileAnimations } from "../styles/animation";

function Landing() {
  return (
    <div className="Landing">
      <LandNav />
      <motion.div
        variants={pageAnimation}
        initial="hidden"
        animate="show"
        exit="exit"
      >
        <section className="landing__section__one">
          <div className="Landing__container">
            <div className="Landing__container__left">
              <motion.h1
                variants={titileAnimations}
                className="d-flex display-4"
              >
                DigiSpace,
                <Typed
                  className="ml-2"
                  strings={[" safe", " secure", " fast"]}
                  typeSpeed={30}
                  backSpeed={50}
                  attr="placeholder"
                  loop
                >
                  <input type="text" />
                </Typed>
              </motion.h1>
              <motion.p variants={titileAnimations}>
                DigiSpace, lets you manage your pictures, videos, documents,
                folders, assets on-the-go, on any device. From sharing of photos
                and videos to storing gigabytes of sensitive data, DigiSpace
                covers it all.
              </motion.p>
            </div>
            <div
              className="Landing__container__right m-3"
              style={{ zIndex: "10" }}
            >
              <motion.div variants={fade}>
                <LottieAnimation
                  lotti={home1}
                  height={"null"}
                  width={"null"}
                  speed={2}
                />
              </motion.div>
            </div>
            {/* //////////////////////////////////////// */}
            <Wave />

            <div className="Landing__svg__one">
              <div class="custom-shape-divider-bottom-1618461652">
                <svg
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1200 120"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                    opacity=".25"
                    class="shape-fill"
                  >
                    <animateTransform
                      attributeName="transform"
                      type="scale"
                      from="0.8"
                      to="1.4"
                      begin="5s"
                      dur="15s"
                      repeatCount="indefinite"
                    />
                  </path>
                  <path
                    d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                    opacity=".5"
                    class="shape-fill"
                  >
                    <animateTransform
                      attributeName="transform"
                      type="scale"
                      from="0.7"
                      to="1"
                      begin="0s"
                      dur="10s"
                      repeatCount="indefinite"
                    />
                  </path>
                  <path
                    d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                    class="shape-fill"
                  >
                    <animateTransform
                      attributeName="transform"
                      type="scale"
                      from="0.8"
                      to="1.4"
                      begin="0s"
                      dur="35s"
                      repeatCount="indefinite"
                    />
                  </path>
                </svg>
              </div>
            </div>
          </div>
        </section>

        <section className="landing__section__two">
          <div
            className="Landing__container"
            style={{ flexDirection: "row-reverse", backgroundColor: "black" }}
          >
            <div className="Landing__container__left">
              <motion.h1
                variants={titileAnimations}
                className="d-flex display-4 text-light"
              >
                DigiSpace, build for everybody
              </motion.h1>
              <ul className="text-light d-flex flex-column">
                <li className="d-inline-block mt-2">
                  <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
                  <span className="m-2">Easy to set up</span>
                </li>
                <li className="d-inline-block mt-2">
                  <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
                  <span className="m-2">High-speed</span>
                </li>
                <li className="d-inline-block mt-2">
                  <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
                  <span className="m-2">Fantistic service</span>
                </li>
                <li className="d-inline-block mt-2">
                  <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
                  <span className="m-2">Ideal for</span>
                </li>
              </ul>
            </div>

            <div className="Landing__container__right m-3">
              <LottieAnimation
                lotti={home2}
                height={"null"}
                width={"null"}
                speed={2}
              />
            </div>
          </div>

          <div className="landing__svg__two">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                class="shape-fill"
              ></path>
            </svg>
          </div>
        </section>
      </motion.div>
    </div>
  );
}

export default Landing;
