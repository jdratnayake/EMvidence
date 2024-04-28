import React from "react";
import { Container, Box } from "@mui/material";

import NavBarDeveloper from "../../components/NavBarDeveloper/NavBarDeveloper";
import Copyright from "../../components/Copyright/Copyright";

import "./DeveloperTemplate.css";

function DeveloperTemplate({ children = "", pageName }) {
  return (
    <span className="developer-template" style={{ minHeight: 400 }}>
      <Box sx={{ backgroundColor: "#E8E8E8", paddingBottom: "5%" }}>
        <NavBarDeveloper pageName={pageName} />
        <Container maxWidth="lg" sx={{ marginTop: "50px", minHeight: "90vh" }}>
          {children}
        </Container>
      </Box>
      <Copyright />
    </span>
  );
}

export default DeveloperTemplate;
