import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useLocation, useParams } from "react-router";
import { useAuth } from "../../../contexts/AuthContext";
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
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
            childFiles.length === 0 &&
            childFolders.length === 0 &&
            folder.name === "Home" && (
              <div className="dashboard__welcome">
                <p>Hi {currentUser.displayName}, Welcome to the CloudApp</p>

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
              {childFolders.map((childFolder) => (
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

          {childFolders.length > 0 && childFiles.length > 0 && <hr />}
          {childFolders.length >= 0 && childFiles.length > 0 && (
            <div className="w-100 mt-4">Files</div>
          )}

          {childFiles.length > 0 && (
            <div className="d-flex flex-wrap">
              {childFiles.map((childFile) => (
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
