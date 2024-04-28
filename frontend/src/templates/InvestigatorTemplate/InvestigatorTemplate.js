import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { useUser } from "../../contexts/UserContext";
import NavBarInvestigator from "../../components/NavBarInvestigator/NavBarInvestigator";
import NavBarDeveloper from "../../components/NavBarDeveloper/NavBarDeveloper";
import Copyright from "../../components/Copyright/Copyright";

import "./InvestigatorTemplate.css";
import { Box } from "@mui/system";

function InvestigatorTemplate({ children = "", pageName }) {
  const [userObject, setUserObject] = useState(null);

  const { user } = useUser();

  useEffect(() => {
    // Enable the query when the user object becomes available
    if (user) {
      setUserObject(user["userData"]);
    }
  }, [user]);

  return (
    <span className="investigator-template">
      <Box sx={{ backgroundColor: "#E8E8E8", paddingBottom: "0%" }}>
        {userObject?.user_type === "developer" && (
          <NavBarDeveloper pageName={pageName} />
        )}
        {userObject?.user_type === "investigator" && (
          <NavBarInvestigator pageName={pageName} />
        )}
        <Container maxWidth="lg" sx={{ marginTop: "50px", minHeight: "100vh" }}>
          {children}
        </Container>
      </Box>
      <Copyright />
    </span>
  );
}

export default InvestigatorTemplate;
