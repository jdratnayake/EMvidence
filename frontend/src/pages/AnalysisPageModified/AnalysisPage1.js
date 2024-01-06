import React from "react";
import { ToastContainer } from "react-toastify";
import NavBar from "../../components/NavBar";
import { Box, Container, CssBaseline, Typography } from "@mui/material";
import { styled } from "@mui/system";

const ComponentOuter = styled(Container)(() => ({
  marginTop: "50px",
}));

const StepperBox = styled(Box)(() => ({
    backgroundColor:"#C0C0C0"
}));

export default function AnalysisPage1() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <CssBaseline />
      <NavBar page={"analysis"} />
      <ComponentOuter maxWidth="lg">
        <Typography variant="h4" gutterBottom>
          Analysis 1
        </Typography>
        <StepperBox>
                efsdfgs
        </StepperBox>
      </ComponentOuter>
    </>
  );
}
