import React from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router"
import { useFolder } from "../../hooks/useFolder";
import AddFolderBtn from "./AddFolderBtn";
import Folder from "./Folder";
import FolderBreadcrumbs from "./FolderBreadcrumbs";
import NavbarComponent from "./Navbar";

export default function Dashboard() {
  const { folderId } = useParams()
  const { folder, childFolders } = useFolder(folderId);
  console.log(folderId);
  return (
    <div>
      <NavbarComponent></NavbarComponent>
      <Container fluid> 
      <div className="d-flex align-items-center">
        <FolderBreadcrumbs currentFolder={folder}></FolderBreadcrumbs>
      </div>
        <AddFolderBtn currentFolder={folder}></AddFolderBtn>
        {childFolders.length > 0 && (
          <div className="d-flex flex-wrap">
            <div className="w-100 mt-4">Folders</div>
            {childFolders.map((childFolder) => (
              <div
                key={childFolder.id}
                style={{ width: "250px" }}
                className="p-2"
              >
                <Folder folder={childFolder} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
