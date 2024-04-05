import React from "react";
import { Container } from "@mui/material";

import NavBarAdmin from "../../components/NavBarAdmin/NavBarAdmin";
import Copyright from "../../components/Copyright/Copyright";

import "./AdminTemplate.css";
import { Box } from "@mui/system";

function AdminTemplate({ children = "" }) {
  return (
    <span className="admin-template">
      <Box sx={{ backgroundColor: "#E8E8E8", paddingBottom: "0.5%" }}>
        <NavBarAdmin />
        <Container maxWidth="lg" sx={{ marginTop: "50px", minHeight: "90vh" }}>
          {children}
        </Container>
        <Copyright />
      </Box>
    </span>
  );
}

export default AdminTemplate;
