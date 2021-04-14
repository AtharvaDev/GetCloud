import React from "react";
import Lottie from "react-lottie";

export default function LottieAnimation({ lotti, width, height, speed }) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: lotti,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid meet",
    },
  };

  return (
    <>
      <Lottie options={defaultOptions} height={height} width={width} speed={speed} />
    </>
  );
}
