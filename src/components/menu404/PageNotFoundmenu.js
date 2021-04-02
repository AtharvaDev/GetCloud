import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import "./PageNotFoundmenu.scss";
// import Parallax from "react-spring/renderprops-addons";

function PageNotFoundmenu() {
  useEffect(() => {
    const Parallax = require("parallax-js");
    var scene = document.getElementById("scene");
    var parallax = new Parallax(scene);
  }, []);

  return (
    <div>
      <section className="wrapper">
        <div className="container">
          <div id="scene" className="scene" data-hover-only="false">
            <div className="circle" data-depth="1.2"></div>

            <div className="one" data-depth="0.9">
              <div className="content">
                <span className="piece"></span>
                <span className="piece"></span>
                <span className="piece"></span>
              </div>
            </div>

            <div className="two" data-depth="0.60">
              <div className="content">
                <span className="piece"></span>
                <span className="piece"></span>
                <span className="piece"></span>
              </div>
            </div>

            <div className="three" data-depth="0.40">
              <div className="content">
                <span className="piece"></span>
                <span className="piece"></span>
                <span className="piece"></span>
              </div>
            </div>

            <p className="p404" data-depth="0.50">
              <PageNotFound />
            </p>
            <p className="p404" data-depth="0.10">
              <PageNotFound />
            </p>
          </div>

          <div className="text">
            <article>
              <p>
                Uh oh! Looks like you got lost. <br></br>Go back to the homepage
              </p>
              <Button
                variant="light"
                className="rounded-pill"
                as={Link}
                to="/home"
              >
                <button>i dare!</button>
              </Button>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PageNotFoundmenu;
