import React from "react";
import "./SplitSection.css";

function SplitSection() {
  return (
    <div className="SplitSection" style={{}}>
      <div className="SplitSection__container">
        <div className="SplitSection__text">
          <p>Title</p>
          <div className="SplitSection__textDesc">
            <p>desc</p>
          </div>
        </div>
        <div className="SplitSection__lower">
          <div className="SplitSection__buttons"></div>
        </div>
      </div>
    </div>
  );
}

export default SplitSection;
