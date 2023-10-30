import React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import "./Copyright.css";

function Copyright() {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{ mt: 8, mb: 4 }}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://www.google.com/">
        EMvidence
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default Copyright;
