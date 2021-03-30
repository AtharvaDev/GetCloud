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

function Recentmenu() {
  const { globalDarkTheme, currentUser } = useAuth();
  const { folderId } = useParams();
  const { state = {} } = useLocation();
  const { folder, childFolders, childFiles } = useFolder(
    folderId,
    state.folder
  );
  const [loading, setLoading] = useState(true);
  const [recentFolders, setRecentfolders] = useState([]);
  const [recentFiles, setRecentFiles] = useState([]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  // childFolderss = []
  useEffect(() => {
    database.folders
      .where("isTrash", "==", false)
      .where("userId", "==", currentUser.uid)
      .orderBy("createdAt", "desc")
      .limit(6)
      .onSnapshot((snapshot) => {
        setRecentfolders(snapshot.docs.map(database.formatDoc));
        // console.log(starFolders);
      });

    database.files
      .where("isTrash", "==", false)
      .where("userId", "==", currentUser.uid)
      .orderBy("createdAt", "desc")
      .limit(6)
      .onSnapshot((snapshot) => {
        // snapshot.forEach((doc) => {
        //   // doc.data() is never undefined for query doc snapshots
        //   console.log(doc.id, " => ", doc.data());
        // });
        setRecentFiles(snapshot.docs.map(database.formatDoc));
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
            recentFolders.length === 0 &&
            recentFiles.length === 0 && (
              <div className="dashboard__welcome">
                <div>
                  <img
                    src="https://ssl.gstatic.com/docs/doclist/images/empty_state_recents_v2.svg"
                    alt=""
                    width="100px"
                  />
                </div>

                <p>Hi {currentUser.displayName}</p>
                <h5>There are no recently created files or folders.</h5>
                <h6>Find everything you've recently created</h6>

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

          {recentFolders.length > 0 && (
            <div className="d-flex flex-wrap">
              <div className="w-100 mt-4">Folders</div>
              {recentFolders.map((childFolder) => (
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

          {recentFolders.length > 0 && childFiles.length > 0 && <hr />}
          {recentFolders.length >= 0 && childFiles.length > 0 && (
            <div className="w-100 mt-4">Files</div>
          )}

          {recentFiles.length > 0 && (
            <div className="d-flex flex-wrap">
              {recentFiles.map((childFile) => (
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

export default Recentmenu;
