import React from "react";
import Particles from "react-particles-js";

function Test() {
  return (
    <div>
      <Particles
        params={{
          particles: {
            color: {
              value: "#000000",
            },
            line_linked: {
              color: {
                value: "#000000",
              },
            },
            number: {
              value: 50,
            },
            size: {
              value: 3,
            },
          },
        }}
      />
    </div>
  );
}

export default Test;
