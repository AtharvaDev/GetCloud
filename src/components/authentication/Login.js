import React, { useEffect, useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import CenteredContainer from "./CenteredContainer";
import "./login.css";
import GoogleButton from "react-google-button";
import { auth, database, provider } from "../../firebase";
import GlassBg from "../styles/GlassBg";
import logo from "../icons/logo1.png";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup, currentUser, setCurrentUser } = useAuth();

  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/home");
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }

  function responseGoogle() {
    auth.signInWithPopup(provider).then((result) => {
      console.log(result);
      setCurrentUser(result);
      if (currentUser) {
        database.users.doc(currentUser.uid).set({
          userId: currentUser.uid,
          name: currentUser.displayName,
          email: currentUser.email,
          pass: "",
          createdAt: database.getCurrrentTimeStamp(),
          profilePic: currentUser.photoURL,
        });
        // window.location.href = '/home'
      }
    });
  }
  console.log(currentUser);

  useEffect(() => {
    if (currentUser) {
      history.replace("/home");
    }
  }, [currentUser]);

  return (
    <>
      <GlassBg className="h-100" />
      {/* <div className="circle1" style={{ top: "5%", right: "20%" }}></div> */}
      {/* <div className="circle2" style={{ bottom: "0%", left: "20%" }}></div> */}
      <div className="circle1" style={{}}></div>
      <div className="circle2" style={{}}></div>
      <CenteredContainer>
        <Card id="cardPos">
          <Card.Body id="resp__cardBody" className="ml-5 mr-5 mt-3 mb-3 ">
            <div className="login__heading text-center w-100">
              <h2 className="text-center mb-0" style={{ cursor: "default" }}>
                Log in to
              </h2>
              <Link to="/">
                <img className="login__logo pl-2" src={logo} alt="" />
              </Link>
            </div>

            <GoogleButton
              className="w-100 mb-4 mt-4 rounded"
              type="light"
              label="Continue with Google"
              onClick={responseGoogle}
            />
            <p className="btn__separator mb-3">
              <span style={{ cursor: "default" }}>or</span>
            </p>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password">
                <div className="d-flex justify-content-between">
                  <Form.Label>Password</Form.Label>
                  <Link to="/forgot-password">
                    <span style={{ color: "blue" }}>Forgot Password?</span>
                  </Link>
                </div>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Button disabled={loading} className="w-100" type="submit">
                Log In
              </Button>
            </Form>
            <p className="btn__separator mt-5 mb-4">
              <span style={{ cursor: "default" }}>New to DigiSpace</span>
            </p>
            <Button
              disabled={loading}
              variant="light"
              className="w-100"
              as={Link}
              to="/signup"
            >
              <Link to="/signup">
                <span style={{ color: "blue" }}> SignUp Now</span>
              </Link>
            </Button>
          </Card.Body>
        </Card>
      </CenteredContainer>
    </>
  );
}
