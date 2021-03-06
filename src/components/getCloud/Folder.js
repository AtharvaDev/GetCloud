import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, DropdownButton, Form, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faFolder,
  faMicrophone,
  faStar,
  faTrash,
  faTrashAlt,
  faTrashRestore,
  faTrashRestoreAlt,
  faUndoAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../contexts/AuthContext";
import { Dropdown } from "react-bootstrap";
import { database } from "../../firebase";
import { ROOT_FOLDER } from "../../hooks/useFolder";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export default function Folder({ folder }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [star, setStar] = useState("");
  const [trash, setTrash] = useState("");
  const [parentFolder, setParentFolder] = useState("");
  const [parentFolderTrash, setParentFolderTrash] = useState(false);

  const { currentUser } = useAuth();
  const { globalDarkTheme } = useAuth();
  const { transcript, resetTranscript } = useSpeechRecognition();

  let path = folder === ROOT_FOLDER ? [] : [ROOT_FOLDER];
  if (folder) path = [...path, ...folder.path];

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
          setTrash(doc.data().isTrash);
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, [folder]);
  // console.log(trash);

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

  function handleAddTrash() {
    database.folders.doc(folder.id).update({
      isTrash: true,
      isStared: false,
    });
  }

  function handleRemoveTrash() {
    database.folders.doc(folder.id).update({
      isTrash: false,
      isStared: false,
    });
  }

  function handlePermanentlyTrash() {
    database.folders
      .doc(folder.id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      });
  }

  // root folder deletes =>  add child folders in trash ////////////////////////////
  // console.log(path, "main");
  // path.map((folder, index) => console.log(path.slice(index,index+1)));
  // path.map((folder, index) => console.log(path[path.length -1].id));

  useEffect(() => {
    path.map((folder, index) => {
      if (path.length != 1) {
        setParentFolder(path[path.length - 1].id);
      } else {
        setParentFolder("");
      }
    });
  }, [folder]);
  // console.log(parentFolder);

  useEffect(() => {
    {
      if (parentFolder != "") {
        database.folders
          .doc(parentFolder)
          .get()
          .then((doc) => {
            if (doc.exists) {
              // console.log("Document data:", doc.data());
              setParentFolderTrash(doc.data().isTrash);
            }
          });
      }
    }
  }, [parentFolder]);

  // console.log(parentFolderTrash);
  if (parentFolder != "") {
    if (parentFolderTrash == true) {
      // console.log("ok", parentFolderTrash);
      database.folders.doc(folder.id).update({
        isTrash: parentFolderTrash,
      });
    } else {
      // console.log("not ok", parentFolderTrash);
      database.folders.doc(folder.id).update({
        isTrash: parentFolderTrash,
      });
    }
  }
  // console.log(parentFolderTrash);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  return (
    <div
      // show__shadow added in home.css
      id="show__shadow"
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
              {trash ? (
                <Dropdown.Item
                  onClick={handleRemoveTrash}
                  className={
                    globalDarkTheme
                      ? "bg-dark text-white"
                      : "bg-light text-dark"
                  }
                >
                  <FontAwesomeIcon icon={faTrashRestoreAlt} className="mr-2" />
                  Restore
                </Dropdown.Item>
              ) : star ? (
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
              {trash ? (
                <Dropdown.Item
                  onClick={handlePermanentlyTrash}
                  className={
                    globalDarkTheme
                      ? "bg-dark text-white"
                      : "bg-light text-dark"
                  }
                >
                  <FontAwesomeIcon icon={faTrash} className="mr-2" />
                  Permanently Delete
                </Dropdown.Item>
              ) : path.length == "1" ? (
                <Dropdown.Item
                  onClick={handleAddTrash}
                  className={
                    globalDarkTheme
                      ? "bg-dark text-white"
                      : "bg-light text-dark"
                  }
                >
                  <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
                  Delete
                </Dropdown.Item>
              ) : (
                <Dropdown.Item
                  onClick={handlePermanentlyTrash}
                  className={
                    globalDarkTheme
                      ? "bg-dark text-white"
                      : "bg-light text-dark"
                  }
                >
                  <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
                  Permanently Delete
                </Dropdown.Item>
              )}

              {/* Trash ends ///////////////////////////////////////// */}
            </Dropdown.Menu>
          </Dropdown.Toggle>
        </Dropdown>
      </div>
    </div>
  );
}
