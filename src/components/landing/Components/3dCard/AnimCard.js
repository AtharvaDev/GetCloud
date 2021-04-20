import React, { useEffect, useState } from "react";
import "./AnimCard.css";

function AnimCard({ logo, logo_type }) {
  const card = document.querySelector(".AnimCard__image");

  const [xAxis, setxAxis] = useState(0);
  const [yAxis, setyAxis] = useState(0);
  const [cardTrasnsition, setcardTrasnsition] = useState("none");
  const [titleTranslateZ, settitleTranslateZ] = useState("0");
  const [imageTranslateZ, setimageTranslateZ] = useState("0");
  //   console.log(xAxis, yAxis);
  // card && console.log(card.style.transform);

  return (
    <div style={{ perspective: "1000px" }}>
      <div
        onMouseMove={(e) => {
          setxAxis((window.innerWidth / 2 - e.pageX) / 25);
          setyAxis((window.innerWidth / 2 - e.pageY) / 25);
          //   console.log(window.innerWidth);
        }}
        onMouseEnter={(e) => {
          setcardTrasnsition("none");
          settitleTranslateZ("100px");
          setimageTranslateZ("150px");
        }}
        onMouseLeave={(e) => {
          setcardTrasnsition("all 0.5s ease");
          setxAxis(0);
          setyAxis(0);
          settitleTranslateZ("0px");
          setimageTranslateZ("0px");
        }}
        className="AnimCard__container"
      >
        <div
          className="AnimCard__card"
          style={{
            transform: `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`,
            transition: `${cardTrasnsition}`,
          }}
        >
          <div className="AnimCard__top">
            {/* <div className="AnimCard__circle"></div> */}
            <img
              className="AnimCard__image"
              src={logo}
              alt=""
              style={{ transform: `translateZ(${imageTranslateZ}) ` }}
            />
          </div>
          <div className="AnimCard__info">
            <h2
              className="title"
              style={{ transform: `translateZ(${titleTranslateZ})` }}
            >
              {logo_type}
            </h2>
            {/* <h3>Future Ready Project </h3> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnimCard;
