import React from "react";
import { Alert, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div>
      Landing page...{" "}
      <Alert variant="success">
        <p> current deployment version 4.8</p>
        changelog 4.8 <br></br>
         1. Added Stared Menu <br></br>
         2. Added Rename Menu <br></br>
         3. Animations fixed <br></br>
         4. Profile Loading fixed <br></br>
         5. Used Storage fixed<br></br>
         6. search menu added
      </Alert>
      <Button as={Link} to="/login">
        login
      </Button>
    </div>
  );
}

export default Landing;
