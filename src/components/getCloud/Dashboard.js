import React, { useEffect, useState } from "react";
import { Container, Nav, Row } from "react-bootstrap";
import { useLocation, useParams } from "react-router";
import { useFolder } from "../../hooks/useFolder";
import AddFileBtn from "./AddFileBtn";
import AddFolderBtn from "./AddFolderBtn";
import File from "./File";
import Folder from "./Folder";
import FolderBreadcrumbs from "./FolderBreadcrumbs";
import "./Dashboard.css";
import { useAuth } from "../../contexts/AuthContext";
import ChangeMode from "../theme/ChangeMode";
import NavbarComponent from "./Navbar";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { database } from "../../firebase";
import VoiceEnabled from "./voiceEnabled/VoiceEnabled";
import VoiceCommands from "./voiceEnabled/VoiceCommands";

export default function Dashboard() {
  const { globalDarkTheme, currentUser } = useAuth();
  const { folderId } = useParams();
  const { state = {} } = useLocation();
  const { folder, childFolders, childFiles } = useFolder(
    folderId,
    state.folder
  );
  const [homeFolders, setHomefolders] = useState([]);
  const [homeFiles, setHomeFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  // console.log(currentUser)

  useEffect(() => {
    database.folders
      .where("parentId", "==", null)
      .where("isTrash", "==", false)
      .where("userId", "==", currentUser.uid)
      .orderBy("createdAt")
      .onSnapshot((snapshot) => {
        setHomefolders(snapshot.docs.map(database.formatDoc));
        // snapshot.forEach((doc) => {
        //   // doc.data() is never undefined for query doc snapshots
        //   console.log(doc.id, " => ", doc.data());
        // });
      });

    database.files
      .where("folderId", "==", null)
      .where("isTrash", "==", false)
      .where("userId", "==", currentUser.uid)
      .orderBy("createdAt")
      .onSnapshot((snapshot) => {
        // snapshot.forEach((doc) => {
        //   // doc.data() is never undefined for query doc snapshots
        //   console.log(doc.id, " => ", doc.data());
        // });
        setHomeFiles(snapshot.docs.map(database.formatDoc));
        // console.log(starFiles);
      });
  }, [folderId]);

  // console.log(state.folder);
  return (
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
          homeFolders.length === 0 &&
          homeFiles.length === 0 &&
          folder.name === "Home" && (
            <div className="dashboard__welcome">
              <p>Hi {currentUser.displayName}, Welcome to the CloudApp</p>
              <VoiceCommands />

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

        {childFolders.length > 0 && (
          <div className="d-flex flex-wrap">
            <div className="w-100 mt-4">Folders</div>
            {childFolders.map((childFolder) =>
              childFolder.isTrash ? (
                <></>
              ) : (
                <div
                  key={childFolder.id}
                  // style={{ width: "33.3%" }}
                  className="folder__file p-2 animate_zoomIn"
                >
                  <Folder folder={childFolder} />
                </div>
              )
            )}
          </div>
        )}

        {childFolders.length > 0 && homeFiles.length > 0 && <hr />}
        {childFolders.length > 0 && homeFiles.length > 0 && (
          <div className="w-100 mt-4">Files</div>
        )}

        {childFiles.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFiles.map((childFile) =>
              childFile.isTrash ? (
                <></>
              ) : (
                <div
                  key={childFile.id}
                  // style={{ width: "250px" }}
                  className="folder__file p-2 animate_zoomIn"
                >
                  <File file={childFile}></File>
                </div>
              )
            )}
          </div>
        )}
      </Container>
    </div>
  );
}
