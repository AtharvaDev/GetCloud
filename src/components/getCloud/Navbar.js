import { faIcons, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Form, FormControl, InputGroup, Nav, Navbar } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useAuth } from "../../contexts/AuthContext";
import ChangeMode from "../theme/ChangeMode";
import "./navbar.css";

function NavbarComponent() {
  const { globalDarkTheme, currentUser } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <>
      <div
        className={
          globalDarkTheme
            ? "NavbarComponent bg-transparent text-light pt-10"
            : "NavbarComponent bg-transparent text-dark pt-10"
        }
      >
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

        {loading === true ? (
          <SkeletonTheme
            color={globalDarkTheme ? "#202020" : ""}
            highlightColor="#444"
          >
            <div className="">
              <Skeleton count={1} />
              <Skeleton count={1} height={100} />
            </div>
          </SkeletonTheme>
        ) : (
          <div className="navbar__userData">
            <img
              className="navbar__userData__profileUrl rounded-circle"
              src={currentUser.photoURL}
            ></img>
            <div className="navbar__userData__name">
              {currentUser.displayName
                ? currentUser.displayName
                : "username not found"}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default NavbarComponent;
