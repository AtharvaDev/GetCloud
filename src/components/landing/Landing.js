// this is the product.js page

import React from "react";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import HeadSection from "./Components/HeadSection";
import LandNav from "./Components/LandNav";
import "./Landing.css";
import LottieAnimation from "./lottiefiles/Lottie";
import home1 from "./lottiefiles/land-1-kid-on-laptop.json";
import Typed from "react-typed";

function Landing() {
  return (
    <div className="Landing">
      <LandNav />

      {/* <Container className="Landing__container">
        <Row className="Landing__one w-100 justify-content-center align-content-center">
          <Col className="" sm={8} style={{ marginTop: "4rem" }}>
            <h1 className="d-flex">
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
            </h1>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos
              minus provident iusto. Doloribus beatae, accusantium natus dolor
              praesentium sit incidunt.
            </p>
          </Col>
          <Col sm={4}>
            <LottieAnimation
              lotti={home1}
              height={"null"}
              width={"null"}
              speed={2}
            />
          </Col>
        </Row>
      </Container> */}

      <div className="Landing__container m">
        <div className="Landing__container__left">
          <h1 className="d-flex display-4">
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
          </h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos minus
            provident iusto. Doloribus beatae, accusantium natus dolor
            praesentium sit incidunt.
          </p>
        </div>
        <div className="Landing__container__right m-3">
          <LottieAnimation
            lotti={home1}
            height={"null"}
            width={"null"}
            speed={2}
          />
        </div>
      </div>

      {/* <div className="div">
        Landing page...{" "}
        <Alert variant="success">
          <p> current deployment version 5.2</p>
          changelog 5.2 <br></br>
          1. Added trash Menu <br></br>
          2. Voice Rename <br></br>
          3. Voice Navigation added <br></br>
          4. Firebase reads/ writes reduced from 9.9k to 5.3k (wrt 29March)
          {/* 1. Added Stared Menu <br></br>
         2. Added Rename Menu <br></br>
         3. Animations fixed <br></br>
         4. Profile Loading fixed <br></br>
         5. Used Storage fixed<br></br>
         6. search menu added 
        </Alert>
        <Button as={Link} to="/login">
          login
        </Button>
      </div> */}
    </div>
  );
}

export default Landing;
