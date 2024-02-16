import React from "react";
import { Container } from "@mui/material";

import NavBarInvestigator from "../../components/NavBarInvestigator/NavBarInvestigator";
import Copyright from "../../components/Copyright/Copyright";

import "./InvestigatorTemplate.css";

function InvestigatorTemplate({ children = "" }) {
  return (
    <span className="investigator-template">
      <NavBarInvestigator page={"analysis"} />
      <Container maxWidth="lg" sx={{ marginTop: "50px" }}>
        {children}
      </Container>
      <Copyright />
    </span>
  );
}

export default InvestigatorTemplate;
