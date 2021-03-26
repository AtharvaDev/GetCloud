import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, DropdownButton, Form, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEllipsisV,
  faFolder,
  faHelicopter,
  faRecycle,
  faStar,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../contexts/AuthContext";
import { Dropdown } from "react-bootstrap";
import { database } from "../../firebase";

export default function Folder({ folder }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const { currentUser } = useAuth();
  const { globalDarkTheme } = useAuth();

  function openModal() {
    setOpen(true);
  }
  function closeModal() {
    setOpen(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(folder.name, name)
    database.folders.doc(folder.id).update({
      name: name
    })
    setName("");
    closeModal();

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
        style={{ border: "none", outline: "none" }}
        className="text-truncate  w-100"
        as={Link}
      >
        <div className="d-flex align-items-center justify-content-between">
          <div className="">
            <FontAwesomeIcon icon={faFolder} className="mr-2" />
            {folder.name}
          </div>
          <div className=""></div>
        </div>
      </Button>
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

            <Dropdown.Item
              // href="#/action-2"
              className={
                globalDarkTheme ? "bg-dark text-white" : "bg-light text-dark"
              }
            >
              <FontAwesomeIcon icon={faStar} className="mr-2" />
              Add to Starred
            </Dropdown.Item>
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
  );
}
