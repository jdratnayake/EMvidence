import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import NavBarAdmin from "../../components/NavBarAdmin/NavBarAdmin";
import NavBarDeveloper from "../../components/NavBarDeveloper/NavBarDeveloper";
import Copyright from "../../components/Copyright/Copyright";
import { useUser } from "../../contexts/UserContext";
import "./AdminTemplate.css";
import { Box } from "@mui/system";

function AdminTemplate({ children = "", pageName }) {
  const [userObject, setUserObject] = useState(null);

  const { user } = useUser();

  useEffect(() => {
    // Enable the query when the user object becomes available
    if (user) {
      setUserObject(user["userData"]);
    }
  }, [user]);

  return (
    <span className="admin-template">
      <Box sx={{ backgroundColor: "#E8E8E8", paddingBottom: "5%" }}>
        {userObject?.user_type === "developer" && (
          <NavBarDeveloper pageName={pageName} />
        )}
        {userObject?.user_type === "admin" && (
          <NavBarAdmin pageName={pageName} />
        )}

        <Container maxWidth="lg" sx={{ marginTop: "50px", minHeight: "90vh" }}>
          {children}
        </Container>
      </Box>
      <Copyright />
    </span>
  );
}

export default AdminTemplate;
