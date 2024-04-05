import React from "react";
import { Container, Box } from "@mui/material";

import NavBarDeveloper from "../../components/NavBarDeveloper/NavBarDeveloper";
import Copyright from "../../components/Copyright/Copyright";

import "./DeveloperTemplate.css";

function DeveloperTemplate({ children = "" }) {
  return (
    <span className="developer-template" style={{minHeight: 400}}>
      <Box sx={{ backgroundColor: "#E8E8E8", paddingBottom: "1%" }}>
        <NavBarDeveloper />
        <Container maxWidth="lg" sx={{ marginTop: "50px", minHeight: '100vh'  }}>
          {children}
        </Container>
        <Copyright />
      </Box>
    </span>
  );
}

export default DeveloperTemplate;
