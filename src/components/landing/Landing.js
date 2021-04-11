import React from "react";
import { Alert, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div>
      
      Landing page...{" "}
      <Alert variant="success">
        <p> current deployment version 5.2</p>
        changelog 5.2 <br></br>
        1. Added trash Menu <br></br>
        2. Voice Rename <br></br>
        3. Voice Navigation added <br></br>
        4. Firebase reads/ writes reduced from 9.9k to 5.3k (wrt 29March)
        {/* 1. Added Stared Menu <br></br>
         2. Added Rename Menu <br></br>
         3. Animations fixed <br></br>
         4. Profile Loading fixed <br></br>
         5. Used Storage fixed<br></br>
         6. search menu added */}
      </Alert>
      <Button as={Link} to="/login">
        login
      </Button>
    </div>
  );
}

export default Landing;
