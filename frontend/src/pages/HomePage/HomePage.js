
import React from "react";
import { Link } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";

import "./HomePage.css";
import NavBar from "../../components/NavBar/NavBar";
import Copyright from "../../components/Copyright/Copyright";
import img1 from "../../resources/evidence.svg";
import img2 from "../../resources/security.svg";
import Box from "@mui/material/Box";
import { Container } from "@mui/system";

function HomePage() {



  return (
    <>
      <Box sx={{ backgroundColor: "#E8E8E8", minHeight: "88vh", paddingBottom: "0.5%", }}>
        <NavBar />
        <Container maxWidth="lg" sx={{ marginTop: "30px", maxWidth: "100vh" }}>
          <Box sx={{ display: "flex", maxHeight: "50vh" }}>
            <Grid container alignItems="left" flexDirection="column">
              <Grid item xs={12} sm={7} md={6} sx={{ maxWidth: "100%" ,backgroundColor:"" }}>
                <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "left", mt: 3 }}>
                  <Typography variant="h3"
                    sx={{
                      fontWeight: 2,
                      lineHeight: 1.0,
                      letterSpacing: 0.32,
                    }}>
                    Analyze Your Electromagnetic Data 
                  </Typography>
                  <Typography variant="h3"
                    sx={{
                      fontWeight: 2,
                      lineHeight: 1.0,
                      letterSpacing: 0.32,
                    }}>
                    with
                  </Typography>
                  <Typography variant="h2" sx={{ fontWeight: "bold", mt: 0, color: "#00245A", fontSize: "7rem", letterSpacing: ".1rem", }}>
                    EMvidence
                  </Typography>
                  <Typography variant="h6" sx={{ mt: 0, color: "grey", ml: 1, fontSize: "15px" }}>
                    EMvidence is a Forensics-as-a-Service (FaaS) platform, with distributed processing that incorporates
                    various plugins catering to different types of IoT devices, analysis techniques and techniques for
                    data pre-processing

                  </Typography>
                  <Button
                    component={Link} to="/register"
                    variant="contained"
                    sx={{
                      bgcolor: '#00245A', color: 'white', mt: 5, ml: 1, width: "200px", height: "50px",
                      '&:hover': {
                        backgroundColor: 'rgba(0, 36, 90, 0.8)', // Change to the desired hover color
                      },
                    }}
                  >
                    Sign Up for free
                  </Button>
                </Box>


              </Grid>
              <Grid item xs={12} sm={7} md={7} sx={{ bgcolor: "" }}>
                <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "left", alignItems: "center" }}>
                  <img src={img1}
                    className="evience" alt="not found"
                    width="550x"
                    height="500px"
                    style={{ marginLeft: "50px" }}

                  />

                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
      <Copyright />
    </>


  );
}

export default HomePage;
