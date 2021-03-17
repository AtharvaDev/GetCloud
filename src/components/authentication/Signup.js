import React, { useEffect, useRef, useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import CenteredContainer from "./CenteredContainer";
import { database, storage } from "../../firebase";
import { auth } from "../../firebase";
import "./signup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faUser } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidV4 } from "uuid";

export default function Signup() {
  const usernameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const passwordConfirmRef = useRef();
  const { signup, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageAsUrl, setImageAsUrl] = useState(
    "https://firebasestorage.googleapis.com/v0/b/getcloud.appspot.com/o/DefaultUserPhoto.jpg?alt=media&token=78016bd9-5b88-4984-bcfb-c8f0a9a06ddd"
  );
  const [imageAsFile, setImageAsFile] = useState();

  const [profilePicData, setProfilePicData] = useState("");
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);

      history.push("/home");
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  }

  useEffect(() => {
    // try {
    auth.onAuthStateChanged((authUser) => {
      console.log(imageAsUrl);
      console.log("atharva testing this before", authUser);

      if (authUser) {
        if (authUser.displayName) {
          //don't do anything
        } else {
          return authUser.updateProfile({
            displayName: usernameRef.current.value,
            photoURL: imageAsUrl,
          });
        }
      }
    });
    // } catch (e) {
    // console.log(e)
    // }
  }, [imageAsUrl, auth]);

  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    const id = uuidV4();
    setProfilePicData(id);

    setImageAsFile(image);
    const uploadTask = storage.ref(`/images/${id}/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapShot) => {
        //takes a snap shot of the process as it is happening
      },
      (err) => {
        //catches the errors
        console.log(err);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((fireBaseUrl) => {
          setImageAsUrl(fireBaseUrl);
        });
      }
    );

    // console.log(imageAsUrl);
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "600px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Sign Up</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {/* {console.log(imageAsUrl)} */}
            <div className="d-flex align-items-center justify-content-center">
              <div className="signup__row__left">
                <div className="signupProfile">
                  <img
                    className="signup__profileUrl rounded-circle"
                    src={imageAsUrl}
                  ></img>

                  <p>Selet a profile photo</p>
                  <div className="signup__profileUrl__upload">
                    <label className="m-0 p-1">
                      <FontAwesomeIcon icon={faUpload}></FontAwesomeIcon>
                      {"  "}Upload photo
                      <input
                        style={{
                          opacity: 0,
                          position: "absolute",
                          left: "-999999px",
                        }}
                        type="file"
                        onChange={handleImageAsFile}
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div className="signup__row__right">
                <Form onSubmit={handleSubmit}>
                  <Form.Group id="username">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control type="name" ref={usernameRef} required />
                  </Form.Group>
                  <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required />
                  </Form.Group>
                  <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef} required />
                  </Form.Group>
                  <Form.Group id="password-confirm">
                    <Form.Label>Password Confirmation</Form.Label>
                    <Form.Control
                      type="password"
                      ref={passwordConfirmRef}
                      required
                    />
                  </Form.Group>
                  <Button
                    variant="success"
                    disabled={loading}
                    className="w-100"
                    type="submit"
                  >
                    Sign Up
                  </Button>
                </Form>
              </div>
            </div>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Already have an account? <Link to="/login">Log In</Link>
        </div>
      </div>
    </Container>
  );
}
