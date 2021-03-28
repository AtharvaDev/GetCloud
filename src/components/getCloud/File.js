import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faFile,
  faShare,
  faStar,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import Folder from "./Folder";
import { database } from "../../firebase";
import Clipboard from "react-clipboard.js";
import { Alert } from "react-bootstrap";

export default function File({ file }) {
  const { globalDarkTheme } = useAuth();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [star, setStar] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const { currentUser } = useAuth();

  function openModal() {
    setOpen(true);
  }
  function closeModal() {
    setOpen(false);
  }

  function diplayAlert() {
    setAlertVisible(true);
    window.setTimeout(() => {
      setAlertVisible(false);
    }, 2000);

    setOpen(false);
  }

  function handleSubmit() {}
  // console.log(file);
  database.files
    .doc(file.id)
    .get()
    .then((doc) => {
      if (doc.exists) {
        setStar(doc.data().isStared);
        // console.log(star);
      } else {
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });

  // console.log(file);
  function handleAddStared() {
    database.files.doc(file.id).update({
      isStared: true,
    });
  }

  function handleRemoveStared() {
    database.files.doc(file.id).update({
      isStared: false,
    });
  }

  return (
    <div
      className={
        globalDarkTheme
          ? "d-flex border border-light rounded"
          : "d-flex border border-dark rounded"
      }
    >
      {alertVisible ? (
        <div style={{ position: "absolute", left: "50%", top: "10%" }}>
          <Alert variant="info">Link copied successfully</Alert>
        </div>
      ) : (
        ""
      )}
      <Button
        href={file.url}
        target="_blank"
        variant={globalDarkTheme ? "outline-light" : "outline-dark"}
        style={{ border: "none", outline: "none" }}
        className="d-flex w-100 align-items-center text-truncate"
      >
        <FontAwesomeIcon icon={faFile} className="mr-2" />
        <p className="text-truncate mb-0">{file.name}</p>
      </Button>
      <div>
        <Dropdown
          style={{ border: "none", outline: "none", borderRadius: "100%" }}
          variant={globalDarkTheme ? "outline-light" : "outline-dark"}
        >
          <Dropdown.Toggle
            variant="none"
            style={
              globalDarkTheme
                ? { border: "none", outline: "none", color: "white" }
                : { border: "none", outline: "none", color: "black" }
            }

            // style={{ border: "none", outline: "none" }}
          >
            <Dropdown.Menu
              className={
                globalDarkTheme
                  ? "bg-dark text-white drop_menu"
                  : "bg-light text-dark drop_menu"
              }
            >
              <Dropdown.Item
                // href="#/action-1"
                className={
                  globalDarkTheme ? "bg-dark text-white" : "bg-light text-dark"
                }
                onClick={openModal}
              >
                <FontAwesomeIcon icon={faShare} className="mr-2" />
                Share
              </Dropdown.Item>
              {/* Rename starts //////////////////////////////////////////*/}
              <Modal show={open} onHide={closeModal}>
                <Form onSubmit={handleSubmit}>
                  <Modal.Body
                    className={globalDarkTheme ? "bg-dark" : "bg-light"}
                  >
                    <Form.Group>
                      <Form.Label>Easy share</Form.Label>
                      <Form.Control
                        className={
                          globalDarkTheme ? "text-white bg-dark" : "bg-light"
                        }
                        // placeholder={`Renaming - ${Folder.name}`}
                        type="text"
                        required
                        value={file.url}
                      ></Form.Control>
                    </Form.Group>
                  </Modal.Body>
                  <Modal.Footer
                    className={globalDarkTheme ? "bg-dark" : "bg-light"}
                  >
                    <Button variant="secondary" onClick={closeModal}>
                      Close
                    </Button>
                    <Clipboard
                      className="btn btn-primary"
                      data-clipboard-text={file.url}
                      onClick={diplayAlert}
                    >
                      copy to clipboard
                    </Clipboard>
                  </Modal.Footer>
                </Form>
              </Modal>
              {/* Rename ends //////////////////////////////////////////// */}

              {/* Started starts ///////////////////////////////////////// */}
              {/* {console.log(star)} */}
              {star ? (
                <Dropdown.Item
                  onClick={handleRemoveStared}
                  // href="#/action-2"
                  className={
                    globalDarkTheme
                      ? "bg-dark text-white"
                      : "bg-light text-dark"
                  }
                >
                  <FontAwesomeIcon
                    color="gold"
                    icon={faStar}
                    className="mr-2"
                  />
                  Remove star
                </Dropdown.Item>
              ) : (
                <Dropdown.Item
                  onClick={handleAddStared}
                  // href="#/action-2"
                  className={
                    globalDarkTheme
                      ? "bg-dark text-white"
                      : "bg-light text-dark"
                  }
                >
                  <FontAwesomeIcon icon={faStar} className="mr-2" />
                  Add to Starred
                </Dropdown.Item>
              )}

              {/* Started ends ///////////////////////////////////////// */}
              <Dropdown.Divider />
              <Dropdown.Item
                // href="#/action-3"
                className={
                  globalDarkTheme ? "bg-dark text-white" : "bg-light text-dark"
                }
              >
                <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
                Delete
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Toggle>
        </Dropdown>
      </div>
    </div>
  );
}
