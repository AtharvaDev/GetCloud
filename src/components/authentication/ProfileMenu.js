import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import CenteredContainer from "./CenteredContainer";
import NavbarComponent from "../getCloud/Navbar";
import Particles from "react-particles-js";
import Test from "../getCloud/Test";
import { motion } from "framer-motion";

export default function ProfileMenu() {
  const [error, setError] = useState("");
  const { currentUser, logout, globalDarkTheme } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <div
        className={
          globalDarkTheme
            ? "dashboard dashboard__dark p-2"
            : "dashboard dashboard__light p-2 "
        }
      >
        <CenteredContainer>
          {/* <NavbarComponent/> */}
          <Card>
            <Card.Body
              className={
                globalDarkTheme ? "text-light bg-dark" : "text-dark bg-light"
              }
            >
              <h2 className="text-center mb-4" style={{ cursor: "default" }}>
                Profile
              </h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <div className="d-flex  flex-column justify-content-center ">
                {/* <div className="d-flex flex-column justify-content-center align-items-centerr"> */}
                <img
                  style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                  className="signup__profileUrl rounded-circle"
                  src={currentUser.photoURL}
                ></img>
                {/* </div> */}
                <br></br>
                <div style={{ cursor: "default" }}>
                  <strong>Name:</strong> {currentUser.displayName}{" "}
                </div>
                <div style={{ cursor: "default" }}>
                  <strong>Email:</strong> {currentUser.email}{" "}
                </div>
              </div>
              {console.log(currentUser)}
              <motion.div
                whileHover={{
                  scale: 1.04,
                }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to="/update-profile"
                  className="btn btn-primary w-100 mt-3"
                >
                  Update Profile
                </Link>
              </motion.div>
              <hr style={{ backgroundColor: "aquamarine" }} />

              <motion.div
                whileHover={{
                  scale: 1.04,
                }}
                whileTap={{ scale: 0.97 }}
                className="w-100 mt-2"
              >
                <Button
                  variant="danger"
                  className="w-100"
                  onClick={handleLogout}
                >
                  Log Out
                </Button>
              </motion.div>
            </Card.Body>
          </Card>
        </CenteredContainer>
      </div>
    </>
  );
}
