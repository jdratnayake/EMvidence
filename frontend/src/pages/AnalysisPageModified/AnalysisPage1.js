import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import NavBar from "../../components/NavBar/NavBar";
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
import folder from "./../../resources/folder.png";

const ComponentOuter = styled(Container)(() => ({
  marginTop: "20px",
}));

const StepperBox = styled(Box)(() => ({
  backgroundColor: "#C0C0C0",
  height: "72vh",
}));

const ContainerBox = styled(Box)(() => ({
  marginLeft: "5%",
  marginTop: "1%",
}));

const ContentSectionBox = styled(Box)(() => ({
  height: "70%",
}));

const FormElementBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "flex-start",
  marginTop: "20px",
  marginLeft: "20%",
  bottom: "10px",
}));

const SelectBox = styled(Box)(() => ({
  marginLeft: "10%",
  width: "350px",
}));

const BottomButtonBox = styled(Box)(() => ({
  marginTop: "10%",
}));

const SelectLabel = styled(Typography)(() => ({
  marginTop: "5%",
}));

const Selector = styled(Select)(() => ({
  height: "40px",
  width: "100%",
  boxShadow: "none",
  ".MuiOutlinedInput-notchedOutline": { border: 0 },
  background: "#00225640",
  color: "#FFFFFF",
}));

const LabelBox = styled(Box)(() => ({
  width: "150px",
}));

const ButtonBottomLeft = styled(Button)(() => ({
  color: "#00245A",
  marginLeft: "5px",
}));

const ButtonBottomRight = styled(Button)(() => ({
  marginRight: "5px",
  backgroundColor: "#00245A",
}));

const FileSelectionBox = styled(Box)(() => ({
  height: "70%",
  width: "48%",
  marginLeft: "25%",
  borderRadius: "30px",
  border: "1px solid rgba(0,36,90,0.25)",
  borderStyle: "dotted",
  display: "flex",
  flexDirection: "row",
  marginTop: "3%",
}));

const StepperSection = styled(Stepper)(() => ({
  marginBottom: "0px",
}));

const FileSelectionLeft = styled(Box)(() => ({
  flex: "0 0 auto",
  padding: "5px",
  boxSizing: "border-box",
}));

const AnalysisLeftBox = styled(Box)(() => ({
  flex: "0 0 auto",
  padding: "5px",
  boxSizing: "border-box",
  width: "50%",
}));

const FileSelectionRight = styled(Box)(() => ({
  flex: 1,
  paddingLeft: "2%",
  paddingTop: "8%",
}));

const DividerLine = styled(Box)(() => ({
  width: "2px",
  height: "168px",
  background: "rgba(0, 36, 90, 0.50)",
  marginTop: "8%",
  marginLeft: "15%",
}));

const FolderOutBox = styled(Box)(() => ({
  flex: "0 0 auto",
  padding: "10px",
  boxSizing: "border-box",
}));

const FolderIconBox = styled(Box)(() => ({
  width: "120px",
  height: "70%",
  flexShrink: 0,
  background: `url(${folder})`,
  dislplay: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "30%",
  marginLeft: "20%",
}));

const ButtonGroupBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  marginBottom: "10px",
}));

const ButtonAddPlugin = styled(Button)(() => ({
  backgroundColor: "#00245A",
  marginLeft: "5px",
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
  const [sampleSelection, setSampleSelection] = useState(0);

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
  };

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
            <StepperSection
              activeStep={activeStep}
              connector={<QontoConnector />}
            >
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
            </StepperSection>
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
                        <SelectLabel variant="body2" display="block">
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
                        <SelectLabel variant="body2" display="block">
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
                          <MenuItem value={0}>
                            STFT (FFT_SIZE = 2048 & Overlap Size = 256)
                          </MenuItem>
                          <MenuItem value={10}>
                            STFT (FFT_SIZE = 1024 & Overlap Size = 256)
                          </MenuItem>
                          <MenuItem value={8}>FFT</MenuItem>
                        </Selector>
                      </SelectBox>
                    </FormElementBox>
                    <FormElementBox>
                      <LabelBox>
                        <SelectLabel variant="body2" display="block">
                          Sample Selection:
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
                        <SelectLabel variant="body2" display="block">
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
                          <MenuItem value={1}>
                            Highest variance of averaged elements
                          </MenuItem>
                          <MenuItem value={2}>Other</MenuItem>
                        </Selector>
                      </SelectBox>
                    </FormElementBox>
                  </FormControl>
                </ContentSectionBox>
                <ButtonGroupBox>
                  <ButtonBottomLeft
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                    variant="text"
                  >
                    Back
                  </ButtonBottomLeft>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <ButtonBottomRight variant="contained" onClick={handleNext}>
                    Pre-Process
                  </ButtonBottomRight>
                </ButtonGroupBox>
              </React.Fragment>
            ) : activeStep === 0 ? (
              <React.Fragment>
                <ContentSectionBox>
                  <FileSelectionBox>
                    <FileSelectionLeft>
                      <FolderIconBox />
                    </FileSelectionLeft>
                    <DividerLine />
                    <FileSelectionRight>
                      <Typography variant="caption" gutterBottom>
                        <strong>Size:</strong> 1.3 GB
                      </Typography>
                      <br />
                      <Typography variant="caption" gutterBottom>
                        <strong>Sampling Rate:</strong> 20MHz
                      </Typography>
                      <br />
                      <Typography variant="caption" gutterBottom>
                        <strong>Center Frequency:</strong> 16MHz
                      </Typography>
                      <br />
                      <Typography variant="caption" gutterBottom>
                        <strong>Sampling Duration:</strong> 20s
                      </Typography>
                      <br />
                      <Typography variant="caption" gutterBottom>
                        <strong>Hash Function:</strong> SHA256
                      </Typography>
                      <br />
                      <Typography variant="caption" gutterBottom>
                        <strong>Device Name:</strong> iPhone 4S
                      </Typography>
                      <br />
                    </FileSelectionRight>

                    <FileSelectionRight />
                  </FileSelectionBox>
                </ContentSectionBox>
                <ButtonGroupBox>
                  <ButtonBottomLeft
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                    variant="text"
                  >
                    Back
                  </ButtonBottomLeft>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <ButtonBottomRight variant="contained" onClick={handleNext}>
                    Done
                  </ButtonBottomRight>
                </ButtonGroupBox>
              </React.Fragment>
            ) : activeStep === 2 ? (
              <React.Fragment>
                <ContentSectionBox>
                  <AnalysisLeftBox>
                    <ButtonAddPlugin variant="contained">
                      Add Plugin
                    </ButtonAddPlugin>
                  </AnalysisLeftBox>
                  <DividerLine />
                  <FileSelectionRight></FileSelectionRight>
                </ContentSectionBox>
                <ButtonGroupBox>
                  <ButtonBottomLeft
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                    variant="text"
                  >
                    Back
                  </ButtonBottomLeft>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <ButtonBottomRight variant="contained" onClick={handleNext}>
                    Done
                  </ButtonBottomRight>
                </ButtonGroupBox>
              </React.Fragment>
            ) : (
              <React.Fragment></React.Fragment>
            )}
            ;
          </StepperBox>
        </ComponentOuter>
      </ContainerBox>
    </>
  );
}
