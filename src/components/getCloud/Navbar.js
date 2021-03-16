import { faIcons, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Form, FormControl, InputGroup, Nav, Navbar } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import ChangeMode from "../theme/ChangeMode";
import "./navbar.css";

function NavbarComponent() {
  const { globalDarkTheme } = useAuth();

  return (
    <>
      <div
        className={
          globalDarkTheme
            ? "bg-transparent text-light pt-10"
            : "bg-transparent text-dark pt-10"
        }
      >
        <Navbar>
          <Nav>
            {/* <ChangeMode /> */}
          </Nav>
          <Nav>
            {/* <Nav.Link as={Link} to="/user">
                    Profile
                </Nav.Link> */}

            <div
              className={
                globalDarkTheme
                  ? "Navbar__Search bg-dark"
                  : "Navbar__Search bg-light"
              }
            >
              <FontAwesomeIcon
                className=""
                icon={faSearch}
                size="lg"
              ></FontAwesomeIcon>

              <input
                className={
                  globalDarkTheme
                    ? "Navbar__Search__input text-light"
                    : "Navbar__Search__input text-dark"
                }
                placeholder="Search"
              />
            </div>
          </Nav>
        </Navbar>
      </div>
    </>
  );
}

export default NavbarComponent;
