import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function TextFile({ file }) {
  const { globalDarkTheme } = useAuth();

  function handleFileClick() {}
  return (
    <div
      id="show__shadow"
      className={
        globalDarkTheme
          ? "d-flex border border-light rounded"
          : "d-flex border border-dark rounded"
      }
    >
      <Button
        to={{
          pathname: `/document/${file.id}`,
        }}
        as={Link}
        onClick={handleFileClick}
        variant={globalDarkTheme ? "outline-light" : "outline-dark"}
        style={{ border: "none", outline: "none" }}
        className="d-flex w-100 align-items-center text-truncate"
      >
        <FontAwesomeIcon icon={faFile} className="mr-2" />
        <p className="text-truncate mb-0">{file.name}</p>
      </Button>
    </div>
  );
}

export default TextFile;
