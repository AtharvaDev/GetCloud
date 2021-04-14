import React, { useEffect } from "react";
import HeadSection from "./Components/HeadSection";
import LandNav from "./Components/LandNav";
import "./Features.css";
import { FullPage, Slide } from "react-full-page";

function Features() {
  return (
    <div id="">
      <div className="Features__whiteNav">
        <LandNav />
      </div>
      <div id="AutoScrollY">
        <FullPage>
          <Slide>
            <section
              id="AutoScrollStart"
              className="features__one main_gradient"
            >
              <HeadSection
                title="Save and share"
                desc="Share your files with family, friends and colleagues in one click."
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
            <section id="" className="features__two " style={{}}>
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
            <section id="" className="features__three" style={{}}>
              <HeadSection
                title="Your documents stay with you everywhere"
                desc="Store your files online in a personal and secure space. Easy access on every one of your devices"
                backgroundImg=""
                leftBtnTxt="Login"
                leftBtnLink="/login"
                twoBtns="false"
                first
              />
            </section>
          </Slide>
        </FullPage>
      </div>
    </div>
  );
}

export default Features;
