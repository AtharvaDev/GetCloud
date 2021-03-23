import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { ROOT_FOLDER } from "../../hooks/useFolder";

export default function FolderBreadcrumbs({ currentFolder }) {
  const { globalDarkTheme } = useAuth();

  let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER];
  if (currentFolder) path = [...path, ...currentFolder.path];
 

  

  return (
    <div className="w-100">
      <Breadcrumb
        className="flex-grow-1"
        listProps={{
          className: globalDarkTheme
            ? "bg-transparent p-0 m-1"
            : "bg-transparent p-0 m-1",
        }}
      >
        {/* {console.log(path)} */}
        {path.map((folder, index) => (
          <Breadcrumb.Item
            key={folder.id}
            linkAs={Link}
            linkProps={{
              to: {
                pathname: folder.id ? `/folder/${folder.id}` : "/home",
                state: { folder: { ...folder, path: path.slice(1, index) } },
              },
            }}
            className="text-truncate d-inline-block"
            style={{ maxWidth: "150px" }}
          >
            {folder.name}
          </Breadcrumb.Item>
        ))}
        {currentFolder && (
          <Breadcrumb.Item
            className="text-truncate d-inline-block"
            style={{ maxWidth: "200px" }}
            active
          >
            {currentFolder.name === "Home" ? "" : currentFolder.name}
            {/* {currentFolder.name} */}
          </Breadcrumb.Item>
        )}
      </Breadcrumb>
    </div>
  );
}
