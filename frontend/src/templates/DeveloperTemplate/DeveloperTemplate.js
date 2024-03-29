import React from "react";
import { Container } from "@mui/material";

import NavBarDeveloper from "../../components/NavBarDeveloper/NavBarDeveloper";
import Copyright from "../../components/Copyright/Copyright";

import "./DeveloperTemplate.css";

function DeveloperTemplate({ children = "" }) {
  return (
    <span className="developer-template">
      <NavBarDeveloper />
      <Container maxWidth="lg" sx={{ marginTop: "50px" }}>
        {children}
      </Container>
      <Copyright />
    </span>
  );
}

export default DeveloperTemplate;
