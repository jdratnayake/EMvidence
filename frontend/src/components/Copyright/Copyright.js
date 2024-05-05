import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import "./Copyright.css";

function Copyright() {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        display: "flex",
        justifyContent: "center",
        boxShadow: 8,
        alignItems: "center",
      }}
    >
      <Typography
        variant="body2"
        color="grey"
        align="center"
        sx={{ mt: 4, mb: 5 }}
      >
        {"Copyright © "}
        <Link color="inherit" to="/" style={{ color: "grey" }}>
          EMvidence
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
}

export default Copyright;
