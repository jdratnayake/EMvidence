
import React from "react";
import { Link } from "react-router-dom";
import { Button , Grid, Typography} from "@mui/material";

import "./HomePage.css";
import NavBar from "../../components/NavBar/NavBar";
import Copyright from "../../components/Copyright/Copyright";
import img1 from "../../resources/evidence.svg";
import img2 from "../../resources/security.svg";
import Box from "@mui/material/Box";
import { Container} from "@mui/system";

function HomePage() {



  return (
 
    <span className="homepage">
    <Box sx={{ backgroundColor: "#E8E8E8", paddingBottom: "0.5%", maxWidth:"1000vh" }}>
    <NavBar />
    <Container maxWidth="lg" sx={{ marginTop: "50px", minHeight: "100vh", maxWidth:"100vh" }}>
        <Box  sx={{display: "flex", maxHeight: "50vh"}}>
          <Grid container alignItems="left"  flexDirection="column">
            <Grid item xs={12} md={6} sx={{bgcolor:"",maxWidth:"1000px"}}>
              <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"left", mt:5}}>
                <Typography variant="h2" 
                  sx={{fontWeight:2,  
                       lineHeight: 1.0,
                       letterSpacing: 0.32,
                      }}>
                  Analyze Your Digital Evidence with 
                </Typography>
                <Typography variant="h1" sx={{fontWeight:"bold", mt:3, color:"#00245A", fontSize: "7rem"}}>
                 EMvidence
                </Typography>
                <Typography variant="h6" sx={{mt:3, color:"grey", ml:1, fontSize: "15px"}}>
                Forensics-as-a-Service (FaaS) model, which is a system with distributed processing that incorporates
                various plugins catering to different types of IoT devices, analysis techniques and techniques for 
                data pre-processing

                </Typography>
                <Button
                    component={Link} to="/register"
                     variant="contained"
                     sx={{
                       bgcolor: '#00245A', color: 'white', mt: 5, ml: 1, width: "200px", height:"50px",
                       '&:hover': {
                         backgroundColor: 'rgba(0, 36, 90, 0.8)', // Change to the desired hover color
                       },
                     }}
                    >
                   Sign Up for free 
              </Button>
              </Box>
             
            
            </Grid>
            <Grid item xs={12} md={6} sx={{bgcolor:""}}>
              <Box sx={{display:"flex", flexDirection:"column", mt: "-30px"}}>

                  </Box>
                    <img src={img1} 
                    className="evience" alt="not found"  
                    width="600px"
                    height="600px" 
                    style={{marginLeft: "50px"}}
                  
                    />

                  
             </Grid>
          </Grid>
        </Box>  
    </Container>
    </Box>
    <Copyright />
    </span> 
  
   
  );
}

export default HomePage;



// import React from "react";
// import { Link } from "react-router-dom";
// import { Button } from "@mui/material";

// import "./HomePage.css";
// import NavBar from "../../components/NavBar/NavBar";
// import Copyright from "../../components/Copyright/Copyright";
// import Box from "@mui/material/Box";
// import { Container} from "@mui/system";

// function HomePage() {
//   return 
//   (
//     <div>
//       <div>Home Page</div>
//       <div>
//         <Button component={Link} to="/register" variant="outlined">
//           SingUp
//         </Button>
//       </div>
//       <div>
//         <Button component={Link} to="/login" variant="outlined">
//           SignIn
//         </Button>
//       </div>
//     </div>
  //   // <span className="homepage">
  //   //   <Box sx={{ backgroundColor: "#E8E8E8", paddingBottom: "0.5%" }}>
  //   //     <NavBar />
  //   //     <Container maxWidth="lg" sx={{ marginTop: "50px", minHeight: "90vh" }}>
          
  //   //     </Container>
  //   //     <Copyright />
  //   //   </Box>
  //   // </span>
  // );
// }

// export default HomePage;
