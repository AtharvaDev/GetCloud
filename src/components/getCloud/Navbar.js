import { faIcons, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Form, FormControl, InputGroup, Nav, Navbar } from "react-bootstrap";
import Draggable from "react-draggable";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useAuth } from "../../contexts/AuthContext";
import ChangeMode from "../theme/ChangeMode";
import "./navbar.css";
import Search from "./Search";
import VoiceEnabled from "./voiceEnabled/VoiceEnabled";

function NavbarComponent() {
  const { globalDarkTheme, currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  var x = window.matchMedia("(max-width: 700px)");

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
        <Search />
        <>
          <div
            className="position-absolute resp__voiceEnabled"
            style={{ zIndex: "100", display: "none" }}
          >
            <VoiceEnabled />
          </div>
        </>

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
