import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";

import React from "react";
import { useAuth } from "../../contexts/AuthContext";

export default function File({ file }) {
  const { globalDarkTheme } = useAuth();

  return (
    <a
      href={file.url}
      target="_blank"
      //   className="btn btn-outline-dark text-truncate w-100"
      className={
        globalDarkTheme
          ? "btn btn-outline-light text-truncate w-100"
          : "btn btn-outline-dark text-truncate w-100"
      }
    >
      <FontAwesomeIcon icon={faFile} className="mr-2" />
      {file.name}
    </a>
  );
}
