import React from "react";
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

export default function Dashboard() {
  const { globalDarkTheme } = useAuth();

  const { folderId } = useParams();
  const { state = {} } = useLocation();
  const { folder, childFolders, childFiles } = useFolder(
    folderId,
    state.folder
  );
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

              {childFolders.length > 0 && (
                <div className="d-flex flex-wrap">
                  <div className="w-100 mt-4">Folders</div>
                  {childFolders.map((childFolder) => (
                    <div
                      key={childFolder.id}
                      // style={{ width: "33.3%" }}
                      className="folder__file p-2"
                    >
                      <Folder folder={childFolder} />
                    </div>
                  ))}
                </div>
              )}

        {childFolders.length > 0 && childFiles.length > 0 && <hr />}
        {childFolders.length > 0 && childFiles.length > 0 && (
          <div className="w-100 mt-4">Files</div>
        )}

        {childFiles.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFiles.map((childFile) => (
              <div
                key={childFile.id}
                // style={{ width: "250px" }}
                className="folder__file p-2"
              >
                <File file={childFile}></File>
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
