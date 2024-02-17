import React from "react";
import { Container } from "@mui/material";

import NavBarAdmin from "../../components/NavBarAdmin/NavBarAdmin";
import Copyright from "../../components/Copyright/Copyright";

import "./AdminTemplate.css";

function AdminTemplate({ children = "" }) {
  return (
    <span className="admin-template">
      <NavBarAdmin />
      <Container maxWidth="lg" sx={{ marginTop: "50px" }}>
        {children}
      </Container>
      <Copyright />
    </span>
  );
}

export default AdminTemplate;
