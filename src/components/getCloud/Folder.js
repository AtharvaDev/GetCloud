import React from "react";
import { Link } from "react-router-dom";
import { Button, DropdownButton } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEllipsisV,
  faFolder,
  faHelicopter,
  faRecycle,
  faStar,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../contexts/AuthContext";
import { Dropdown } from "react-bootstrap";

export default function Folder({ folder }) {
  const { globalDarkTheme } = useAuth();

  return (
    <div
      className={
        globalDarkTheme
          ? "d-flex border border-light rounded"
          : "d-flex border border-dark rounded"
      }
    >
      <Button
        to={{
          pathname: `/folder/${folder.id}`,

          state: { folder: folder },
        }}
        // variant="outline-dark"
        variant={globalDarkTheme ? "outline-light" : "outline-dark"}
        style={{ border: "none", outline: "none" }}
        className="text-truncate  w-100"
        as={Link}
      >
        <div className="d-flex align-items-center justify-content-between">
          <div className="">
            <FontAwesomeIcon icon={faFolder} className="mr-2" />
            {folder.name}
          </div>
          <div className=""></div>
        </div>
      </Button>
      <Dropdown
        style={{ border: "none", outline: "none", borderRadius: "100%" }}
        variant={globalDarkTheme ? "outline-light" : "outline-dark"}
      >
        <Dropdown.Toggle
          variant="none"
          style={
            globalDarkTheme
              ? { border: "none", outline: "none", color: "white" }
              : { border: "none", outline: "none", color: "black" }
          }

          // style={{ border: "none", outline: "none" }}
        >
          <Dropdown.Menu
            className={
              globalDarkTheme ? "bg-dark text-white" : "bg-light text-dark"
            }
          >
            <Dropdown.Item
              href="#/action-1"
              className={
                globalDarkTheme ? "bg-dark text-white" : "bg-light text-dark"
              }
            >
              <FontAwesomeIcon icon={faEdit} className="mr-2" />
              Rename
            </Dropdown.Item>
            <Dropdown.Item
              href="#/action-2"
              className={
                globalDarkTheme ? "bg-dark text-white" : "bg-light text-dark"
              }
            >
              <FontAwesomeIcon icon={faStar} className="mr-2" />
              Add to Starred
            </Dropdown.Item>
            <Dropdown.Divider />

            <Dropdown.Item
              href="#/action-3"
              className={
                globalDarkTheme ? "bg-dark text-white" : "bg-light text-dark"
              }
            >
              <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
              Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Toggle>
      </Dropdown>
    </div>
  );
}
