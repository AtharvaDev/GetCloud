import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useLocation, useParams } from "react-router";
import { useAuth } from "../../../contexts/AuthContext";
import { database } from "../../../firebase";
import { useFolder } from "../../../hooks/useFolder";
import File from "../File";
import Folder from "../Folder";
import FolderBreadcrumbs from "../FolderBreadcrumbs";
import NavbarComponent from "../Navbar";

function Trashmenu() {
  const { globalDarkTheme, currentUser } = useAuth();
  const { folderId } = useParams();
  const { state = {} } = useLocation();
  const { folder, childFolders, childFiles } = useFolder(
    folderId,
    state.folder
  );
  const [trashFolders, setTrashfolders] = useState([]);
  const [trashFiles, setTrashFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  useEffect(() => {
    database.folders
      .where("isTrash", "==", true)
      .where("userId", "==", currentUser.uid)
      .orderBy("createdAt")
      .onSnapshot((snapshot) => {
        setTrashfolders(snapshot.docs.map(database.formatDoc));
      });

    database.files
      .where("isTrash", "==", true)
      .where("userId", "==", currentUser.uid)
      .orderBy("createdAt")
      .onSnapshot((snapshot) => {
        setTrashFiles(snapshot.docs.map(database.formatDoc));
        // console.log(starFiles);
      });
  }, [folder]);

  return (
    <>
      <div
        className={
          globalDarkTheme
            ? "dashboard dashboard__dark p-2"
            : "dashboard dashboard__light p-2 "
        }
      >
        {/* <ChangeMode /> */}
        <NavbarComponent></NavbarComponent>

        <Container fluid>
          <div className="d-flex align-items-center">
            <FolderBreadcrumbs currentFolder={folder}></FolderBreadcrumbs>

            {/* <AddFolderBtn currentFolder={folder}></AddFolderBtn> */}
            {/* <AddFileBtn currentFolder={folder}></AddFileBtn> */}
          </div>

          {loading === false ? (
            folder &&
            trashFolders.length === 0 &&
            trashFiles.length === 0 && (
              <div className="dashboard__welcome">
                <div>
                  <img
                    src="https://ssl.gstatic.com/docs/doclist/images/empty_state_trash_v2.svg"
                    alt=""
                    width="100px"
                  />
                </div>

                <p>Hi {currentUser.displayName}</p>
                <h5>No items</h5>
                <h6>Items moved to the trash will appear here</h6>

                {/* <h2>You can start with</h2> */}
              </div>
            )
          ) : (
            <SkeletonTheme
              color={globalDarkTheme ? "#202020" : ""}
              highlightColor="#444"
            >
              <div className="dashboard__welcome">
                <Skeleton count={1} />
                <Skeleton count={1} height={100} />
              </div>
            </SkeletonTheme>
          )}

          {trashFolders.length > 0 && (
            <div className="d-flex flex-wrap">
              <div className="w-100 mt-4">Folders</div>
              {trashFolders.map((childFolder) => (
                <div
                  key={childFolder.id}
                  // style={{ width: "33.3%" }}
                  className="folder__file p-2 animate_zoomIn"
                >
                  <Folder folder={childFolder} />
                </div>
              ))}
            </div>
          )}
          {/* {console.log(trashFolders)} */}
          {trashFolders.length > 0 && trashFiles.length > 0 && <hr />}
          {trashFolders.length >= 0 && trashFiles.length > 0 && (
            <div className="w-100 mt-4">Files</div>
          )}

          {trashFiles.length > 0 && (
            <div className="d-flex flex-wrap">
              {trashFiles.map((childFile) => (
                <div
                  key={childFile.id}
                  // style={{ width: "250px" }}
                  className="folder__file p-2 animate_zoomIn"
                >
                  <File file={childFile}></File>
                </div>
              ))}
            </div>
          )}
        </Container>
      </div>
    </>
  );
}

export default Trashmenu;
