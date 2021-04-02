import { Button, Modal } from "react-bootstrap";
import React, { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import "./voiceEnabled.css";

function VoiceCommands() {
  const [show, setShow] = useState(false);
  const { globalDarkTheme } = useAuth();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Button variant="link" className="btn" onClick={handleShow}>
        Voice Commands
      </Button>

      <Modal className="voice__modal" show={show} onHide={handleClose}>
        <Modal.Header
          className={globalDarkTheme ? "bg-dark" : "bg-light"}
          closeButton
        >
          <Modal.Title>Vocie commands tutorial</Modal.Title>
        </Modal.Header>
        <Modal.Body className={globalDarkTheme ? "bg-dark" : "bg-light"}>
          yaaah
        </Modal.Body>
        <Modal.Footer className={globalDarkTheme ? "bg-dark" : "bg-light"}>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default VoiceCommands;
