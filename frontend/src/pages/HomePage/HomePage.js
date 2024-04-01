import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

import "./HomePage.css";

function HomePage() {
  return (
    <div>
      <div>Home Page</div>
      <div>
        <Button component={Link} to="/register" variant="outlined">
          SingUp
        </Button>
      </div>
      <div>
        <Button component={Link} to="/login" variant="outlined">
          SignIn
        </Button>
      </div>
    </div>
  );
}

export default HomePage;
