import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import CenteredContainer from "./CenteredContainer";
import GlassBg from "../styles/GlassBg";
import { motion } from "framer-motion";

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
              <motion.div
                whileHover={{
                  scale: 1.04,
                }}
                whileTap={{ scale: 0.97 }}
              >
                <Button disabled={loading} className="w-100" type="submit">
                  Reset Password
                </Button>
              </motion.div>
            </Form>

            <motion.div
              whileHover={{
                scale: 1.04,
              }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="w-100 text-center mt-3 btn btn-light">
                <Link to="/login">Login</Link>
              </div>
            </motion.div>

            <p className="btn__separator mt-5 mb-4">
              <span style={{ cursor: "default" }}>
                Still, need an account?{" "}
              </span>
            </p>

            <motion.div
              whileHover={{
                scale: 1.04,
              }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="w-100 text-center mt-3 btn btn-light">
                <Link to="/signup">Sign Up</Link>
              </div>
            </motion.div>
          </Card.Body>
        </Card>
      </CenteredContainer>
    </>
  );
}
