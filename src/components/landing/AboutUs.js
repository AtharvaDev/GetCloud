import React from "react";
import LandNav from "./Components/LandNav";
import "./AboutUs.css";
import Wish from "../styles/Wish";
import { motion } from "framer-motion";
import { pageAnimation, titileAnimations } from "../styles/animation";
import AnimCard from "./Components/3dCard/AnimCard";
import react from "./Components/3dCard/images/React.svg";
import redux from "./Components/3dCard/images/redux.svg";
import firebase from "./Components/3dCard/images/firebase.svg";
import htmlcss from "./Components/3dCard/images/html-css.png";
import react_bootstrap from "./Components/3dCard/images/React-bootstrap.svg";
import nodeJs from "./Components/3dCard/images/NodeJs.svg";

import { Col, Container, Row } from "react-bootstrap";

function AboutUs() {
  return (
    <div className="w-100 overflow-hidden">
      <LandNav />

      <motion.div
        variants={pageAnimation}
        initial="hidden"
        animate="show"
        exit="exit"
      >
        <section className="aboutUs__one">
          <div className="aboutUs__one__head">
            <h1 className="">Crafting Beautiful Experience</h1>
            <p className="">
              DigiSpace aims to be the Digital Asset Management platform for all
              sorts of individuals and different types of organisations having
              scalability in check without compromising data safety.
            </p>
          </div>

          <div className="aboutUs__wishSvg">
            <Wish />
          </div>
          <motion.div
            variants={titileAnimations}
            className="aboutUs__one__bg"
          ></motion.div>
        </section>

        <section className="aboutUs__two">
          <h1 className="pt-5">Technology Stack</h1>
          <div className="w-100">
            <Row className="w-100">
              <Col lg={4} className="w-100">
                <AnimCard logo={react} logo_type="React" />
              </Col>
              <Col lg={4} className="w-100">
                <AnimCard logo={redux} logo_type="Redux" />
              </Col>
              <Col lg={4} className="w-100">
                <AnimCard logo={firebase} logo_type="Firebase" />
              </Col>
            </Row>

            <Row className="w-100">
              <Col lg={4} className="w-100">
                <AnimCard logo={htmlcss} logo_type="Html CSS" />
              </Col>
              <Col lg={4} className="w-100">
                <AnimCard logo={react_bootstrap} logo_type="Bootstrap" />
              </Col>
              <Col lg={4} className="w-100">
                <AnimCard logo={nodeJs} logo_type="Node JS" />
              </Col>
            </Row>
          </div>
        </section>

        <section className="aboutUs__three">
          <div style={{ height: "10vh", width: "100vw" }}></div>
        </section>
      </motion.div>
    </div>
  );
}

export default AboutUs;
