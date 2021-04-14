import { faArrowCircleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./HeadSection.css";

const HeadSection = ({
  title,
  desc,
  backgroundImg,
  leftBtnTxt,
  leftBtnLink,
  twoBtns,
  first,
}) => {
  return (
    <div
      className="HeadSection"
      style={
        {
          // backgroundImage: `url(${backgroundImg})`,
        }
      }
    >
      <div className="HeadSection__container">
        <div className="HeadSection__text">
          <p>{title}</p>
          <div className="HeadSection__textDesc">
            <p>{desc}</p>
          </div>
        </div>
        <div className="HeadSection__lower">
          {/* {console.log(twoBtns)} */}
          {twoBtns === "true" && (
            <div className="HeadSection__buttons">
              <Button className="yellow_airplane" as={Link} to={leftBtnLink}>
                {leftBtnTxt}
              </Button>
            </div>
          )}
        </div>
        {first && (
          <div className="HeadSection__expand">
            <FontAwesomeIcon icon={faArrowCircleDown}></FontAwesomeIcon>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeadSection;
