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
import React, { useState } from "react";
import { Navbar } from "react-bootstrap";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { useFolder } from "../../../hooks/useFolder";
import ChangeMode from "../../theme/ChangeMode";
import AddFileBtn from "../AddFileBtn";
import AddFolderBtn from "../AddFolderBtn";
import "./sidebar.css";
import SidebarOption from "./SidebarOption";
import Storage from "./Storage";
import Recent from "../menuRecent/Recent";
import VoiceEnabled from "../voiceEnabled/VoiceEnabled";
import Draggable from "react-draggable";
import logo from "../../icons/logo1.png";

function Sidebar() {
  const { globalDarkTheme } = useAuth();
  const { folderId } = useParams();
  const { state = {} } = useLocation();
  const [location, setlocation] = useState("");

  let loc = useLocation();
  React.useEffect(() => {
    setlocation(loc.pathname);
  }, [loc]);

  var userClass = "m-0 p-0 w-100 ";
  if (location === "/user" || location === "/update-profile") {
    userClass += "sidebar__dark__active ";
  }

  var homeClass = "m-0 p-0 w-100 ";
  if (location === "/home") {
    homeClass += "sidebar__dark__active ";
  }

  var recentClass = "m-0 p-0 w-100 ";
  if (location === "/recent") {
    recentClass += "sidebar__dark__active ";
  }

  var staredClass = "m-0 p-0 w-100 ";
  if (location === "/stared") {
    staredClass += "sidebar__dark__active ";
  }

  var trashClass = "m-0 p-0 w-100 ";
  if (location === "/trash") {
    trashClass += "sidebar__dark__active ";
  }

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
      <Draggable>
        <div className="position-absolute desktop__voiceEnabled" style={{ zIndex: "100" }}>
          <VoiceEnabled />
        </div>
      </Draggable>
      <Navbar className="flex-column" expand="lg">
        {/* // old logo */}
        {/* <img
          className="sidebar__logo mt-1"
          src={
            globalDarkTheme
              ? "https://2c2hs846t9613xujn610ygkw-wpengine.netdna-ssl.com/wp-content/uploads/2019/07/cloudapp-white.png"
              : "https://assets-global.website-files.com/58e32bace1998d6e3fee8d71/5fa2ea3ef95fbd1a1821e968_brand-lockup-horizontal-white-bg.svg"
          }
        /> */}

        {/* // new logo */}
        <img className="sidebar__logo mt-1" src={logo} alt="" />

        <div className="sidebar__themebtn mt-3 mb-4">
          <ChangeMode />
        </div>

        <div className="sidebar__largeScreen">
          <div className="">
            <Nav.Item>
              <AddFolderBtn currentFolder={folder}></AddFolderBtn>
            </Nav.Item>

            <Nav.Item>
              <AddFileBtn currentFolder={folder}></AddFileBtn>
            </Nav.Item>

            <>
              <Nav.Item>
                <Nav.Link
                  as={Link}
                  to="/user"
                  variant="none"
                  className={userClass}
                >
                  <SidebarOption
                    title="Profile"
                    icon={faUserCircle}
                  ></SidebarOption>
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link
                  // onClick={homeLinkrefreshPage}
                  as={Link}
                  to="/home"
                  variant="none"
                  className={homeClass}
                >
                  <SidebarOption title="Home" icon={faHome}></SidebarOption>
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link
                  // onClick={Recent}
                  as={Link}
                  activeClassName="sidebar__active"
                  to="/recent"
                  variant="none"
                  className={recentClass}
                >
                  <SidebarOption title="Recent" icon={faClock}></SidebarOption>
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link
                  as={Link}
                  activeClassName="sidebar__active"
                  to="/stared"
                  variant="none"
                  className={staredClass}
                >
                  <SidebarOption title="Starred" icon={faStar}></SidebarOption>
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link
                  activeClassName="sidebar__active"
                  as={Link}
                  to="/trash"
                  variant="none"
                  className={trashClass}
                >
                  <SidebarOption title="Trash" icon={faTrash}></SidebarOption>
                </Nav.Link>
              </Nav.Item>
            </>
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
