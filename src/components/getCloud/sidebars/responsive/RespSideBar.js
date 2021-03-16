import "./respSideBar.css";
import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import Sidebar from "../Sidebar";
import { useAuth } from "../../../../contexts/AuthContext";
import ChangeMode from "../../../theme/ChangeMode";

function RespSideBar() {
  const { globalDarkTheme } = useAuth();

  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        variant={globalDarkTheme ? "dark" : "light"}
      >
        <Navbar.Brand href="#home">
          <img
            className="respSidebar__logo mt-1"
            src={
              globalDarkTheme
                ? "https://2c2hs846t9613xujn610ygkw-wpengine.netdna-ssl.com/wp-content/uploads/2019/07/cloudapp-white.png"
                : "https://assets-global.website-files.com/58e32bace1998d6e3fee8d71/5fa2ea3ef95fbd1a1821e968_brand-lockup-horizontal-white-bg.svg"
            }
            alt=""
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="">
            <Sidebar />
          </Nav>
          <div className="sidebar__themebtn mt-2 mb-3">
          </div>
        </Navbar.Collapse>
      </Navbar>

    </div>
  );
}

export default RespSideBar;
