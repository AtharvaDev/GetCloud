import React, { useEffect, useState } from "react";
import "./LandNav.css";
import DigiSpacelogo from "../../icons/logo1.png";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";

function LandNav() {
  const [show, handleShow] = useState(false);
  const { pathname } = useLocation();
  console.log(pathname);

  useEffect(() => {
    //it listens to the scroll so when you scroll down app haas to do something
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    });
    // so return will remove event listener before the useEffect runs again
    return () => {
      window.removeEventListener("scroll", null);
    };
  }, []);
  return (
    <div className={`LandNav ${show && "LandNav__black"}`}>
      <div className="LandNav__logo">
        <Link id="logo" to="/">
          <img src={DigiSpacelogo} alt="DigiSpacelogo" />
        </Link>
      </div>
      <div className="LandNav__center">
        <p>
          <Link to="/features">Features</Link>
          <Line
            transition={{ duration: 0.75 }}
            initial={{ width: "0%" }}
            animate={{ width: pathname === "/features" ? "50%" : "0%" }}
          />
        </p>
        <p>
          <Link to="/pricing">Pricing</Link>
          <Line
            transition={{ duration: 0.75 }}
            initial={{ width: "0%" }}
            animate={{ width: pathname === "/pricing" ? "50%" : "0%" }}
          />
        </p>
        <p>
          <Link to="/aboutus">About Us</Link>
          <Line
            transition={{ duration: 0.75 }}
            initial={{ width: "0%" }}
            animate={{ width: pathname === "/aboutus" ? "50%" : "0%" }}
          />
        </p>
      </div>
      <div className="LandNav__right">
        <p>
          <Link to="/login">Sign In</Link>
        </p>
        <p> </p>
      </div>
    </div>
  );
}

const Line = styled(motion.div)`
  height: 0.3rem;
  background: #23d997;
  width: 0%;
  position: absolute;
  // bottom: -80%;
  // left: 60%;
`;

export default LandNav;
