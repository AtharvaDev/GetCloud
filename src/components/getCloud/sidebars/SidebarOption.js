import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useLocation, useParams } from "react-router";
import { useAuth } from "../../../contexts/AuthContext";
import "./sidebarOption.css";

function SidebarOption({ title, icon, event }) {
  const { globalDarkTheme } = useAuth();
  const [location, setlocation] = useState("");

  let loc = useLocation();
  React.useEffect(() => {
    setlocation(loc.pathname);
  }, [loc]);
  // console.log(location)

  // var userClass = "sidebaroption sidebaroption__dark rounded p-2 mb-1";
  // if (location === "/user") {
  //   userClass += "sidebar__dark__active ";
  // }

  return (
    <>
      {event ? "" : ""}
      <div
        className={
          globalDarkTheme
            ? "sidebaroption sidebaroption__dark rounded p-2 mb-0"
            : "sidebaroption sidebaroption__light rounded p-2 mb-0 "
        }
      >
        <FontAwesomeIcon
          className="sidebaroption__img"
          icon={icon}
        ></FontAwesomeIcon>
        <h6 className="sidebaroption__txt ml-2">{title}</h6>
      </div>
    </>
  );
}

export default SidebarOption;
