import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, DropdownButton, Form, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faFolder,
  faMicrophone,
  faStar,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../contexts/AuthContext";
import { Dropdown } from "react-bootstrap";
import { database } from "../../firebase";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export default function Folder({ folder }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [star, setStar] = useState("");
  const [trash, setTrash] = useState("");
  const { currentUser } = useAuth();
  const { globalDarkTheme } = useAuth();
  const { transcript, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    setName(transcript);
    // console.log(transcript);
  }, [transcript]);

  function openModal() {
    setOpen(true);
  }
  function closeModal() {
    setOpen(false);
  }

  // console.log(database.folders.doc(folder.id).get.then(doc => { doc.data()}))

  //below databse code checks the current isStared in docs and updates the setStar
  useEffect(() => {
    database.folders
      .doc(folder.id)
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
  }, [folder]);

  // database.folders
  // .doc(folder.id)
  // .get()
  // .then((doc) => {
  //   if (doc.exists) {
  //     setStar(doc.data().isStared);
  //     // console.log(star);
  //   } else {
  //     console.log("No such document!");
  //   }
  // })
  // .catch((error) => {
  //   console.log("Error getting document:", error);
  // });

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(folder.name, name)
    database.folders.doc(folder.id).update({
      name: name,
    });
    setName("");
    closeModal();
  }

  function handleAddStared() {
    database.folders.doc(folder.id).update({
      isStared: true,
    });
  }

  function handleRemoveStared() {
    database.folders.doc(folder.id).update({
      isStared: false,
    });
  }

  return (
    <div
      id="show__folder"
      className={
        globalDarkTheme
          ? "d-flex border border-light rounded"
          : "d-flex border border-dark rounded"
      }
    >
      <Button
        to={{
          pathname: `/folder/${folder.id}`,
          state: { folder: folder },
        }}
        // variant="outline-dark"
        variant={globalDarkTheme ? "outline-light" : "outline-dark"}
        style={{ border: "none", outline: "none", minWidth: "0" }}
        className="d-flex w-100 align-items-center text-truncate"
        as={Link}
      >
        <FontAwesomeIcon icon={faFolder} className="mr-2" />
        <p className="text-truncate mb-0">{folder.name}</p>
        {/* <div className=""></div> */}
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
                <FontAwesomeIcon icon={faEdit} className="mr-2" />
                Rename
              </Dropdown.Item>
              {/* Rename starts //////////////////////////////////////////*/}
              <Modal show={open} onHide={closeModal}>
                <Form onSubmit={handleSubmit}>
                  <Modal.Body
                    className={globalDarkTheme ? "bg-dark" : "bg-light"}
                  >
                    <Form.Group>
                      <Form.Label>New Folder Name</Form.Label>
                      <div className="d-flex">
                        <Form.Control
                          className={
                            globalDarkTheme ? "text-white bg-dark" : "bg-light"
                          }
                          placeholder={`Renaming - ${folder.name}`}
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                        <Button onClick={SpeechRecognition.startListening}>
                          <FontAwesomeIcon
                            icon={faMicrophone}
                          ></FontAwesomeIcon>
                        </Button>
                      </div>
                    </Form.Group>
                  </Modal.Body>
                  <Modal.Footer
                    className={globalDarkTheme ? "bg-dark" : "bg-light"}
                  >
                    <Button variant="secondary" onClick={closeModal}>
                      Close
                    </Button>
                    <Button variant="success" type="submit">
                      Rename Folder
                    </Button>
                  </Modal.Footer>
                </Form>
              </Modal>
              {/* Rename ends //////////////////////////////////////////// */}

              {/* Started starts ///////////////////////////////////////// */}

              {star ? (
                <Dropdown.Item
                  onClick={handleRemoveStared}
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

              {/* Trash starts ///////////////////////////////////////// */}
              <Dropdown.Item
                className={
                  globalDarkTheme ? "bg-dark text-white" : "bg-light text-dark"
                }
              >
                <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
                Delete
              </Dropdown.Item>

              {/* Trash ends ///////////////////////////////////////// */}
            </Dropdown.Menu>
          </Dropdown.Toggle>
        </Dropdown>
      </div>
    </div>
  );
}
