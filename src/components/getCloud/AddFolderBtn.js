import { Button, Form, Modal } from "react-bootstrap";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { database } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import { ROOT_FOLDER } from "../../hooks/useFolder";
import SidebarOption from "./sidebars/SidebarOption";

export default function AddFolderBtn({ currentFolder }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const { currentUser } = useAuth();
  const { globalDarkTheme } = useAuth();

  // const [fold, setFold] = useState([])

  //////////////
  // let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER];
  // if (currentFolder) path = [...path, ...currentFolder.path];

  // let fold = path.map(folder =>  folder.name)
  // console.log(fold.join('/'))
  ////////////////////

  function openModal() {
    setOpen(true);
  }
  function closeModal() {
    setOpen(false);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (currentFolder == null) return;

    const path = [...currentFolder.path];
    if (currentFolder !== ROOT_FOLDER) {
      path.push({ name: currentFolder.name, id: currentFolder.id });
    }

    //create a new folder here
    database.folders.add({
      name: name,
      parentId: currentFolder.id,
      userId: currentUser.uid,
      path: path,
      createdAt: database.getCurrrentTimeStamp(),
    });

    setName("");
    closeModal();

    // <button className="w-100 bg-transparent" style={{ border:"none", padding:"0px"}} onClick={openModal} >
    //     <SidebarOption title="Add Folder" icon={faFolderPlus}></SidebarOption>
    //   </button>
  }
  return (
    <>
      <button
        className="w-100 bg-transparent"
        style={{ border: "none", padding: "0px", outline: "none" }}
        onClick={openModal}
      >
        <SidebarOption title="New Folder" icon={faFolderPlus}></SidebarOption>
      </button>
      {/* {console.log(currentUser)}{" "} */}

      {/* {console.log(path)} */}

      <Modal show={open} onHide={closeModal}>
        <Form onSubmit={handleSubmit}>
          <Modal.Body className={globalDarkTheme ? "bg-dark" : "bg-light"}>
            <Form.Group>
              <Form.Label>Folder Name</Form.Label>
              <Form.Control
                className={globalDarkTheme ? "text-white bg-dark" : "bg-light"}
                placeholder="Enter the name of new folder here"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className={globalDarkTheme ? "bg-dark" : "bg-light"}>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
            <Button variant="success" type="submit">
              Add Folder
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
