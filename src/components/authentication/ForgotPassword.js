import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import CenteredContainer from "./CenteredContainer";
import GlassBg from "../styles/GlassBg";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
    }

    setLoading(false);
  }

  return (
    <>
      <GlassBg />
      <CenteredContainer>
        <Card>
          <Card.Body className="ml-5 mr-5 mt-4">
            <h2 className="text-center mb-4" style={{ cursor: "default" }}>
              Password Reset
            </h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Button disabled={loading} className="w-100" type="submit">
                Reset Password
              </Button>
            </Form>
            <div className="w-100 text-center mt-3 btn btn-light">
              <Link to="/login">Login</Link>
            </div>

            <p className="btn__separator mt-5 mb-4">
              <span style={{ cursor: "default" }}>Need an account? </span>
            </p>
            <Button
              as={Link}
              to="/signup"
              variant="Link"
              className="w-100 text-primary "
            >
              Sign Up
            </Button>
          </Card.Body>
        </Card>
      </CenteredContainer>
    </>
  );
}
