import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import NavBar from "../components/NavBar";
import {
  Box,
  Button,
  Chip,
  Container,
  CssBaseline,
  FormControl,
  IconButton,
  NativeSelect,
  Typography,
} from "@mui/material";
import folder from "./../Resources/folder.png";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { API_URL } from "../constants";
import "react-toastify/dist/ReactToastify.css";

const AnalysisPage = () => {
  const [isPreprocessingFetching, setIsPreprocessingFetching] = useState(false);
  const [isAnalysisFetching, setIsAnalysisFetching] = useState(false);
  const blackHeader = "#000000";
  const containerColor = "#1614140D";
  const buttonColor = "#525252";

  const executePreprocessingPlugin = () => {
    setIsPreprocessingFetching(true);
    const headers = {
      "Content-Type": "application/json",
      em_raw_file_name: "class_8_iphone4s_sms-app.cfile",
      preprocessing_plugin_name: "basic.py",
    };

    axios
      .get(API_URL + "/plugin/preprocessing", { headers })
      .then((response) => {
        console.log(response.data);

        toast.success("Pre-Processing Done Successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setIsPreprocessingFetching(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);

        toast.error("Pre-Processing Failed", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const executeAnalysisPlugin = () => {
    setIsAnalysisFetching(true);
    const headers = {
      "Content-Type": "application/json",
      em_raw_file_name: "class_8_iphone4s_sms-app.cfile",
      analysis_plugin_name:
        "apple_iphone_4s__detect_behaviour_of_10_classes.py",
      analysis_plugin_ml_model_name:
        "apple_iphone_4s__detect_behaviour_of_10_classes__neural_network_model.h5",
    };

    axios
      .get(API_URL + "/plugin/analysis", { headers })
      .then((response) => {
        console.log(response.data["output"]);

        toast.success("Analysis Done Successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setIsAnalysisFetching(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);

        toast.error("Analysis Failed", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
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
      <NavBar />
      <Container maxWidth="lg" sx={{ marginTop: "50px" }}>
        <Box class="file_selection">
          <Box
            sx={{
              bgcolor: blackHeader,
              height: "10vh",
              margin: "0",
              display: "flex",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                pt: "10px",
                pl: "5px",
                fontFamily: "Inter",
                fontSize: "24px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal",
                color: "#FFFFFF",
                mb: 0,
                mr: "20px",
              }}
              gutterBottom
            >
              File Selection
            </Typography>
            <IconButton
              sx={{ mt: "-10px" }}
              aria-label="add-plugin"
              color="success"
            >
              <ControlPointIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              bgcolor: containerColor,
              margin: "0",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row", // Horizontal layout
                border: "2px solid #000000",
                width: "60%",
                marginTop: "10px",
                backgroundColor: "#DED4D4",
              }}
            >
              {/* Left Section */}
              <Box
                sx={{
                  flex: "0 0 auto", // Do not grow or shrink, use auto for width
                  padding: "10px",
                  boxSizing: "border-box", // Include padding in width calculation
                }}
              >
                <Box
                  sx={{
                    width: "133px",
                    height: "20vh",
                    flexShrink: 0,
                    background: `url(${folder}), #DED4D4 100% / cover no-repeat`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                ></Box>
              </Box>

              {/* Divider Line */}
              <Box
                sx={{
                  position: "relative",
                  top: 0,
                  bottom: 0,
                  width: "2px",
                  backgroundColor: blackHeader,
                  content: "''",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              />

              {/* Right Section */}
              <Box
                sx={{
                  flex: 1,
                  padding: "16px",
                }}
              >
                <Typography variant="body1" gutterBottom>
                  <strong>Size:</strong> 1.3 GB
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Sampling Rate:</strong> 20MHz
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Center Frequency:</strong> 16MHz
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Sampling Duration:</strong> 20s
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Hash Function:</strong> SHA256
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>IoT Device:</strong> Amazon Alexa
                </Typography>
              </Box>
            </Box>
            <Button
              sx={{
                mb: "10px",
                marginLeft: "80%",
                marginRight: "10%",
                backgroundColor: "#525252",
                color: "#ffffff",
                "&:hover": {
                  backgroundColor: "rgba(82, 82, 82, 0.8)", // Adjust the opacity as needed
                },
              }}
              variant="contained"
            >
              Select
            </Button>
          </Box>
        </Box>
        <Box class="pre_processing" sx={{ mt: "40px" }}>
          <Box sx={{ bgcolor: blackHeader, height: "10vh", margin: "0" }}>
            <Typography
              variant="h4"
              sx={{
                pt: "10px",
                pl: "5px",
                fontFamily: "Inter",
                fontSize: "24px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal",
                color: "#FFFFFF",
                mb: 0,
              }}
              gutterBottom
            >
              Pre-Processing Plugins
            </Typography>
          </Box>
          <Box
            sx={{
              bgcolor: containerColor,
              margin: "0",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <FormControl>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  mt: "20px",
                  mb: "20px",
                }}
              >
                <Typography
                  variant="body1"
                  display="block"
                  sx={{ ml: "20px", mr: "20px" }}
                  gutterBottom
                >
                  Domain Conversion:
                </Typography>
                <NativeSelect
                  defaultValue={1}
                  inputProps={{
                    name: "domain-conversion",
                    id: "uncontrollerd-native",
                  }}
                  sx={{ mt: "-10px" }}
                >
                  <option value={1}>
                    STFT (FFT_SIZE = 2048 & Overlap Size = 256)
                  </option>
                  <option value={2}>Option 2</option>
                  <option value={3}>Option 3</option>
                </NativeSelect>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  mt: "20px",
                  mb: "20px",
                }}
              >
                <Typography
                  variant="body1"
                  display="block"
                  sx={{ ml: "20px", mr: "20px" }}
                  gutterBottom
                >
                  Down Sampling:
                </Typography>
                <NativeSelect
                  defaultValue={1}
                  inputProps={{
                    name: "domain-conversion",
                    id: "uncontrollerd-native",
                  }}
                  sx={{ mt: "-10px" }}
                >
                  <option value={1}>To 10MHz</option>
                  <option value={2}>Option 2</option>
                  <option value={3}>Option 3</option>
                </NativeSelect>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  mt: "20px",
                  mb: "20px",
                }}
              >
                <Typography
                  variant="body1"
                  display="block"
                  sx={{ ml: "20px", mr: "20px" }}
                  gutterBottom
                >
                  Frequency Channel Selection:
                </Typography>
                <NativeSelect
                  defaultValue={1}
                  inputProps={{
                    name: "domain-conversion",
                    id: "uncontrollerd-native",
                  }}
                  sx={{ mt: "-10px" }}
                >
                  <option value={1}>All Channels</option>
                  <option value={2}>Option 2</option>
                  <option value={3}>Option 3</option>
                </NativeSelect>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  mt: "20px",
                  mb: "20px",
                }}
              >
                <Typography
                  variant="body1"
                  display="block"
                  sx={{ ml: "20px", mr: "20px" }}
                  gutterBottom
                >
                  Sample Selection:
                </Typography>
                <NativeSelect
                  defaultValue={1}
                  inputProps={{
                    name: "domain-conversion",
                    id: "uncontrollerd-native",
                  }}
                  sx={{ mt: "-10px" }}
                >
                  <option value={1}>First 20000 Samples</option>
                  <option value={2}>Option 2</option>
                  <option value={3}>Option 3</option>
                </NativeSelect>
              </Box>
              <Button
                sx={{
                  mb: "10px",
                  marginLeft: "80%",
                  marginRight: "10%",
                  backgroundColor: "#525252",
                  color: "#ffffff",
                  "&:hover": {
                    backgroundColor: "rgba(82, 82, 82, 0.8)", // Adjust the opacity as needed
                  },
                }}
                variant="contained"
                disabled={isPreprocessingFetching}
                onClick={executePreprocessingPlugin}
              >
                Select Dave
              </Button>
            </FormControl>
          </Box>
        </Box>

        <Box class="analysis" sx={{ mt: "40px" }}>
          <Box
            sx={{
              bgcolor: blackHeader,
              height: "10vh",
              margin: "0",
              display: "flex",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                pt: "10px",
                pl: "5px",
                fontFamily: "Inter",
                fontSize: "24px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal",
                color: "#FFFFFF",
                mb: 0,
                mr: "20px",
              }}
              gutterBottom
            >
              Analysis Plugins
            </Typography>
            {/* <IconButton
              sx={{ mt: "-10px" }}
              aria-label="add-plugin"
              color="success"
            >
              <ControlPointIcon />
            </IconButton> */}
          </Box>
          <Box
            sx={{
              bgcolor: containerColor,
              margin: "0",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* <Box
              sx={{
                display: "flex",
                mt: "30px",
                ml: "10px",
                justifyContent: "flex-start",
                mb: "30px",
              }}
            > */}
              {/* <Chip
                label="Random Forest Algorithm"
                onDelete
                sx={{ mr: "20px" }}
              />
              <Chip label="K-Means Clustering" onDelete /> */}
            {/* </Box> */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                mt: "20px",
                mb: "20px",
              }}
            >
              <Typography
                variant="body1"
                display="block"
                sx={{ ml: "20px", mr: "20px" }}
                gutterBottom
              >
                Analysis plugin:
              </Typography>
              <NativeSelect
                defaultValue={1}
                inputProps={{
                  name: "domain-conversion",
                  id: "uncontrollerd-native",
                }}
                sx={{ mt: "-10px" }}
              >
                <option value={1}>Firmware version detection</option>
                <option value={2}>Behavior modification detection</option>
                <option value={3}>Option 3</option>
              </NativeSelect>
            </Box>
            <Button
              sx={{
                mb: "10px",
                marginLeft: "80%",
                marginRight: "10%",
                backgroundColor: "#525252",
                color: "#ffffff",
                "&:hover": {
                  backgroundColor: "rgba(82, 82, 82, 0.8)", // Adjust the opacity as needed
                },
              }}
              variant="contained"
              disabled={isAnalysisFetching}
              onClick={executeAnalysisPlugin}
            >
              Analyze
            </Button>
          </Box>
        </Box>

        <Box class="analysis_summary" sx={{ mt: "40px" }}>
          <Box
            sx={{
              bgcolor: blackHeader,
              height: "10vh",
              margin: "0",
              display: "flex",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                pt: "10px",
                pl: "5px",
                fontFamily: "Inter",
                fontSize: "24px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal",
                color: "#FFFFFF",
                mb: 0,
                mr: "20px",
              }}
              gutterBottom
            >
              Analysis Summary
            </Typography>
          </Box>
          <Box
            sx={{
              bgcolor: containerColor,
              margin: "0",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                mt: "30px",
                bgcolor: "white",
                ml: "10px",
                width: "50%",
                mb: "30px",
                paddingLeft: "10px",
              }}
            >
              <Typography variant="h5">ML: Random Forest Summary</Typography>

              <Typography variant="body1">
                <strong>Insight Type:</strong> Behavior Identification
              </Typography>

              <Typography variant="body1">
                <strong>Identified Behavior:</strong> Asking a definition
              </Typography>

              <Typography variant="body1">
                <strong style={{ display: "inline-block", width: "200px" }}>
                  Class 1 accuracy:
                </strong>{" "}
                <span>92.34%</span>
              </Typography>
              <Typography variant="body1">
                <strong style={{ display: "inline-block", width: "200px" }}>
                  Class 2 accuracy:
                </strong>{" "}
                <span>92.34%</span>
              </Typography>
              <Typography variant="body1">
                <strong style={{ display: "inline-block", width: "200px" }}>
                  Class 3:
                </strong>{" "}
                <span>92.34%</span>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default AnalysisPage;
