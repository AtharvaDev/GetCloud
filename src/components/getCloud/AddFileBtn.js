import { faFileImport, faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { database, storage } from "../../firebase";
import { ROOT_FOLDER } from "../../hooks/useFolder";
import { v4 as uuidV4 } from "uuid";
import reactDom from "react-dom";
import { ProgressBar, Toast } from "react-bootstrap";
import SidebarOption from "./sidebars/SidebarOption";

function AddFileBtn({ currentFolder }) {
  const { currentUser } = useAuth();
  const [uploadingFiles, setUploadingFiles] = useState([]);

  //////////////
  let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER];
  if (currentFolder) path = [...path, ...currentFolder.path];

  let fold = path.map((folder) => folder.name);

  ////////////////////

  function handleupload(e) {
    const file = e.target.files[0];
    if (currentFolder == null || file == null) return;

    const id = uuidV4();
    setUploadingFiles((prevUploadingFiles) => [
      ...prevUploadingFiles,
      {
        id: id,
        name: file.name,
        progress: 0,
        error: false,
      },
    ]);

    const filePath =
      currentFolder === ROOT_FOLDER
        ? `${fold.join("/")}/${file.name}`
        : `${fold.join("/")}/${currentFolder.name}/${file.name}`;

    //     {path.map( folder =>{
    //     let filePath = currentFolder === ROOT_FOLDER
    //          ? `${currentFolder.path.join("/")}/${file.name}`
    //          : `${currentFolder.path.join("/")}/${currentFolder.name}/${file.name}`;
    //         console.log(folder.name)

    //         const uploadTask = storage
    //         .ref(`/files/${currentUser.uid}/${filePath}`)
    //         .put(file);
    //   })}

    // console.log(currentFolder.path)
    const uploadTask = storage
      .ref(`/files/${currentUser.uid}/${filePath}`)
      .put(file);
    console.log(file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = snapshot.bytesTransferred / snapshot.totalBytes;
        setUploadingFiles((prevUploadingFiles) => {
          // console.log(prevUploadingFiles)
          // console.log(UploadingFiles)

          return prevUploadingFiles.map((uploadingFile) => {
            if (uploadingFile.id === id) {
              return { ...uploadingFile, progress: progress };
            }
            return uploadingFile;
          });
        });
      },
      () => {
        setUploadingFiles((prevUploadingFiles) => {
          return prevUploadingFiles.map((uploadingFile) => {
            if (uploadingFile.id === id) {
              return { ...uploadingFile, error: true };
            }
            return uploadingFile;
          });
        });
      },
      () => {
        setUploadingFiles((prevUploadingFiles) => {
          return prevUploadingFiles.filter((uploadingFile) => {
            return uploadingFile.id !== id;
          });
        });
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          database.files
            .where("name", "==", file.name)
            .where("userId", "==", currentUser.uid)
            .where("folderId", "==", currentFolder.id)
            .get()
            .then((existingFiles) => {
              const existingFile = existingFiles.docs[0];
              if (existingFile) {
                existingFile.ref.update({
                  url: url,
                  size: file.size / 1000000,
                  createdAt: database.getCurrrentTimeStamp(),
                });
              } else {
                database.files.add({
                  url: url,
                  name: file.name,
                  createdAt: database.getCurrrentTimeStamp(),
                  folderId: currentFolder.id,
                  userId: currentUser.uid,
                  size: file.size / 1000000,
                  type: file.type,
                  isStared: false,
                  isTrash: false,
                  email: currentUser.email,
                });
              }
            });
        });
      }
    );
  }

  return (
    <>
      <label className="m-0 w-100">
        <SidebarOption
          title={" Upload File"}
          icon={faFileImport}
        ></SidebarOption>

        <input
          type="file"
          onChange={handleupload}
          style={{ opacity: 0, position: "absolute", left: "-999999px" }}
        />
      </label>
      <div className="animate__animated animate__backInRight">
        {uploadingFiles.length > 0 &&
          reactDom.createPortal(
            <div
              className="animate__animated animate__zoomInDown animate__rotateInDownRight"
              style={{
                position: "absolute",
                bottom: "1rem",
                right: "1rem",
                maxWidth: "250px",
              }}
            >
              {uploadingFiles.map((file) => (
                <Toast
                  key={file.id}
                  onClose={() => {
                    setUploadingFiles((prevUploadingFiles) => {
                      return prevUploadingFiles.filter((uploadFile) => {
                        return uploadFile.id !== file.id;
                      });
                    });
                  }}
                >
                  <Toast.Header
                    closeButton={file.error}
                    className="text-truncate w-100 d-block"
                  >
                    {file.name}
                  </Toast.Header>
                  <Toast.Body
                    style={{ minWidth: "150px", textAlign: "center" }}
                  >
                    <ProgressBar
                      animated={!file.error}
                      variant={file.error ? "danger" : "primary"}
                      now={file.error ? 100 : file.progress * 100}
                      label={
                        file.error
                          ? "Error"
                          : `${Math.round(file.progress * 100)}%`
                      }
                    />
                  </Toast.Body>
                </Toast>
              ))}
            </div>,
            document.body
          )}
      </div>
    </>
  );
}

export default AddFileBtn;
