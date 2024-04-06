import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import "./Copyright.css";

function Copyright() {
  return (
    <Box sx={{ 
      backgroundColor: "white",
       display:"flex", 
       justifyContent: "center", 
       boxShadow:8 ,
       backgroundColor: "#FFFFFF",
       color: "#000000",
       alignItems: "center", }}>
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{ mt: 4, mb: 5 }}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://www.google.com/">
        EMvidence
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
    </Box>
  );
}

export default Copyright;
