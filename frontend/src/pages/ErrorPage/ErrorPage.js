import React from "react";
import { Link } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import img from "../../resources/error.jpg";
import logo from "../../resources/logo-blue.png";
import "./ErrorPage.css";

function ErrorPage() {
  return (
    <div className="errorPage">
      <div style={{ marginTop: "60px" }}>
        <Typography
          variant="h2"
          fontFamily="roboto"
          fontWeight="bold"
          sx={{ color: '#00245A' }}>
          Oops! Page not found
          </Typography>
        <Box
          component="img"
          sx={{
            height: 300,
            width: 800,
            mb: 1,
            mt: 2
          }}
          src={img}
        />
        {/* <img src={img} className="errorImg" alt="not found" /> */}
        <Typography
          variant="h6"
          fontFamily="roboto"
          sx={{ color: '#00245A' }}>
           We can't seem to find page you're looking for
          </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 0,
            mt:2

          }}
        >
          <Box
            component="img"
            sx={{
              height: 100,
              width: 100,
              mb: 1
            }}
            src={logo}
          />

          <Link to="/" className="errorTag" style={{ color: '#00245A', fontSize: '15px' }}
            onMouseEnter={(e) => e.target.style.color = 'rgba(0, 36, 90, 0.5)'}
            onMouseLeave={(e) => e.target.style.color = '#00245A'}>
            Back to Home
          </Link>


        </Box>

      </div>
    </div>
  );
}

export default ErrorPage;
