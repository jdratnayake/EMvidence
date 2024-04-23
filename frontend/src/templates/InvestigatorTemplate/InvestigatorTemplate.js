import React from "react";
import { Container } from "@mui/material";

import NavBarInvestigator from "../../components/NavBarInvestigator/NavBarInvestigator";
import Copyright from "../../components/Copyright/Copyright";

import "./InvestigatorTemplate.css";
import { Box } from "@mui/system";

function InvestigatorTemplate({ children = "" }) {
  return (
    <span className="investigator-template" >
      <Box sx={{ backgroundColor: "#E8E8E8", paddingBottom: "0%" }}>
        <NavBarInvestigator page={"analysis"} />
        <Container maxWidth="lg" sx={{ marginTop: "50px", minHeight: '100vh'  }}>
          {children}
        </Container>
      </Box>
      <Copyright />
    </span>
  );
}

export default InvestigatorTemplate;
