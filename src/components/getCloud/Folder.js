import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../contexts/AuthContext";

export default function Folder({ folder }) {
  const { globalDarkTheme } = useAuth();

  return (
    <Button
      to={{   
        pathname: `/folder/${folder.id}`,

        state: { folder: folder },
      }}
      // variant="outline-dark"
      variant={globalDarkTheme ? 'outline-light': 'outline-dark'}
      className="text-truncate w-100"
      as={Link}
    >
      <FontAwesomeIcon icon={faFolder} className="mr-2" />
      {folder.name}
    </Button>
  );
}
