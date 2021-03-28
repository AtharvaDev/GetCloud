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
import "./sidebar.css";
import SidebarOption from "./SidebarOption";
import Storage from "./Storage";
import Recent from "../menuRecent/Recent";

function Sidebar() {
  const { globalDarkTheme } = useAuth();
  const { folderId } = useParams();
  const { state = {} } = useLocation();
  const { folder, childFolders, childFiles } = useFolder(
    folderId,
    state.folder
  );
  function homeLinkrefreshPage() {
    window.location.href = "/home";
  }

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

        <div className="sidebar__themebtn mt-2 mb-5">
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
            <Button
              // onClick={homeLinkrefreshPage}
              as={Link}
              to="/home"
              variant="none"
              className="m-0 p-0 w-100"
            >
              <SidebarOption title="Home" icon={faHome}></SidebarOption>
            </Button>
            <Button
              // onClick={Recent}
              as={Link}
              to="/recent"
              variant="none"
              className="m-0 p-0 w-100"
            >
              <SidebarOption title="Recent" icon={faClock}></SidebarOption>
            </Button>

            <Button
              as={Link}
              to="/stared"
              variant="none"
              className="m-0 p-0 w-100"
            >
              <SidebarOption title="Starred" icon={faStar}></SidebarOption>
            </Button>

            <SidebarOption title="Trash" icon={faTrash}></SidebarOption>
          </div>

          <hr
            className={
              globalDarkTheme ? "bg-light mr-2 w-100" : "bg-dark mr-2 w-100"
            }
          />

          <Storage />
        </div>
      </Navbar>
    </div>
  );
}

export default Sidebar;
