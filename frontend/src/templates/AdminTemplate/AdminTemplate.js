import React from "react";
import { Container } from "@mui/material";

import NavBarAdmin from "../../components/NavBarAdmin/NavBarAdmin";
import Copyright from "../../components/Copyright/Copyright";

import "./AdminTemplate.css";
import { Box } from "@mui/system";

function AdminTemplate({ children = "", pageName }) {
  return (
    <span className="admin-template">
      <Box sx={{ backgroundColor: "#E8E8E8", paddingBottom: "5%" }}>
        <NavBarAdmin pageName={pageName} />
        <Container maxWidth="lg" sx={{ marginTop: "50px", minHeight: "90vh" }}>
          {children}
        </Container>
      </Box>
      <Copyright />
    </span>
  );
}

export default AdminTemplate;
