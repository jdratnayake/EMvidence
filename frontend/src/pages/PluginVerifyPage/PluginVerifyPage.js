import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import {
  Box,
  FormControl,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  Select,
  CardContent,
  Card,
} from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import AnalysisPluginModal from "../../components/AnalysisPluginModal/AnalysisPluginModal";
import { API_URL, queryKeys } from "../../constants";
import { useUser } from "../../contexts/UserContext";
import { getPluginFullDetails } from "../../services/pluginService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./PluginVerifyPage.css";
import { getFullName, bytesToMB } from "../../helper";

const PluginVerifyPage = () => {
  const blackHeader = "#00245A";
  const containerColor = "#FFFFFF";
  const buttonColor = "#525252";

  // Filter variables
  const { pluginId } = useParams();
  const { user } = useUser();
  const queryClient = useQueryClient();
  // Loading related features
  const [isPreprocessingFetching, setIsPreprocessingFetching] = useState(false);
  const [isAnalysisFetching, setIsAnalysisFetching] = useState(false);
  const [loadingPreprocessing, setLoadingPreprocessing] = React.useState(false);
  const [loadingAnalyse, setLoadingAnalyse] = React.useState(false);
  const [analysisResults, setAnalysisResults] = useState([]);
  // Preprocessing features
  const [downSamplingIndex, setDownSamplingIndex] = useState(0);
  const [fftSizeIndex, setFftSizeIndex] = useState(0);
  const [overLapPercentageIndex, setOverLapPercentageIndex] = useState(0);
  const [sampleSelectionIndex, setSampleSelectionIndex] = useState(0);
  // Modal related features
  const [isAnalysisPluginModalOpen, setIsAnalysisPluginModalOpen] =
    useState(false);

  const executePreprocessingPlugin = () => {
    setLoadingPreprocessing(true);
    console.log("Down Sampling Index: " + downSamplingIndex);

    const headers = {
      "Content-Type": "application/json",
      Authorization: user["userData"]["token"],
      em_raw_file_id: data?.emFile.em_raw_file_id,
      down_sampling_index: downSamplingIndex,
      fft_size_index: fftSizeIndex,
      overlap_percentage_index: overLapPercentageIndex,
      sample_selection_index: sampleSelectionIndex,
    };

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
      em_raw_file_id: data?.emFile.em_raw_file_id,
      analysis_plugin_id: data?.plugin.plugin_id,
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

  const { data, error, isLoading } = useQuery({
    queryKey: [queryKeys["getPluginFullDetails"]],
    queryFn: () => getPluginFullDetails(user, pluginId),
    enabled: false,
  });

  useEffect(() => {
    if (user) {
      queryClient.prefetchQuery([queryKeys["getPluginFullDetails"]], () =>
        getPluginFullDetails(user, pluginId)
      );
    }
  }, [user]);

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
        id={data?.plugin.plugin_id}
        name={data?.plugin.plugin_name}
        description={data?.plugin.plugin_description}
        author={getFullName(data?.plugin.first_name, data?.plugin.last_name)}
        iconPath={data?.plugin.icon_filepath}
        open={isAnalysisPluginModalOpen}
        onClose={() => setIsAnalysisPluginModalOpen(false)}
        modifyChecked={() => {}}
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
          Verify Plugin
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
              mt: "0px",
              width: "50%",
              mb: "40px",
              p: "20px",
              border: "2px solid #00245A",
              borderRadius: "5px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              backgroundColor: "#E8E8E8",
            }}
          >
            <InsertDriveFileIcon sx={{ fontSize: "75px", color: "#00245A" }} />

            <Typography variant="h5" sx={{ mb: "10px" }}>
              <strong>{data?.emFile.em_raw_file_visible_name}</strong>
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
              }}
            >
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Sampling Rate:</strong> {data?.emFile.sampling_rate} Hz
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Center Frequency:</strong>{" "}
                {data?.emFile.center_frequency} Hz
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Device Name:</strong> {data?.emFile.device_name}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>File Size:</strong>{" "}
                {bytesToMB(data?.emFile.em_raw_cfile_file_size) + " MB"}
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
                <Box
                  sx={{
                    minWidth: 200,
                    maxWidth: 200,
                    boxShadow:
                      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                    borderRadius: "6px",
                    "&:hover": {
                      boxShadow: "0px 0px 10px rgba(0,36,90, 1)",
                    },
                  }}
                >
                  <Card
                    sx={{ height: 200 }}
                    onClick={() => setIsAnalysisPluginModalOpen(true)}
                  >
                    <CardContent>
                      <Grid
                        container
                        alignItems="center"
                        justifyContent="center"
                      >
                        <img
                          src={data?.plugin.icon_filepath}
                          alt="Logo"
                          style={{
                            width: "70px",
                            height: "70px",
                            alignContent: "center",
                            borderRadius: "50%",
                          }}
                        />
                      </Grid>

                      <Typography
                        sx={{ fontSize: 16 }}
                        color="text.primary"
                        gutterBottom
                        align="center"
                        marginTop={2}
                      >
                        {data?.plugin.plugin_name}
                      </Typography>

                      {/* <Typography color="text.secondary" marginTop={2} align="center">
              1.5k
            </Typography> */}
                    </CardContent>{" "}
                  </Card>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
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
              // disabled={isAnalysisFetching}
              // onClick={executeAnalysisPlugin}
              // loading={loadingAnalyse}
            >
              Install Libraries
            </LoadingButton>

            <LoadingButton
              sx={{
                ml: 2,
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
            <Typography variant="h5" sx={{ mb: "30px" }}>
              Result
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            mt: 5,
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
              ml: 2,
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
