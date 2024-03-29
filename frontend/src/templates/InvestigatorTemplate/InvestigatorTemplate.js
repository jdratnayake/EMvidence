import React from "react";
import { Container } from "@mui/material";

import NavBarInvestigator from "../../components/NavBarInvestigator/NavBarInvestigator";
import Copyright from "../../components/Copyright/Copyright";

import "./InvestigatorTemplate.css";
import { Box } from "@mui/system";

function InvestigatorTemplate({ children = "" }) {
  return (
    <span className="investigator-template">
      <Box sx={{ backgroundColor: "#EAECF0", paddingBottom: "0.5%" }}>
        <NavBarInvestigator page={"analysis"} />
        <Container maxWidth="lg" sx={{ marginTop: "50px" }}>
          {children}
        </Container>
        <Copyright />
      </Box>
    </span>
  );
}

export default InvestigatorTemplate;
