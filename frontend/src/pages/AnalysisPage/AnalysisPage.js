import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import NavBar from "../../components/NavBar/NavBar";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  Button,
  Card,
  Chip,
  Container,
  CssBaseline,
  FormControl,
  Grid,
  IconButton,
  NativeSelect,
  Typography,
} from "@mui/material";
import folder from "./../../resources/folder.png";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { API_URL } from "../../constants";
import "react-toastify/dist/ReactToastify.css";
import "./AnalysisPage.css";
import PluginCardAnalysis from "../../components/PluginCardAnalysis/PluginCardAnalysis";
import AnalysisPluginModal from "../../components/AnalysisPluginModal/AnalysisPluginModal";

const AnalysisPage = () => {
  const analyisPlugins = [
    {
      id: "1",
      name: "Behavior Identification",
      descrption:
        "In computing, a plug-in (or plugin, add-in, addin, add-on, or addon) is a software component that adds a specific feature to an existing computer program. When a program supports plug-ins, it enables customization.",
    },
    {
      id: "2",
      name: "Malicious Firmware Modification Detection",
      descrption:
        "In computing, a plug-in (or plugin, add-in, addin, add-on, or addon) is a software component that adds a specific feature to an existing computer program. When a program supports plug-ins, it enables customization.",
    },
    {
      id: "3",
      name: "FirmWare Version Detection",
      descrption: "Description 3",
    },
  ];

  const [checkedPlugin, setCheckedPlugin] = useState(0);
  const [isPreprocessingFetching, setIsPreprocessingFetching] = useState(false);
  const [isAnalysisFetching, setIsAnalysisFetching] = useState(false);
  const [analysisResults, setAnalysisResults] = useState([]);
  const [analysisPlugin, setAnalysisPlugin] = useState(1);
  const [loading, setLoading] = React.useState(false);
  const [loadingAnalyse, setLoadingAnalyse] = React.useState(false);
  const [insightTypeName, setInsightTypeName] = useState(
    "Behavior identification"
  );
  const [downSamplingIndex, setDownSamplingIndex] = useState(0);
  const [fourierTransformationIndex, setFourierTransformationIndex] =
    useState(0);
  const [fftSizeIndex, setFftSizeIndex] = useState(0);
  const [overLapPercentageIndex, setOverLapPercentageIndex] = useState(0);
  const [sampleSelectionIndex, setSampleSelectionIndex] = useState(0);
  const [isAnalysisPluginModalOpen, setIsAnalysisPluginModalOpen] =
    useState(false);
  const [pluginModalId, setPluginModalId] = useState(null);
  const [pluginModalName, setPluginModalName] = useState(null);
  const [pluginModalDescription, setPluginModalDescription] = useState(null);

  const blackHeader = "#00245A";
  const containerColor = "#FFFFFF";
  const buttonColor = "#525252";

  const executePreprocessingPlugin = () => {
    // setIsPreprocessingFetching(true);
    setLoading(true);
    console.log("Down Sampling Index: " + downSamplingIndex);

    const headers = {
      "Content-Type": "application/json",
      em_raw_file_name: "class_8_iphone4s_sms-app.cfile",
      preprocessing_plugin_name: "basic.py",
      down_sampling_index: downSamplingIndex,
      fft_size_index: fftSizeIndex,
      overlap_percentage_index: overLapPercentageIndex,
      sample_selection_index: sampleSelectionIndex,
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
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);

        toast.error("Preprocessing Failed", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setLoading(false);
        // setIsPreprocessingFetching(false);
      });
  };

  const handleAnalysisPLuginChange = (event) => {
    // console.log(analysisPlugin);
    setAnalysisPlugin(event.target.value);

    if (event.target.value == 1) {
      setInsightTypeName("Behavior identification");
    } else if (event.target.value == 2) {
      setInsightTypeName("Malicious firmware modification detection");
    }
  };

  const handleDownSamplingChange = (event) => {
    setDownSamplingIndex(event.target.value);
  };

  const handleFftSizeChange = (event) => {
    setFftSizeIndex(event.target.value);
  };

  const handleOverLapPercentageChange = (event) => {
    setOverLapPercentageIndex(event.target.value);
  };

  const handleSampleSelectionChange = (event) => {
    setSampleSelectionIndex(event.target.value);
  };

  const executeAnalysisPlugin = () => {
    setLoadingAnalyse(true);
    let analysisPluginMachineLearningModelName = "";

    if (analysisPlugin == 1) {
      analysisPluginMachineLearningModelName =
        "apple_iphone_4s__detect_behaviour_of_6_classes__neural_network_model.h5";
    } else {
      analysisPluginMachineLearningModelName =
        "apple_iphone_4s__detect_anomalies__neural_network_model.h5";
    }

    setIsAnalysisFetching(true);
    const headers = {
      "Content-Type": "application/json",
      em_raw_file_name: "class_8_iphone4s_sms-app.cfile",
      analysis_plugin_name:
        "apple_iphone_4s__detect_behaviour_of_10_classes.py",
      analysis_plugin_ml_model_name: analysisPluginMachineLearningModelName,
    };

    axios
      .get(API_URL + "/plugin/analysis", { headers })
      .then((response) => {
        const analysisResultObjects = Object.entries(
          response.data["output"]
        ).map(([key, value]) => ({
          action: key,
          probability: value,
        }));

        console.log(analysisResultObjects);

        toast.success("Analysis Done Successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // setAnalysisResults(response.data["output"]);
        setAnalysisResults(analysisResultObjects);
        setIsAnalysisFetching(false);
        setLoadingAnalyse(false);
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
        setLoadingAnalyse(false);
        setIsAnalysisFetching(false);
      });
  };

  const handleChecked = (id) => {
    console.log("Id: ", id);
    setCheckedPlugin(id);
    setAnalysisPlugin(parseInt(id));
    if (id == "1") {
      setInsightTypeName("Behavior identification");
    } else if (id == "2") {
      setInsightTypeName("Malicious firmware modification detection");
    }
  };

  const handleClicked = (id, name, description) => {
    setPluginModalId(id);
    setPluginModalName(name);
    setPluginModalDescription(description);
    setIsAnalysisPluginModalOpen(true);
  };

  const handleClose = () => {
    setIsAnalysisPluginModalOpen(false);
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
      <AnalysisPluginModal
        id={pluginModalId}
        name={pluginModalName}
        description={pluginModalDescription}
        open={isAnalysisPluginModalOpen}
        onClose={handleClose}
        modifyChecked={handleChecked}
      />

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
          {/* Add sign button */}
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "row", // Horizontal layout
              border: "2px solid rgba(50, 84, 136, 0.5)",
              width: "60%",
              marginTop: "10px",
              marginLeft: "10%",
              marginBottom: "5%",
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
                  background: `url(${folder}),  100% / cover no-repeat`,
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
                backgroundColor: "rgba(50, 84, 136, 0.5)",
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
                <strong>Device Name:</strong> iPhone 4S
              </Typography>
            </Box>
          </Box>
          {/* <Button
              sx={{
                mb: "10px",
                marginLeft: "80%",
                marginRight: "10%",
                backgroundColor: "#00245A",
                color: "#ffffff",
                "&:hover": {
                  backgroundColor: "rgba(82, 82, 82, 0.8)", // Adjust the opacity as needed
                },
              }}
              variant="contained"
            >
              Select
            </Button> */}
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
                Down Sampling:
              </Typography>
              <NativeSelect
                defaultValue={1}
                inputProps={{
                  name: "domain-conversion",
                  id: "uncontrollerd-native",
                }}
                sx={{ mt: "-10px" }}
                value={downSamplingIndex}
                onChange={handleDownSamplingChange}
              >
                <option value={0}>Not downsampled</option>
                <option value={1}>To 10MHz</option>
                <option value={2}>To 8MHz</option>
                <option value={3}>To 4MHz</option>
              </NativeSelect>
            </Box>
            {/* <Box
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
                  value={fourierTransformationIndex}
                  onChange={handleFourierTransformationChange}
                >
                  <option value={0}>
                    STFT (FFT_SIZE = 2048 & Overlap Size = 256)
                  </option>
                  <option value={1} disabled>
                    STFT (FFT_SIZE = 1024 & Overlap Size = 256)
                  </option>
                </NativeSelect>
              </Box> */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
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
                Short term fourier transformation:
              </Typography>
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
                  FFT Size:
                </Typography>
                <NativeSelect
                  defaultValue={1}
                  inputProps={{
                    name: "domain-conversion",
                    id: "uncontrollerd-native",
                  }}
                  sx={{ mt: "-10px" }}
                  value={fftSizeIndex}
                  onChange={handleFftSizeChange}
                >
                  <option value={0}>2048</option>
                  <option value={1} disabled>
                    1024
                  </option>
                </NativeSelect>

                <Typography
                  variant="body1"
                  display="block"
                  sx={{ ml: "20px", mr: "20px" }}
                  gutterBottom
                >
                  Overlap Size:
                </Typography>
                <NativeSelect
                  defaultValue={1}
                  inputProps={{
                    name: "domain-conversion",
                    id: "uncontrollerd-native",
                  }}
                  sx={{ mt: "-10px" }}
                  value={overLapPercentageIndex}
                  onChange={handleOverLapPercentageChange}
                >
                  <option value={0}>10%</option>
                  <option value={1} disabled>
                    20%
                  </option>
                </NativeSelect>
              </Box>
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
                value={sampleSelectionIndex}
                onChange={handleSampleSelectionChange}
              >
                <option value={0}>All Samples</option>
                <option value={1}>First 20000 Samples</option>
                <option value={2}>
                  Samples selected from 1/4 to 3/4 of the file
                </option>
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
                <option value={2}>
                  Channel selection based on avarage (500 samples)
                </option>
                <option value={3}>
                  Channel selection based on variance (500 samples)
                </option>
              </NativeSelect>
            </Box>
            <LoadingButton
              sx={{
                mb: "10px",
                marginLeft: "80%",
                marginRight: "10%",
                backgroundColor: "#00245A",
                color: "#ffffff",
                "&:hover": {
                  backgroundColor: "rgba(82, 82, 82, 0.8)", // Adjust the opacity as needed
                },
              }}
              variant="contained"
              disabled={isPreprocessingFetching}
              onClick={executePreprocessingPlugin}
              loading={loading}
            >
              Preprocess
            </LoadingButton>
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
              mt: "5px",
              mb: "5px",
            }}
          >
            <Typography
              variant="body1"
              display="block"
              sx={{ ml: "20px", mr: "20px", mt: "20px" }}
              gutterBottom
            >
              Select the Analysis plugin:
            </Typography>
            {/* <NativeSelect
              defaultValue={1}
              inputProps={{
                name: "domain-conversion",
                id: "uncontrollerd-native",
              }}
              sx={{ mt: "-10px" }}
              value={analysisPlugin}
              onChange={handleAnalysisPLuginChange}
            >
              <option value={1}>Behavior identification</option>
              <option value={2}>
                Malicious firmware modification detection
              </option>
              <option value={3}>Firmware version detection</option>
            </NativeSelect> */}
          </Box>
          <Box>
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="left"
              marginTop={0}
            >
              {analyisPlugins.map((plugin) => (
                <Grid item xs={5} sm={5} md={2} marginTop={8} m={2}>
                  <PluginCardAnalysis
                    id={plugin.id}
                    name={plugin.name}
                    description={plugin.descrption}
                    isChecked={plugin.id == checkedPlugin ? true : false}
                    modifyChecked={handleChecked}
                    handleClicked={handleClicked}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
          <LoadingButton
            sx={{
              mb: "10px",
              marginLeft: "80%",
              marginRight: "10%",
              backgroundColor: "#00245A",
              color: "#ffffff",
              "&:hover": {
                backgroundColor: "rgba(82, 82, 82, 0.8)", // Adjust the opacity as needed
              },
            }}
            variant="contained"
            disabled={isAnalysisFetching}
            onClick={executeAnalysisPlugin}
            loading={loadingAnalyse}
          >
            Analyze
          </LoadingButton>
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
              ml: "10px",
              width: "50%",
              mb: "30px",
              paddingLeft: "10px",
              ml: "10%",
              border: "2px solid rgba(50, 84, 136, 0.5)",
            }}
          >
            <Typography variant="h5" sx={{ mb: "30px" }}>
              Analysis Summary 1
            </Typography>

            <Typography variant="body1">
              <strong>Insight Type:</strong> {insightTypeName}
            </Typography>

            {/* <Typography variant="body1">
                <strong>Identified Behavior:</strong> Asking a definition
              </Typography> */}

            {analysisResults.map((result, index) => (
              <Typography key={index} variant="body1">
                <strong style={{ display: "inline-block", width: "200px" }}>
                  {result.action}:
                </strong>{" "}
                <span>{result.probability}%</span>
              </Typography>
            ))}

            {/* <Typography variant="body1">
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
              </Typography> */}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AnalysisPage;
