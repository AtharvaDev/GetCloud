import React, { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { database } from "../../firebase";
import "./TextEditor.css";

function TextEditorMenu() {
  const [value, setValue] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);

  const location = useLocation();

  const id = location.pathname.substr(10);

  console.log(value);

  useEffect(() => {
    database.docx
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.data().text);
          setValue(doc.data().text);
        } else {
          console.log("No such document!");
        }
      });
  }, []);

  useEffect(() => {}, [value]);

  function diplayAlert() {
    setAlertVisible(true);
    window.setTimeout(() => {
      setAlertVisible(false);
    }, 1500);
  }

  function saveText() {
    database.docx.doc(id).update({
      modifiedAt: database.getCurrrentTimeStamp(),
      text: value,
    });
    diplayAlert();
  }
  function clearText() {
    database.docx.doc(id).update({
      modifiedAt: database.getCurrrentTimeStamp(),
      text: "",
    });
    setValue("");
  }

  return (
    <div className="TextEditor">
      <div
        className="w-100 mt-3 mb-3 d-flex align-items-center"
        style={{ justifyContent: "space-evenly" }}
      >
        <Button variant="danger" onClick={clearText}>
          CLEAR
        </Button>
        <Button onClick={saveText}>SAVE</Button>
        {alertVisible ? (
          <div
            style={{
              position: "absolute",
              zIndex: "100",
              left: "50%",
              top: "10%",
            }}
          >
            <Alert variant="info">File Saved</Alert>
          </div>
        ) : (
          ""
        )}
      </div>
      <ReactQuill theme="snow" value={value} onChange={setValue} />
    </div>
  );
}

export default TextEditorMenu;
