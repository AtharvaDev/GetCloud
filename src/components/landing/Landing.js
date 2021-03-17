import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div>
      Landing page...{" "}
      <Button as={Link} to="/login">
        login
      </Button>
    </div>
  );
}

export default Landing;
