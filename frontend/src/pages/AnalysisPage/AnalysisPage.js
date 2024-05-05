import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  FormControl,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  Select,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import PluginCardAnalysis from "../../components/PluginCardAnalysis/PluginCardAnalysis";
import AnalysisPluginModal from "../../components/AnalysisPluginModal/AnalysisPluginModal";
import { API_URL, queryKeys } from "../../constants";
import { useUser } from "../../contexts/UserContext";
import { getEmRawDetails } from "../../services/fileManage";
import { getFilteredPluginDetails } from "../../services/pluginService";
import { getFullName, bytesToMB } from "../../helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AnalysisPage.css";

const AnalysisPage = () => {
  const blackHeader = "#00245A";
  const containerColor = "#FFFFFF";
  const buttonColor = "#525252";
  const sxStyle = {
    width: "100%",
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
  };

  // new start
  const [emRawFileRecord, setEmRawFileRecord] = useState(null);
  const [downSamplingIndex, setDownSamplingIndex] = useState(0);
  const [fftSizeIndex, setFftSizeIndex] = useState(0);
  const [overLapPercentageIndex, setOverLapPercentageIndex] = useState(0);
  const [sampleSelectionIndex, setSampleSelectionIndex] = useState(0);
  const [checkedPlugin, setCheckedPlugin] = useState(0);
  const [isPreprocessingFetching, setIsPreprocessingFetching] = useState(false);
  const [isAnalysisFetching, setIsAnalysisFetching] = useState(false);
  const [loadingPreprocessing, setLoadingPreprocessing] = React.useState(false);
  const [loadingAnalyse, setLoadingAnalyse] = React.useState(false);
  const [analysisResults, setAnalysisResults] = useState([]);
  const { user } = useUser();
  const queryClient = useQueryClient();

  const [isAnalysisPluginModalOpen, setIsAnalysisPluginModalOpen] =
    useState(false);
  const [pluginModalId, setPluginModalId] = useState(null);
  const [pluginModalName, setPluginModalName] = useState(null);
  const [pluginModalIcon, setPluginModalIcon] = useState(null);
  const [pluginAuthorName, setPluginAuthorName] = useState(null);
  const [pluginModalDescription, setPluginModalDescription] = useState(null);

  const handleEmDataFile = (event) => {
    const foundObject = emRawData.find(
      (obj) => obj.em_raw_file_id === event.target.value
    );
    setEmRawFileRecord(foundObject);
    getPluginDetails(event.target.value, fftSizeIndex);
  };

  const executePreprocessingPlugin = () => {
    setLoadingPreprocessing(true);
    console.log("Down Sampling Index: " + downSamplingIndex);

    const fftValue = fftSizeIndex === 2048 ? 0 : 0;

    const headers = {
      "Content-Type": "application/json",
      Authorization: user["userData"]["token"],
      em_raw_file_id: emRawFileRecord?.em_raw_file_id,
      down_sampling_index: 0,
      fft_size_index: fftValue,
      overlap_percentage_index: overLapPercentageIndex,
      sample_selection_index: sampleSelectionIndex,
    };

    console.log(headers);

    axios
      .get(API_URL + "/plugin/preprocessing", { headers })
      .then((response) => {
        // console.log(response.data);
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
        setLoadingPreprocessing(false);
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
        setLoadingPreprocessing(false);
      });
  };

  const executeAnalysisPlugin = () => {
    setLoadingAnalyse(true);
    setIsAnalysisFetching(true);

    const headers = {
      "Content-Type": "application/json",
      Authorization: user["userData"]["token"],
      em_raw_file_id: emRawFileRecord.em_raw_file_id,
      analysis_plugin_id: checkedPlugin,
    };

    axios
      .get(API_URL + "/plugin/analysis", { headers })
      .then((response) => {
        console.log(response);
        const analysisResultObjects = Object.entries(
          response.data["output"]
        ).map(([key, value]) => ({
          action: key,
          probability: value,
        }));

        // console.log(analysisResultObjects);

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
    setCheckedPlugin(parseInt(id));
  };

  const handleClicked = (
    id,
    name,
    description,
    first_name,
    last_name,
    icon
  ) => {
    setPluginModalId(id);
    setPluginModalName(name);
    setPluginAuthorName(getFullName(first_name, last_name));
    setPluginModalDescription(description);
    setPluginModalIcon(icon);
    setIsAnalysisPluginModalOpen(true);
  };

  const handleClose = () => {
    setIsAnalysisPluginModalOpen(false);
  };

  const getPluginDetails = (emFileId, fftSizeIndexValue) => {
    if (fftSizeIndexValue !== 0 && emFileId !== null) {
      queryClient.prefetchQuery([queryKeys["getFilteredPluginDetails"]], () =>
        getFilteredPluginDetails(user, emFileId, fftSizeIndexValue)
      );
    }
  };

  const {
    data: emRawData,
    error: emRawError,
    isLoading: emRawIsLoading,
  } = useQuery({
    queryKey: [queryKeys["getEmRawDetails"]],
    queryFn: () => getEmRawDetails(user),
    enabled: false,
  });

  const {
    data: pluginData,
    error: pluginError,
    isLoading: pluginIsLoading,
  } = useQuery({
    queryKey: [queryKeys["getFilteredPluginDetails"]],
    queryFn: () =>
      getFilteredPluginDetails(
        user,
        emRawFileRecord?.em_raw_file_id,
        fftSizeIndex
      ),
    enabled: false,
  });

  useEffect(() => {
    if (user) {
      queryClient.prefetchQuery([queryKeys["getEmRawDetails"]], () =>
        getEmRawDetails(user)
      );
    }
  }, [user]);

  const [emDataFile, setEmDataFile] = useState();
  const [openPopup, setOpenPopup] = useState(false);
  const [reportName, setReportName] = useState("");
  const [reportNameError, setReportNameError] = useState("");

  const handleOpenPopup = () => {
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const validateReportName = (reportName) => {
    if (!reportName) {
      return "Report name is required";
    }

    return true;
  };

  const handleSave = async () => {
    const reportNameValidationResult = validateReportName(reportName);
    if (reportNameValidationResult !== true) {
      setReportNameError(reportNameValidationResult);

      return 0;
    }

    const pluginResponseData = analysisResults
      .map(
        (result) =>
          `<tr>
        <th>${result.action}:</th>
        <td>${result.probability}%</td>
      </tr>`
      )
      .join("")
      .replace(/\n/g, "");

    // console.log(pluginResponseData);
    // return 1;

    const userData = {
      report_visible_name: reportName,
      em_file_id: emRawFileRecord.em_raw_file_id,
      plugin_id: checkedPlugin,
      down_sampling_index: downSamplingIndex,
      fft_size_index: fftSizeIndex,
      overlap_size_index: overLapPercentageIndex,
      sample_selection_index: sampleSelectionIndex,
      plugin_response: pluginResponseData,
    };

    const response = await fetch(API_URL + "/plugin/analysis-report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: user["userData"]["token"],
        user_id: user["userData"]["user_id"],
      },
      body: JSON.stringify(userData),
    });

    setReportName("");

    toast.success("Report Created Successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setOpenPopup(false);
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
        author={pluginAuthorName}
        description={pluginModalDescription}
        iconPath={pluginModalIcon}
        open={isAnalysisPluginModalOpen}
        onClose={handleClose}
        modifyChecked={handleChecked}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 6,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontFamily: "roboto",
            fontStyle: "normal",
            fontWeight: 400,
            mt: 2,
          }}
          gutterBottom
        >
          Analysis
        </Typography>
      </Box>

      <Box className="file_selection">
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
              pl: 3,
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
            alignContent: "center",
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
              alignContent: "left",
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
              {!emRawFileRecord && (
                <InputLabel id="dropdown-label-1" shrink={false}>
                  Select
                </InputLabel>
              )}
              <Select
                labelId="dropdown-label-1"
                id="dropdown-1"
                value={emRawFileRecord?.em_raw_file_id}
                onChange={handleEmDataFile}
                style={{ borderColor: "#525252" }}
              >
                {emRawData?.map((emRawRecord) => (
                  <MenuItem value={emRawRecord.em_raw_file_id}>
                    {emRawRecord.em_raw_file_visible_name}
                  </MenuItem>
                ))}
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
              display: emRawFileRecord ? "flex" : "none",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              backgroundColor: "#E8E8E8",
            }}
          >
            <InsertDriveFileIcon sx={{ fontSize: "75px", color: "#00245A" }} />

            <Typography variant="h5" sx={{ mb: "10px" }}>
              <strong>{emRawFileRecord?.em_raw_file_visible_name}</strong>
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
              }}
            >
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Sampling Rate:</strong> {emRawFileRecord?.sampling_rate}{" "}
                MHz
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Center Frequency:</strong>{" "}
                {emRawFileRecord?.center_frequency} MHz
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Device Name:</strong> {emRawFileRecord?.device_name}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>File Size:</strong>{" "}
                {bytesToMB(emRawFileRecord?.em_raw_cfile_file_size) + " MB"}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box className="pre_processing" style={{ marginTop: "40px" }}>
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
              pl: 3,
            }}
            gutterBottom
          >
            Pre-processing
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
            alignContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column", // Horizontal layout
              width: "50%",
              mt: 3,
              alignItems: "left",
              alignContent: "left",
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
                value={downSamplingIndex}
                onChange={(event) => setDownSamplingIndex(event.target.value)}
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
              alignContent: "left",
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
                    onChange={(event) => {
                      setFftSizeIndex(event.target.value);
                      getPluginDetails(
                        emRawFileRecord?.em_raw_file_id,
                        event.target.value
                      );
                    }}
                    label="FFT Size"
                    style={{ borderColor: "#525252" }}
                  >
                    <MenuItem value={1024}>1024</MenuItem>
                    <MenuItem value={2048}>2048</MenuItem>
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
                  <InputLabel id="dropdown-label-overLapPercentageIndex">
                    Overlap Size
                  </InputLabel>
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
              alignContent: "left",
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
              loading={loadingPreprocessing}
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
              pl: 3,
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
            {!(pluginData && pluginData?.length !== 0) && (
              <Typography
                variant="body1"
                display="block"
                sx={{
                  fontSize: "25px",
                  fontStyle: "normal",
                  lineHeight: "normal",
                  fontWeight: "bold",
                  color: "grey",
                  mb: 3,
                  mt: 3,
                }}
                gutterBottom
              >
                Not Available !
              </Typography>
            )}

            {pluginData && pluginData?.length !== 0 && (
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
                  mt: 3,
                }}
                gutterBottom
              >
                Select the Analysis plugin
              </Typography>
            )}
          </Box>
          <Box sx={{ display: "flex", width: "100%" }}>
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
              {pluginData?.map((plugin) => (
                <Grid
                  item
                  xs={5}
                  sm={5}
                  md={3}
                  marginTop={8}
                  m={2}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <PluginCardAnalysis
                    id={plugin.plugin_id}
                    name={plugin.plugin_name}
                    description={plugin.plugin_description}
                    firstName={plugin.first_name}
                    lastName={plugin.last_name}
                    imageUrl={plugin.icon_filepath}
                    isChecked={
                      plugin.plugin_id === checkedPlugin ? true : false
                    }
                    modifyChecked={handleChecked}
                    handleClicked={handleClicked}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
          {pluginData && pluginData?.length !== 0 && (
            <LoadingButton
              sx={{
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
          )}
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
              pl: 3,
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
              backgroundColor: "#E8E8E8",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                mb: "30px",
                display: "flex",
                justifyContent: "center",
                fontWeight: "bold",
              }}
            >
              Result
            </Typography>
            {!(analysisResults && analysisResults?.length !== 0) && (
              <Typography
                variant="body1"
                display="block"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "25px",
                  fontStyle: "normal",
                  lineHeight: "normal",
                  fontWeight: "bold",
                  color: "grey",
                  mb: 3,
                  mt: 3,
                }}
                gutterBottom
              >
                Not Available !
              </Typography>
            )}

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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: "40px",
          }}
        >
          <Button
            sx={{
              backgroundColor: "#00245A",
              color: "#ffffff",
              width: "150px",
              "&:hover": {
                backgroundColor: "rgba(0, 36, 90, 0.8)", // Adjust the opacity as needed
              },
            }}
            variant="contained"
            onClick={handleOpenPopup}
          >
            Save Analysis
          </Button>

          <Dialog open={openPopup} onClose={handleClosePopup}>
            <Typography variant="h5" sx={{ ml: 3, mt: 1, fontWeight: "bold" }}>
              Add Report Name
            </Typography>
            <DialogContent sx={{ width: "500px", height: "120px" }}>
              <TextField
                autoFocus
                // margin="dense"
                label="Enter Title for Analysis"
                fullWidth
                sx={{
                  ...sxStyle,
                }}
                value={reportName}
                onChange={(e) => setReportName(e.target.value)}
                error={reportNameError !== ""}
                helperText={reportNameError}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClosePopup} sx={{ color: "#00245A" }}>
                Cancel
              </Button>
              <Button onClick={handleSave} sx={{ color: "#00245A" }}>
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </>
  );
};

export default AnalysisPage;
