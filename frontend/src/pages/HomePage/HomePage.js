
import React from "react";
import { Link } from "react-router-dom";
import { Button , Grid} from "@mui/material";

import "./HomePage.css";
import NavBar from "../../components/NavBar/NavBar";
import Copyright from "../../components/Copyright/Copyright";
import img from "../../resources/error.svg";
import Box from "@mui/material/Box";
import { Container} from "@mui/system";

function HomePage() {



  return (
 
    <span className="homepage">
    <Box sx={{ backgroundColor: "#E8E8E8", paddingBottom: "0.5%" }}>
    <NavBar />
    <Container maxWidth="lg" sx={{ marginTop: "50px", minHeight: "100vh" }}>
        <Box  sx={{display: "flex",}}>
          <Grid container alignItems="center" justifyContent="center" flexDirection="column">
            <Grid item xs={12} md={12} sx={{bgcolor:"white"}}>
            <img src={img} className="errorImg" alt="not found" />
            </Grid>
            <Grid item xs={12} md={12} sx={{bgcolor:"red"}}>
            <p>test</p>
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
