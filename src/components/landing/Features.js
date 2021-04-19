import React, { useEffect } from "react";
import HeadSection from "./Components/HeadSection";
import LandNav from "./Components/LandNav";
import "./Features.css";
import { FullPage, Slide } from "react-full-page";
import features3 from "./lottiefiles/features-3-everywhere.json";
import LottieAnimation from "./lottiefiles/Lottie";
import { motion } from "framer-motion";
import { pageAnimation } from "../styles/animation";
import slide_dark from "./images/features-slide-dark.png";
import silde_light from "./images/features-slide-light.png";
import ReactCompareImage from "react-compare-image";

function Features() {
  return (
    <div className="Features ">
      <div className="Features__whiteNav">
        <LandNav />
      </div>
      <motion.div
        variants={pageAnimation}
        initial="hidden"
        animate="show"
        exit="exit"
      >
        <div id="AutoScrollY">
          <FullPage>
            <Slide>
              <section
                id="AutoScrollStart"
                className="w-100 features__one main_gradient overflow-hidden"
              >
                <HeadSection
                  title="Save and Share"
                  desc="In one click share your files with family, friends and colleagues."
                  leftBtnTxt="Try for free"
                  leftBtnLink="/login"
                  rightBtnTxt="Signup"
                  rightBtnLink=""
                  twoBtns="true"
                  first
                />
              </section>
            </Slide>

            <Slide>
              <section
                id=""
                className="features__two mw-100 overflow-hidden"
                style={{}}
              >
                <HeadSection
                  title="Free up space"
                  desc="Free up memory on your devices without the bother of external hard drives."
                  leftBtnTxt=""
                  leftBtnLink=""
                  twoBtns="false"
                  first
                />
              </section>
            </Slide>

            <Slide>
              <section
                id=""
                className="features__three w-100 overflow-hidden"
                style={{}}
              >
                <HeadSection
                  title="Your documents stay with you everywhere"
                  desc="Store your files online in a personal and secure space. Easy access on every one of your devices"
                  backgroundImg=""
                  leftBtnTxt="Login"
                  leftBtnLink="/login"
                  twoBtns="false"
                  lottie
                  features={features3}
                />
              </section>
            </Slide>

            <Slide>
              <section className="features__four w-100">
                <div className="compare__image d-flex flex-column align-items-center ">
                  <h2 className="m-3">Toggle for Light/Dark Mode</h2>
                  <ReactCompareImage
                    leftImage={silde_light}
                    rightImage={slide_dark}
                    leftImageLabel="Light Mode"
                    rightImageLabel="Dark Mode"
                    hover
                  />
                </div>
              </section>
            </Slide>
          </FullPage>
        </div>
      </motion.div>
    </div>
  );
}

export default Features;
