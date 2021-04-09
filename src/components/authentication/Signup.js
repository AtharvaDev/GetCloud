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
import PasswordStrengthBar from "react-password-strength-bar";
import GlassBg from "../styles/GlassBg";

export default function Signup() {
  const usernameRef = useRef("");
  const emailRef = useRef("");
  // const passwordRef = useRef("");
  const passwordConfirmRef = useRef();
  const { signup, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageAsUrl, setImageAsUrl] = useState("");
  const [imageAsFile, setImageAsFile] = useState();
  const [profilePicData, setProfilePicData] = useState("");
  const [passwordRef, setpasswordRef] = useState("");
  const history = useHistory();

  if (imageAsUrl === "") {
    setImageAsUrl(
      "https://firebasestorage.googleapis.com/v0/b/getcloud.appspot.com/o/DefaultUserPhoto.jpg?alt=media&token=78016bd9-5b88-4984-bcfb-c8f0a9a06ddd"
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef);

      history.push("/home");
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  }

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

  useEffect(() => {
    if (imageAsFile) {
      console.log(imageAsFile.type);
      if (
        imageAsFile.type === "image/jpeg" ||
        imageAsFile.type === "image/png"
      ) {
        console.log("okkk");
      } else {
        // console.log("not");
        setError("file format not supported please upload jpg or png");
      }
    }
    return () => {
      setError("");
    };
  }, [imageAsFile]);

  if (currentUser) {
    database.users.doc(currentUser.uid).set({
      userId: currentUser.uid,
      name: usernameRef.current.value,
      email: emailRef.current.value,
      pass: passwordRef,
      createdAt: database.getCurrrentTimeStamp(),
      profilePic: imageAsUrl,
    });

    currentUser.updateProfile({
      photoURL: imageAsUrl,
      displayName: usernameRef.current.value,
    });
    console.log(imageAsUrl, "now in curruser");
  }

  useEffect(() => {
    if (currentUser) {
      history.replace("/home");
    }
  }, [currentUser]);

  return (
    <>
      <GlassBg />
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        {console.log(imageAsFile)}
        <div className="w-100" style={{ maxWidth: "600px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4" style={{ cursor: "default" }}>
                Sign Up
              </h2>
              {error && <Alert variant="danger">{error}</Alert>}
              {/* {console.log(imageAsUrl)} */}
              <div className="signup__row d-flex align-items-center justify-content-center">
                <div className="signup__row__left">
                  <div className="signupProfile">
                    <img
                      className="signup__profileUrl rounded-circle"
                      src={imageAsUrl}
                    ></img>

                    <p style={{ cursor: "default" }}>Selet a profile photo</p>
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
                          disabled={loading}
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
                      <Form.Control
                        type="password"
                        value={passwordRef}
                        onChange={(e) => setpasswordRef(e.target.value)}
                        required
                      />
                      <PasswordStrengthBar password={passwordRef} />
                      {/* {console.log(passwordRef)} */}
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
              <div
                className="w-100 text-center mt-4"
                style={{ cursor: "default" }}
              >
                Already have an account?{" "}
                <Link to="/login">
                  {" "}
                  <span style={{ color: "blue" }}>Log In</span>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
}
