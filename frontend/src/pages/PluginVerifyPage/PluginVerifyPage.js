import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from '@mui/material/Button';
import {
  Box,
  FormControl,
  Grid,
  NativeSelect,
  Typography,
  InputLabel,
  MenuItem,
  Select
} from "@mui/material";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

import PluginCardAnalysis from "../../components/PluginCardAnalysis/PluginCardAnalysis";
import AnalysisPluginModal from "../../components/AnalysisPluginModal/AnalysisPluginModal";
import { API_URL } from "../../constants";
import folder from "./../../resources/folder.png";

import "react-toastify/dist/ReactToastify.css";
import "./PluginVerifyPage.css";

const PluginVerifyPage = () => {
  const blackHeader = "#00245A";
  const containerColor = "#FFFFFF";
  const buttonColor = "#525252";

  const [emDataFile, setEmDataFile] = useState();

  const handleEmDataFile = (event) => {
    setEmDataFile(event.target.value);

  };

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
    ,
    {
      id: "4",
      name: "FirmWare Version Detection",
      descrption: "Description 3",
    }
    ,
    {
      id: "5",
      name: "FirmWare Version Detection",
      descrption: "Description 3",
    }
    ,
    {
      id: "6",
      name: "FirmWare Version Detection",
      descrption: "Description 3",
    }
    ,
    {
      id: "7",
      name: "FirmWare Version Detection",
      descrption: "Description 3",
    }
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
  const [fftSizeIndex, setFftSizeIndex] = useState(0);
  const [overLapPercentageIndex, setOverLapPercentageIndex] = useState(0);
  const [sampleSelectionIndex, setSampleSelectionIndex] = useState(0);
  const [isAnalysisPluginModalOpen, setIsAnalysisPluginModalOpen] =
    useState(false);
  const [pluginModalId, setPluginModalId] = useState(null);
  const [pluginModalName, setPluginModalName] = useState(null);
  const [pluginModalDescription, setPluginModalDescription] = useState(null);

  const executePreprocessingPlugin = () => {
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
      });
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

  const sxStyle = {
    width: '100%',
    "&:hover": {
      "&& fieldset": {
        border: "2px solid #00245A",
      },
    },
    "& .MuiInputLabel-outlined": {
      color: "grey", // Initial color
      "&.Mui-focused": {
        color: "#00245A", // Color when focused
      },
    },
    color: "#00245A",
    "& .MuiOutlinedInput-root": {

      "&.Mui-focused": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#00245A",
          borderWidth: "2px",
        },
      },
      "& .MuiInputLabel-outlined": {
        color: "#2e2e2e",
        fontWeight: "bold",
        "&.Mui-focused": {
          color: "secondary.main",
          fontWeight: "bold",
        },
      },
    },
  }


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

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 6
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontFamily: "roboto",
            fontStyle: "normal",
            fontWeight: 400,
            mt: 2
          }}
          gutterBottom
        >
          Verify Plugin
        </Typography>
      </Box>

      <Box className="file_selection" >
        <Box
          sx={{
            bgcolor: blackHeader,
            height: "10vh",
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            borderTopLeftRadius: "5px",
            borderTopRightRadius: "5px",

          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontSize: "24px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "normal",
              color: "#FFFFFF",
              mb: 0,
              pl: 3

            }}
            gutterBottom
          >
            File Selection
          </Typography>
        </Box>
        <Box
          sx={{
            bgcolor: containerColor,
            display: "flex",
            flexDirection: "column",
            borderEndStartRadius: "5px",
            borderEndEndRadius: "5px",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center"

          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column", // Horizontal layout
              width: "50%",
              height: "150px",
              // mt: 5, ml: 5,
              justifyContent: "center",
              alignItems: "left",
              alignContent: "left"

            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal",
                color: "black",
                mb: "5px",
              }}
              gutterBottom
            >
              Select Your File
            </Typography>

            <FormControl
              fullWidth
              style={{ marginBottom: "20px", textAlign: "left" }}
              required
              sx={{
                ...sxStyle,

              }}
            >
              {!emDataFile && <InputLabel id="dropdown-label-1" shrink={false}>Select</InputLabel>}
              <Select
                labelId="dropdown-label-1"
                id="dropdown-1"
                value={emDataFile}
                onChange={handleEmDataFile}
                style={{ borderColor: "#525252" }}

              >
                <MenuItem value="f1">File 1</MenuItem>
                <MenuItem value="f2">File 2</MenuItem>
              </Select>
            </FormControl>

          </Box>
          <Box
            sx={{
              mt: "0px",
              width: "50%",
              mb: "40px",
              p: "20px",
              border: "2px solid #00245A",
              borderRadius: "5px",
              display: emDataFile ? "flex" : "none",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              backgroundColor: "#E8E8E8"

            }}
          >
            <InsertDriveFileIcon sx={{ fontSize: "75px", color: "#00245A" }} />

            <Typography variant="h5" sx={{ mb: "10px" }}>
              <strong>File 1</strong>
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start"
              }}
            >
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Insight Type:</strong> {insightTypeName}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Sampling Rate:</strong> 20MHz
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Center Frequency:</strong> 16MHz
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Sampling Duration:</strong> 20s
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Hash Function:</strong> Md5
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Device Name:</strong> Iphone 4S
              </Typography>
            </Box>
          </Box>

        </Box>
      </Box>

      <Box className="pre_processing" style={{ marginTop: "40px" }}  >
        <Box sx={{
          bgcolor: blackHeader,
          height: "10vh",
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          borderTopLeftRadius: "5px",
          borderTopRightRadius: "5px",
        }}>
          <Typography
            variant="h4"
            sx={{
              fontSize: "24px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "normal",
              color: "#FFFFFF",
              mb: 0,
              pl: 3
            }}
            gutterBottom
          >
            Pre-processing Plugins
          </Typography>
        </Box>
        <Box
          sx={{
            bgcolor: containerColor,
            display: "flex",
            flexDirection: "column",
            borderEndStartRadius: "5px",
            borderEndEndRadius: "5px",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center"

          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column", // Horizontal layout
              width: "50%",
              mt: 3,
              alignItems: "left",
              alignContent: "left"

            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal",
                color: "black",
                mb: "5px",
              }}
              gutterBottom
            >
              Down-sampling
            </Typography>

            <FormControl
              fullWidth
              style={{ marginBottom: "20px", textAlign: "left" }}
              required
              sx={{
                ...sxStyle,

              }}
            >

              <Select
                id="downSamplingIndex"
                defaultValue={0}

                // label="Select Your File"
                style={{ borderColor: "#525252" }}

              >
                <MenuItem value={0}>Not down-sampled</MenuItem>
                <MenuItem value={1}>To 10MHz</MenuItem>
                <MenuItem value={2}>To 8MHz</MenuItem>
                <MenuItem value={3}>To 4MHz</MenuItem>
              </Select>
            </FormControl>

          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column", // Horizontal layout
              width: "50%",
              alignItems: "left",
              alignContent: "left"

            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal",
                color: "black",
                mb: "5px",
              }}
              gutterBottom
            >
              Short term fourier transformation
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: "20px",
                mb: "20px",
              }}
            >

              <Box sx={{ display: "flex", flexDirection: "row" }}>

                <FormControl
                  fullWidth
                  style={{ textAlign: "left", width: "200px" }}
                  required
                  sx={{
                    ...sxStyle,

                  }}
                >
                  <InputLabel id="dropdown-label-1">FFT Size</InputLabel>
                  <Select
                    labelId="dropdown-label-1"
                    id="dropdown-1"
                    value={fftSizeIndex}
                    onChange={(event) => setFftSizeIndex(event.target.value)}
                    label="FFT Size"
                    style={{ borderColor: "#525252" }}

                  >
                    <MenuItem value={0}>2048</MenuItem>
                    <MenuItem value={1} disabled></MenuItem>
                  </Select>
                </FormControl>

              </Box>

              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <FormControl
                  fullWidth
                  style={{ textAlign: "left", width: "200px" }}
                  required
                  sx={{
                    ...sxStyle,

                  }}
                >
                  <InputLabel id="dropdown-label-overLapPercentageIndex">Overlap Size</InputLabel>
                  <Select
                    labelId="dropdown-label-overLapPercentageIndex"
                    id="overLapPercentageIndex"
                    value={overLapPercentageIndex}
                    onChange={(event) =>
                      setOverLapPercentageIndex(event.target.value)
                    }
                    label="Overlap Size"
                    style={{ borderColor: "#525252" }}

                  >
                    <MenuItem value={0}>10%</MenuItem>
                    <MenuItem value={1}>20%</MenuItem>
                    <MenuItem value={2} disabled></MenuItem>

                  </Select>
                </FormControl>
              </Box>

            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column", // Horizontal layout
              width: "50%",
              alignItems: "left",
              alignContent: "left"

            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal",
                color: "black",
                mb: "5px",
              }}
              gutterBottom
            >
              Sample Selection
            </Typography>

            <FormControl
              fullWidth
              style={{ marginBottom: "20px", textAlign: "left" }}
              required
              sx={{
                ...sxStyle,

              }}
            >

              <Select
                id="sampleSelectionIndex"
                value={sampleSelectionIndex}
                onChange={(event) =>
                  setSampleSelectionIndex(event.target.value)
                }
                style={{ borderColor: "#525252" }}

              >
                <MenuItem value={0}>All Samples</MenuItem>
                <MenuItem value={1}>First 20000 Samples</MenuItem>
                <MenuItem value={2}>
                  Samples selected from 1/4 to 3/4 of the file
                </MenuItem>
              </Select>
            </FormControl>

          </Box>
          <FormControl>
            <LoadingButton
              sx={{
                mb: "20px",
                backgroundColor: "#00245A",
                width: "130px",
                color: "#ffffff",
                "&:hover": {
                  backgroundColor: "rgba(0, 36, 90, 0.8)", // Adjust the opacity as needed
                },
              }}
              variant="contained"
              disabled={isPreprocessingFetching}
              onClick={executePreprocessingPlugin}
              loading={loading}
            >
              Pre-process
            </LoadingButton>
          </FormControl>
        </Box>
        {/* starting the old version */}
      </Box>

      <Box className="analysis" style={{ marginTop: "40px" }}>
        <Box
          sx={{
            bgcolor: blackHeader,
            height: "10vh",
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            borderTopLeftRadius: "5px",
            borderTopRightRadius: "5px",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontSize: "24px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "normal",
              color: "#FFFFFF",
              mb: 0,
              pl: 3
            }}
            gutterBottom
          >
            Analysis Plugins
          </Typography>
        </Box>
        <Box
          sx={{
            bgcolor: containerColor,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            borderEndStartRadius: "5px",
            borderEndEndRadius: "5px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: "5px",
              mb: "5px",
            }}
          >
            <Typography
              variant="body1"
              display="block"
              sx={{
                fontSize: "20px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal",
                color: "black",
                mb: 3,
                mt: 3
              }}
              gutterBottom
            >
              Select the Analysis plugin
            </Typography>
          </Box>
          <Box sx={{ display: "flex", width: "100%", }}>
            <Grid
              container
              spacing={2}
              alignItems="center"

              marginTop={0}
              sx={{
                display: "flex",
                alignItems: "left",
                justifyContent: "center",
                maxHeight: "300px",
                width: "100%",
                overflow: "scroll",
                overflowX: "hidden",

              }}
            >
              {analyisPlugins.map((plugin) => (
                <Grid item xs={5} sm={5} md={3} marginTop={8} m={2} sx={{
                  display: "flex",
                  justifyContent: "center",
                }}>
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
          <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row"
          }}
          >
            <LoadingButton
              sx={{
                mt: 3,
                mb: 3,
                backgroundColor: "#00245A",
                color: "#ffffff",
                width: "200px",
                "&:hover": {
                  backgroundColor: "rgba(0, 36, 90, 0.8)", // Adjust the opacity as needed
                },
              }}
              variant="contained"
              disabled={isAnalysisFetching}
              onClick={executeAnalysisPlugin}
              loading={loadingAnalyse}
            >
              Install Libraries
            </LoadingButton>

            <LoadingButton
              sx={{
                ml:2,
                mt: 3,
                mb: 3,
                backgroundColor: "#00245A",
                color: "#ffffff",
                width: "100px",
                "&:hover": {
                  backgroundColor: "rgba(0, 36, 90, 0.8)", // Adjust the opacity as needed
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
      </Box>

      <Box className="analysis_summary" sx={{ mt: "40px", pb: "40px" }}>
        <Box
          sx={{
            bgcolor: blackHeader,
            height: "10vh",
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            borderTopLeftRadius: "5px",
            borderTopRightRadius: "5px",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontSize: "24px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "normal",
              color: "#FFFFFF",
              mb: 0,
              pl: 3
            }}
            gutterBottom
          >
            Analysis Summary
          </Typography>
        </Box>
        <Box
          sx={{
            bgcolor: containerColor,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderEndStartRadius: "5px",
            borderEndEndRadius: "5px",
          }}
        >
          <Box
            sx={{
              mt: "30px",
              width: "50%",
              mb: "30px",
              p: "20px",
              border: "2px solid #00245A",
              borderRadius: "5px",
              backgroundColor: "#E8E8E8"
            }}
          >
            <Typography variant="h5" sx={{ mb: "30px" }}>
              Analysis Summary 1
            </Typography>

            <Typography variant="body1">
              <strong>Insight Type:</strong> {insightTypeName}
            </Typography>

            {analysisResults.map((result, index) => (
              <Typography key={index} variant="body1">
                <strong style={{ display: "inline-block", width: "200px" }}>
                  {result.action}:
                </strong>{" "}
                <span>{result.probability}%</span>
              </Typography>
            ))}
          </Box>
        </Box>
        <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            mt:5
          }}
          >
            <Button
              sx={{
                
                backgroundColor: "#00245A",
                color: "#ffffff",
                width: "100px",
                "&:hover": {
                  backgroundColor: "rgba(0, 36, 90, 0.8)", // Adjust the opacity as needed
                },
              }}
              variant="contained"
             
            >
              Accept 
            </Button>

            <LoadingButton
              sx={{
                ml:2,
                backgroundColor: "red",
                color: "#ffffff",
                width: "100px",
                "&:hover": {
                  backgroundColor: "rgba(255, 0, 0, 0.8)", // Adjust the opacity as needed
                },
              }}
              variant="contained"
              
            >
              Reject
            </LoadingButton>
          </Box>
      </Box>
    </>
  );
};

export default PluginVerifyPage;
