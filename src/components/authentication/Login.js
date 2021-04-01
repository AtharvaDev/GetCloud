import React, { useEffect, useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import CenteredContainer from "./CenteredContainer";
import "./login.css";
import GoogleButton from "react-google-button";
import { auth, database, provider } from "../../firebase";

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
    <CenteredContainer>
      <Card>
        <Card.Body className="ml-5 mr-5 mt-3  mb-3">
          <h2 className="text-center mb-4">Log in to Get Cloud</h2>
          <GoogleButton
            className="w-100 mb-4 mt-4 rounded"
            type="light"
            label="Continue with Google"
            onClick={responseGoogle}
          />
          <p className="btn__separator">
            <span>or</span>
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
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Log In
            </Button>
          </Form>
          <p className="btn__separator mt-5">
            <span>New to Get Cloud</span>
          </p>
          <div className="w-100 text-center mt-2 btn btn-light">
            <Link to="/signup">Sign Up Now</Link>
          </div>
        </Card.Body>
      </Card>
    </CenteredContainer>
  );
}
