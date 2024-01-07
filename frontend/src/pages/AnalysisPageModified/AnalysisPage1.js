import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import NavBar from "../../components/NavBar";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Step,
  StepConnector,
  StepLabel,
  Stepper,
  Typography,
  stepConnectorClasses,
} from "@mui/material";
import { styled } from "@mui/system";

const ComponentOuter = styled(Container)(() => ({
  marginTop: "50px",
}));

const StepperBox = styled(Box)(() => ({
  backgroundColor: "#C0C0C0",
}));

const ContainerBox = styled(Box)(() => ({
  marginLeft: "5%",
  marginTop: "3%",
}));

const steps = [
  "File Selection",
  "Pre-processing",
  "Analysing",
  "Analysis Summary",
];

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#00245A",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#00245A",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#8294b0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

export default function AnalysisPage1() {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You Can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

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
      <ContainerBox>
        <Typography variant="h4" gutterBottom>
          Analysis 1
        </Typography>
        <ComponentOuter maxWidth="lg">
          <StepperBox>
            <Stepper activeStep={activeStep} connector={<QontoConnector/>}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                if (isStepOptional(index)) {
                  labelProps.optional = (
                    <Typography variant="caption">Optional</Typography>
                  );
                }
                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  All steps completed - you&apos;re finished
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button onClick={handleReset}>Reset</Button>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  step {activeStep + 1}
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", pt2: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />
                  {isStepOptional(activeStep) && (
                  <Button color="inherit" conClick={handleSkip} sx={{mr:1}}>
                    Skip
                  </Button>
                  )}
                  <Button onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </StepperBox>
        </ComponentOuter>
      </ContainerBox>
    </>
  );
}
