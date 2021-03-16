import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useAuth } from "../../../contexts/AuthContext";
import "./sidebarOption.css";

function SidebarOption({ title, icon, event }) {
  const { globalDarkTheme } = useAuth();

  return (
    <>
    {event? "": ""}
      <div
        className={
          globalDarkTheme
            ? "sidebaroption sidebaroption__dark"
            : "sidebaroption sidebaroption__light"
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
