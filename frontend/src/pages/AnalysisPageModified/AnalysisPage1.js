import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import NavBar from "../../components/NavBar";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  InputLabel,
  MenuItem,
  NativeSelect,
  Select,
  Step,
  StepConnector,
  StepLabel,
  Stepper,
  Typography,
  stepConnectorClasses,
} from "@mui/material";
import { styled } from "@mui/system";

const ComponentOuter = styled(Container)(() => ({
  marginTop: "20px",
}));

const StepperBox = styled(Box)(() => ({
  backgroundColor: "#C0C0C0",
  height: "70vh"
}));

const ContainerBox = styled(Box)(() => ({
  marginLeft: "5%",
  marginTop: "1%",
  
}));

const ContentSectionBox = styled(Box)(() => ({
  height: "55vh"
}));

const FormElementBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "flex-start",
  marginTop: "20px",
  marginLeft: "20%",
  bottom: "10px"
}));

const SelectBox = styled(Box)(() => ({
  marginLeft: "10%",
  width: "500px",
}));

const BottomButtonBox = styled(Box)(() => ({
  marginTop: "10%",
}));

const SelectLabel = styled(Typography)(() => ({
  marginTop: "5%",
}));

const Selector = styled(Select)(() => ({
  width: "100%",
  boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 },
  background: "#00225640",
  color: "#FFFFFF"
}));

const LabelBox = styled(Box)(() => ({
  width:"150px"
}));

const ButtonBottomLeft = styled(Button)(() => ({
  color:"#00245A",
  marginLeft:"5px"
}));

const ButtonBottomRight = styled(Button)(() => ({
  marginRight:"5px",
  backgroundColor: "#00245A"
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
  const [downSampleRate, setDownSampleRate] = useState(0);
  const [domainConverson, setDomainConversion] = useState(0);
  const [freqSelection, setFreqSelection] = useState(0);
  const [sampleSelection,setSampleSelection] = useState(0)

  const handleChangeDownSampling = (event) => {
    console.log(event);
    setDownSampleRate(event.target.value);
  };

  const handleDomainConversion = (event) => {
    setDomainConversion(event.target.value);
  };

  const handleFreqSelection = (event) => {
    setFreqSelection(event.target.value);
  };

  const handleSampleSelection = (event) => {
    setSampleSelection(event.target.value);
  }

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
            <Stepper activeStep={activeStep} connector={<QontoConnector />}>
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
            ) : activeStep === 1 ? (
              <React.Fragment>

                <ContentSectionBox>
                  <FormControl fullWidth>
                    <FormElementBox>
                      <LabelBox>
                      <SelectLabel variant="body1" display="block">
                        DownSampling:
                      </SelectLabel>
                      </LabelBox>
                      <SelectBox>
                        <Selector
                          defaultValue={1}
                          value={downSampleRate}
                          onChange={handleChangeDownSampling}
                          displayEmpty
                          inputProps={{ "aria-label": "without label" }}
                        >
                          <MenuItem value={0}>Not Downsampled</MenuItem>
                          <MenuItem value={10}>To 10MHz</MenuItem>
                          <MenuItem value={8}>To 8MHz</MenuItem>
                          <MenuItem value={4}>To 4MHz</MenuItem>
                        </Selector>
                      </SelectBox>
                    </FormElementBox>
                    <FormElementBox>
                      <LabelBox>
                      <SelectLabel variant="body1" display="block">
                        Domain Conversion:
                      </SelectLabel>
                      </LabelBox>
                      <SelectBox>
                        <Selector
                          defaultValue={1}
                          value={domainConverson}
                          onChange={handleDomainConversion}
                          displayEmpty
                          inputProps={{ "aria-label": "without label" }}
                        >
                          <MenuItem value={0}>STFT (FFT_SIZE = 2048 & Overlap Size = 256)</MenuItem>
                          <MenuItem value={10}>STFT (FFT_SIZE = 1024 & Overlap Size = 256)</MenuItem>
                          <MenuItem value={8}>FFT</MenuItem>
                        </Selector>
                      </SelectBox>
                    </FormElementBox>
                    <FormElementBox>
                      <LabelBox>
                      <SelectLabel variant="body1" display="block">
                        Sanmple Selection:
                      </SelectLabel>
                      </LabelBox>
                      <SelectBox>
                        <Selector
                          defaultValue={1}
                          value={sampleSelection}
                          onChange={handleSampleSelection}
                          displayEmpty
                          inputProps={{ "aria-label": "without label" }}
                        >
                          <MenuItem value={0}>All Samples</MenuItem>
                          <MenuItem value={1}>First 20k Samples</MenuItem>
                          <MenuItem value={2}>.25 to .75 of samples</MenuItem>
                        </Selector>
                      </SelectBox>
                    </FormElementBox>
                    <FormElementBox>
                      <LabelBox>
                      <SelectLabel variant="body1" display="block">
                        Frequency Channel Selection:
                      </SelectLabel>
                      </LabelBox>
                      <SelectBox>
                        <Selector
                          defaultValue={1}
                          value={freqSelection}
                          onChange={handleFreqSelection}
                          displayEmpty
                          inputProps={{ "aria-label": "without label" }}
                        >
                          <MenuItem value={0}>All Channels</MenuItem>
                          <MenuItem value={1}>Highest variance of averaged elements</MenuItem>
                          <MenuItem value={2}>Other</MenuItem>
                        </Selector>
                      </SelectBox>
                    </FormElementBox>
                  </FormControl>
                </ContentSectionBox>
                <Box sx={{ display: "flex", flexDirection: "row", pt2: 2 }}>
                  <ButtonBottomLeft
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                    variant="text"
                  >
                    Back
                  </ButtonBottomLeft>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <ButtonBottomRight variant="contained" onClick={handleNext}>Pre-Process</ButtonBottomRight>
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
                    <Button
                      color="inherit"
                      conClick={handleSkip}
                      sx={{ mr: 1 }}
                    >
                      Skip
                    </Button>
                  )}
                  <Button onClick={handleNext}>
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
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
