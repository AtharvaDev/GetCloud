import {
  faClock,
  faCloud,
  faHome,
  faStar,
  faTrash,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Nav } from "react-bootstrap";
import React from "react";
import { Navbar } from "react-bootstrap";
import { Link, useLocation, useParams } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { useFolder } from "../../../hooks/useFolder";
import ChangeMode from "../../theme/ChangeMode";
import AddFileBtn from "../AddFileBtn";
import AddFolderBtn from "../AddFolderBtn";
import sidebar from "./sidebar.css";
import SidebarOption from "./SidebarOption";

function Sidebar() {
  const { globalDarkTheme } = useAuth();

  const { folderId } = useParams();
  const { state = {} } = useLocation();
  const { folder, childFolders, childFiles } = useFolder(
    folderId,
    state.folder
  );

  return (
    <div
      className={
        globalDarkTheme ? "sidebar sidebar__dark" : "sidebar sidebar__light"
      }
    >
      <Navbar className="flex-column" expand="lg">
        <img
          className="sidebar__logo mt-1"
          src={
            globalDarkTheme
              ? "https://2c2hs846t9613xujn610ygkw-wpengine.netdna-ssl.com/wp-content/uploads/2019/07/cloudapp-white.png"
              : "https://assets-global.website-files.com/58e32bace1998d6e3fee8d71/5fa2ea3ef95fbd1a1821e968_brand-lockup-horizontal-white-bg.svg"
          }
          alt=""
        />

        <div className="sidebar__themebtn mt-2 mb-3">
          <ChangeMode />
        </div>

        <div className="">
          <div className="">
            <AddFolderBtn currentFolder={folder}></AddFolderBtn>
            <AddFileBtn currentFolder={folder}></AddFileBtn>
            <Button
              as={Link}
              to="/user"
              variant="none"
              className="m-0 p-0 w-100"
            >
              <SidebarOption
                title="Profile"
                icon={faUserCircle}
              ></SidebarOption>
            </Button>
            <SidebarOption title="Home" icon={faHome}></SidebarOption>
            <SidebarOption title="Recent" icon={faClock}></SidebarOption>
            <SidebarOption title="Starred" icon={faStar}></SidebarOption>
            <SidebarOption title="Trash" icon={faTrash}></SidebarOption>
          </div>

          <hr
            className={
              globalDarkTheme ? "bg-light mr-2 w-100" : "bg-dark mr-2 w-100"
            }
          />
          <SidebarOption title="Storage:" icon={faCloud}></SidebarOption>
          <p className="">1.2 GB of 20 GB used</p>
        </div>
      </Navbar>
    </div>
  );
}

export default Sidebar;