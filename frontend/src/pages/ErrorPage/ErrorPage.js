import React from "react";
import { Link } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import img from "../../resources/error.svg";
import logo from "../../resources/logo8.png";
import "./ErrorPage.css";

function ErrorPage() {
  return (
    <div className="errorPage">
      <div>
        <img src={img} className="errorImg" alt="not found" />
        <h3 className="errorTopic">Oh! Page not found</h3>
        <p className="errorDescription">
          {" "}
          We can't seem to find page you're looking for
        </p>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 0,
          }}
        >
          <Box
            component="img"
            sx={{
              height: 75,
              width: 75,
              marginBottom: 2,
              backgroundColor: "#00245A",
              mt: 2,
              p: 2
            }}
            src={logo}
          />
    
          <Link to="/" className="errorTag" style={{color:'#00245A', marginLeft: '25px', fontSize: '20px'}} 
          onMouseEnter={(e) => e.target.style.color = 'rgba(0, 36, 90, 0.8)'}
          onMouseLeave={(e) => e.target.style.color = '#00245A'}>
            Back to Home
          </Link>
         
          
        </Box>

      </div>
    </div>
  );
}

export default ErrorPage;
