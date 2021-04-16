import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { storage } from "../../firebase";
import CenteredContainer from "./CenteredContainer";
import { v4 as uuidV4 } from "uuid";
import { motion } from "framer-motion";

function UpdateProfileMenu() {
  const emailRef = useRef();
  const nameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const {
    currentUser,
    updatePassword,
    updateEmail,
    globalDarkTheme,
    updateName,
    updatephotoURL,
  } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageAsUrl, setImageAsUrl] = useState("");
  const [imageAsFile, setImageAsFile] = useState();
  const [profilePicData, setProfilePicData] = useState("");
  const history = useHistory();

  if (imageAsUrl === "") {
    setImageAsUrl(currentUser.photoURL);
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
    console.log(imageAsUrl);
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setLoading(true);
    setError("");

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    if (nameRef.current.value !== currentUser.displayName) {
      promises.push(updateName(nameRef.current.value));
    }
    console.log(imageAsUrl);
    if (imageAsUrl) {
      promises.push(updatephotoURL(imageAsUrl));
    }

    Promise.all(promises)
      .then(() => {
        history.push("/user");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div
      className={
        globalDarkTheme
          ? "dashboard dashboard__dark p-2"
          : "dashboard dashboard__light p-2 "
      }
    >
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "600px" }}>
          <Card>
            <Card.Body
              className={
                globalDarkTheme ? "text-light bg-dark" : "text-dark bg-light"
              }
            >
              <h2 className="text-center mb-4" style={{ cursor: "default" }}>
                Update Profile
              </h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <div className="signup__row d-flex align-items-center justify-content-center">
                <div className="signup__row__left">
                  <div className="signupProfile">
                    <img
                      className="signup__profileUrl rounded-circle"
                      src={imageAsUrl}
                    ></img>

                    <p>Selet a profile photo</p>
                    <div className="signup__profileUrl__upload">
                      <label className="text-dark m-0 p-1">
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
                    <Form.Group id="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        ref={emailRef}
                        required
                        defaultValue={currentUser.email}
                      />
                    </Form.Group>
                    <Form.Group id="email">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="name"
                        ref={nameRef}
                        required
                        defaultValue={currentUser.displayName}
                      />
                    </Form.Group>
                    <Form.Group id="password">
                      <Form.Label>Password </Form.Label>
                      <Form.Control
                        type="password"
                        ref={passwordRef}
                        placeholder="Leave blank to keep the same"
                      />
                    </Form.Group>
                    <Form.Group id="password-confirm">
                      <Form.Label>Password Confirmation</Form.Label>
                      <Form.Control
                        type="password"
                        ref={passwordConfirmRef}
                        placeholder="Leave blank to keep the same"
                      />
                    </Form.Group>
                    <motion.div
                      whileHover={{
                        scale: 1.04,
                      }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Button
                        disabled={loading}
                        className="w-100"
                        type="submit"
                      >
                        Update
                      </Button>
                    </motion.div>
                  </Form>
                </div>
              </div>
              <div className="signup__cancelButton w-100 text-center mt-2">
                <motion.div
                  whileHover={{
                    scale: 1.04,
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button
                    className="pl-5 pr-5 mt-2 "
                    as={Link}
                    to={"/user"}
                    variant="danger"
                  >
                    Cancel
                  </Button>
                </motion.div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
}

export default UpdateProfileMenu;
