import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import { Container } from "@mui/system";
import {
  Typography,
  Button,
  Box,
  TextField,
  InputAdornment,
  Link,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  useTheme,
  useMediaQuery,
  Grid,
  FormHelperText,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { API_URL, queryKeys } from "../../constants";
import { useUser, addUser } from "../../contexts/UserContext";
import { getDeviceDetails } from "../../services/deviceService";
import { getEmRawDetails } from "../../services/fileManage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./PluginUploadPage.css";

function PluginUploadPage() {
  const containerStyle = {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "8px",
    marginTop: "80px",
  };

  const sxStyle = {
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

  const theme = useTheme();
  const lessThanSm = useMediaQuery(theme.breakpoints.down("sm"));
  const lessThanMd = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const [pluginName, setPluginName] = useState(null);
  const [description, setDescription] = useState(null);
  const [deviceName, setDeviceName] = useState(null);
  const [emDataFile, setEmDataFile] = useState(null);
  const [samplingRate, setSamplingRate] = useState(null);
  const [centerFrequency, setCenterFrequency] = useState(null);
  const [fftSize, setFftSize] = useState(null);
  const [selectedFileIcon, setSelectedFileIcon] = useState(null);
  const [selectedFileDependency, setSelectedFileDependency] = useState(null);
  const [selectedPluginFile, setSelectedPluginFile] = useState(null);
  const [selectedMlModel, setSelectedMlModel] = useState(null);
  const { user } = useUser();
  const queryClient = useQueryClient();

  const [pluginNameError, setPluginNameError] = useState(null);
  const [descriptionError, setDescriptionError] = useState(null);
  const [deviceNameError, setDeviceNameError] = useState(null);
  const [emDataFileError, setEmDataFileError] = useState(null);
  const [samplingRateError, setSamplingRateError] = useState(null);
  const [centerFrequencyError, setCenterFrequencyError] = useState(null);
  const [fftSizeError, setFftSizeError] = useState(null);
  const [selectedFileIconError, setSelectedFileIconError] = useState(null);
  const [selectedFileDependencyError, setSelectedFileDependencyError] =
    useState(null);
  const [selectedPluginFileError, setSelectedPluginFileError] = useState(null);
  const [selectedMlModelError, setSelectedMlModelError] = useState(null);

  const handleFileIcon = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file != null) {
      setSelectedFileIcon(file);
    }
  };

  const handleFileDependency = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file != null) {
      setSelectedFileDependency(file);
    }
  };

  const handleFilePlugin = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file != null) {
      setSelectedPluginFile(file);
    }
  };

  const handleMlModel = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file != null) {
      setSelectedMlModel(file);
    }
  };

  const clearFormData = () => {
    setPluginName(null);
    setDescription(null);
    setDeviceName(null);
    setEmDataFile(null);
    setSamplingRate(null);
    setCenterFrequency(null);
    setFftSize(null);
    setSelectedFileIcon(null);
    setSelectedFileDependency(null);
    setSelectedPluginFile(null);
    setSelectedMlModel(null);
  };

  const clearErrorData = () => {
    setPluginNameError(null);
    setDescriptionError(null);
    setDeviceNameError(null);
    setEmDataFileError(null);
    setSamplingRateError(null);
    setCenterFrequencyError(null);
    setFftSizeError(null);
    setSelectedFileIconError(null);
    setSelectedFileDependencyError(null);
    setSelectedPluginFileError(null);
    setSelectedMlModelError(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    clearErrorData();

    const formData = new FormData();
    formData.append("plugin_name", pluginName);
    formData.append("description", description);
    formData.append("device_id", deviceName);
    formData.append("em_data_file_id", emDataFile);
    formData.append("sampling_rate", samplingRate);
    formData.append("center_frequency", centerFrequency);
    formData.append("fft_size", fftSize);
    formData.append("user_id", user["userData"]["user_id"]);
    formData.append("icon", selectedFileIcon);
    formData.append("dependency_list", selectedFileDependency);
    formData.append("plugin_script_file", selectedPluginFile);
    formData.append("plugin_ml_model", selectedMlModel);

    fetch(API_URL + "/plugin/upload", {
      method: "POST",
      headers: {
        Authorization: user["userData"]["token"],
      },
      body: formData,
    })
      .then(async (response) => {
        const responseData = await response.json();

        // Handle success response
        if (responseData.hasOwnProperty("success")) {
          toast.success("Plugin Upload Request Submitted Successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          console.log(responseData["success"]);
          clearFormData();

          setTimeout(() => {
            navigate("/plugin-upload-list");
          }, 5000);
        } else if (responseData.hasOwnProperty("error")) {
          if (responseData["error"].hasOwnProperty("plugin_name")) {
            setPluginNameError(responseData["error"]["plugin_name"]);
          }

          if (responseData["error"].hasOwnProperty("description")) {
            setDescriptionError(responseData["error"]["description"]);
          }

          if (responseData["error"].hasOwnProperty("center_frequency")) {
            setCenterFrequencyError(responseData["error"]["center_frequency"]);
          }

          ////

          if (responseData["error"].hasOwnProperty("device_id")) {
            setDeviceNameError(responseData["error"]["device_id"]);
          }

          if (responseData["error"].hasOwnProperty("em_data_file_id")) {
            setEmDataFileError(responseData["error"]["em_data_file_id"]);
          }

          if (responseData["error"].hasOwnProperty("sampling_rate")) {
            setSamplingRateError(responseData["error"]["sampling_rate"]);
          }

          if (responseData["error"].hasOwnProperty("fft_size")) {
            setFftSizeError(responseData["error"]["fft_size"]);
          }

          if (responseData["error"].hasOwnProperty("icon")) {
            setSelectedFileIconError(responseData["error"]["icon"]);
          }

          if (responseData["error"].hasOwnProperty("dependency_list")) {
            setSelectedFileDependencyError(
              responseData["error"]["dependency_list"]
            );
          }

          if (responseData["error"].hasOwnProperty("plugin_script_file")) {
            setSelectedPluginFileError(
              responseData["error"]["plugin_script_file"]
            );
          }

          if (responseData["error"].hasOwnProperty("plugin_ml_model")) {
            setSelectedMlModelError(responseData["error"]["plugin_ml_model"]);
          }
        }
      })
      .catch((error) => {
        // Handle error response
        console.error("Error submitting form data with files:", error);
      });
  };

  const { data, error, isLoading } = useQuery({
    queryKey: [queryKeys["getDeviceDetails"]],
    queryFn: () => getDeviceDetails(user),
    enabled: false,
  });

  const {
    data: emRawData,
    error: emRawError,
    isLoading: emRawIsLoading,
  } = useQuery({
    queryKey: [queryKeys["getEmRawDetails"]],
    queryFn: () => getEmRawDetails(user),
    enabled: false,
  });

  useEffect(() => {
    if (user) {
      queryClient.prefetchQuery([queryKeys["getDeviceDetails"]], () =>
        getDeviceDetails(user)
      );

      queryClient.prefetchQuery([queryKeys["getEmRawDetails"]], () =>
        getEmRawDetails(user)
      );
    }
  }, [user]);

  return (
    <Container style={containerStyle} maxWidth="md">
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

      <Typography
        variant="h4"
        color="textPrimary"
        align="center"
        marginBottom={0}
        marginLeft={0}
        sx={{ p: 3 }}
      >
        Upload Plugin
      </Typography>

      <Grid container justifyContent="flex-end">
        <Grid item sx={{ marginBottom: 3 }}>
          <Link
            href="/guidlines.pdf"
            target="_blank"
            rel="noopener noreferrer"
            variant="body2"
            color={"rgba(0, 36, 90, 0.8)"}
            sx={{
              "&:hover": {
                color: "#00245A",
              },
              fontSize: 20,
              fontWeight: 1,
            }}
          >
            Guidelines
          </Link>
        </Grid>
      </Grid>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ mt: 3 }}
        display="flex"
        flexDirection="column" // Change flex direction to row
        alignItems="center"
        justifyContent="center"
      >
        <Grid container spacing={5} align="left">
          <Grid item xs={12} sm={6}>
            <TextField
              name="Plugin Name"
              required
              fullWidth
              id="pluginName"
              label="Plugin Name"
              autoFocus
              sx={{
                ...sxStyle,
              }}
              value={pluginName}
              onChange={(event) => setPluginName(event.target.value)}
              error={pluginNameError !== null}
              helperText={pluginNameError}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="des"
              label="Description"
              name="Description"
              sx={{
                ...sxStyle,
              }}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              error={descriptionError !== null}
              helperText={descriptionError}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl
              fullWidth
              style={{ marginBottom: "0px", textAlign: "left" }}
              required
              sx={{
                ...sxStyle,
              }}
            >
              <InputLabel id="dropdown-label-1">Device Name</InputLabel>
              <Select
                labelId="dropdown-label-1"
                id="dropdown-1"
                value={deviceName}
                onChange={(event) => setDeviceName(event.target.value)}
                label="Device Name"
                style={{ borderColor: "#525252" }}
                error={deviceNameError !== null}
              >
                {data?.map((device) => (
                  <MenuItem value={device.device_id}>
                    {device.device_name}
                  </MenuItem>
                ))}
              </Select>
              {deviceNameError !== null && (
                <FormHelperText error>{deviceNameError}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required sx={{ ...sxStyle }}>
              <InputLabel id="EMdataFile">EM data file</InputLabel>
              <Select
                id="EMdataFile"
                // value={samplingRate}
                // onChange={handleDropdownChange3}
                label="EM data file"
                style={{ borderColor: "#525252" }}
                value={emDataFile}
                onChange={(event) => setEmDataFile(event.target.value)}
                error={emDataFileError !== null}
              >
                {emRawData?.map((emRawFile) => (
                  <MenuItem value={emRawFile.em_raw_file_id}>
                    {emRawFile.em_raw_file_visible_name}
                  </MenuItem>
                ))}
              </Select>
              {emDataFileError !== null && (
                <FormHelperText error>{emDataFileError}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl
              fullWidth
              required
              sx={{
                ...sxStyle,
              }}
            >
              <InputLabel id="samplingRate">Sampling Rate</InputLabel>
              <Select
                id="samplingRate"
                // value={samplingRate}
                // onChange={handleDropdownChange3}
                label="Sampling Rate"
                style={{ borderColor: "#525252" }}
                value={samplingRate}
                onChange={(event) => setSamplingRate(event.target.value)}
                error={samplingRateError !== null}
              >
                <MenuItem value="8">8 MHz</MenuItem>
                <MenuItem value="10">10 MHz</MenuItem>
                <MenuItem value="12.5">12.5 MHz</MenuItem>
                <MenuItem value="16">16 MHz</MenuItem>
                <MenuItem value="20">20 MHz</MenuItem>
              </Select>
              {samplingRateError !== null && (
                <FormHelperText error>{samplingRateError}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id="centerFreq"
              type="number"
              label="Center Frequency"
              variant="outlined"
              fullWidth
              sx={{
                ...sxStyle,
              }}
              value={centerFrequency}
              onChange={(event) => setCenterFrequency(event.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">MHz</InputAdornment>
                ),
                inputMode: "numeric",
                pattern: "/^-?d+(?:.d+)?$/g",
                inputProps: {
                  min: 0,
                  step: 0.01,
                  style: { textAlign: "center" },
                },
              }}
              required
              error={centerFrequencyError !== null}
              helperText={centerFrequencyError}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl
              fullWidth
              required
              sx={{
                ...sxStyle,
              }}
            >
              <InputLabel id="fftSizeLabel">FFT Size</InputLabel>
              <Select
                id="fftSize"
                // onChange={handleDropdownChange3}
                label="FFT Size"
                style={{ borderColor: "#525252" }}
                value={fftSize}
                onChange={(event) => setFftSize(event.target.value)}
                error={fftSizeError !== null}
              >
                <MenuItem value={1024}>1024</MenuItem>
                <MenuItem value={2048}>2048</MenuItem>
              </Select>
              {fftSizeError !== null && (
                <FormHelperText error>{fftSizeError}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
            sx={{ display: lessThanSm ? "none" : "block" }}
          ></Grid>

          <Grid item xs={12} sm={6}>
            <FormControl
              fullWidth
              required
              error={selectedFileIconError !== null}
            >
              <label style={{ color: "grey" }}>
                Icon Upload (accepting formats: .jpeg, .jpg, .png)
              </label>
              <Box
                sx={{
                  backgroundColor: "white",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "left",
                  justifyContent: "left",
                  marginLeft: 0,
                  border: selectedFileIconError
                    ? "1px solid red"
                    : "1px solid #bbbbbb",
                  borderRadius: "4px",
                  "&:hover": {
                    border: "2px solid #00245A", // Border color on hover
                  },
                }}
              >
                <div
                  className="fileUploadInput"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "5px",
                    width: "100%",
                  }}
                >
                  <AttachFileIcon
                    sx={{
                      color: selectedFileIconError ? "red" : "#00245A",
                      mt: "14px",
                      ml: "4px",
                      fontSize: "25px",
                    }}
                  />
                  <input
                    type="file"
                    onChange={handleFileIcon}
                    accept=".jpg, .png, .jpeg"
                    style={{
                      color: selectedFileIcon ? "black" : "grey",
                      height: "53px",
                      border: "none",
                      left: "-20px",
                    }}
                  />
                </div>
              </Box>
              {selectedFileIconError && (
                <FormHelperText>{selectedFileIconError}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl
              fullWidth
              required
              display="flex"
              justifyContent="flex-start"
              error={selectedFileDependencyError !== null}
            >
              <label style={{ color: "grey" }}>
                Dependency list (accepting format: .txt)
              </label>

              <Box
                sx={{
                  backgroundColor: "white",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "left",
                  justifyContent: "left",
                  marginLeft: 0,
                  border: selectedFileDependencyError
                    ? "1px solid red"
                    : "1px solid #bbbbbb",
                  borderRadius: "4px",
                  "&:hover": {
                    border: "2px solid #00245A", // Border color on hover
                  },
                }}
              >
                <div
                  className="fileUploadInput"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "5px",
                    width: "100%",
                  }}
                >
                  <AttachFileIcon
                    sx={{
                      color: selectedFileDependencyError ? "red" : "#00245A",
                      mt: "14px",
                      ml: "4px",
                      fontSize: "25px",
                    }}
                  />
                  <input
                    type="file"
                    onChange={handleFileDependency}
                    accept=".txt"
                    style={{
                      color: selectedFileDependency ? "black" : "grey",
                      height: "53px",
                      border: "none",
                      left: "-20px",
                    }}
                  />
                </div>
              </Box>
              {selectedFileDependencyError && (
                <FormHelperText>{selectedFileDependencyError}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl
              fullWidth
              required
              error={selectedPluginFileError !== null}
            >
              <Grid
                justifyContent="flex-start"
                display="flex"
                flexDirection="column"
              >
                <label style={{ color: "grey" }}>
                  Plugin file (accepting format: .py)
                </label>
                <Box
                  sx={{
                    backgroundColor: "white",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "left",
                    justifyContent: "left",
                    marginLeft: 0,
                    border: selectedPluginFileError
                      ? "1px solid red"
                      : "1px solid #bbbbbb",
                    borderRadius: "4px",
                    "&:hover": {
                      border: "2px solid #00245A", // Border color on hover
                    },
                  }}
                >
                  <div
                    className="fileUploadInput"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: "5px",
                      width: "100%",
                    }}
                  >
                    <AttachFileIcon
                      sx={{
                        color: selectedPluginFileError ? "red" : "#00245A",
                        mt: "14px",
                        ml: "4px",
                        fontSize: "25px",
                      }}
                    />
                    <input
                      type="file"
                      onChange={handleFilePlugin}
                      accept=".py"
                      style={{
                        color: selectedPluginFile ? "black" : "grey",
                        height: "53px",
                        border: "none",
                        left: "-20px",
                      }}
                    />
                  </div>
                </Box>
              </Grid>
              {selectedPluginFileError && (
                <FormHelperText>{selectedPluginFileError}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl
              fullWidth
              required
              error={selectedMlModelError !== null}
            >
              <Grid
                justifyContent="flex-start"
                display="flex"
                flexDirection="column"
              >
                <label style={{ color: "grey" }}>
                  {" "}
                  Machine learning model (accepting format: .h5, .joblib)
                </label>
                <Box
                  sx={{
                    backgroundColor: "white",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "left",
                    justifyContent: "left",
                    marginLeft: 0,
                    border: selectedMlModelError
                      ? "1px solid red"
                      : "1px solid #bbbbbb",
                    borderRadius: "4px",
                    "&:hover": {
                      border: "2px solid #00245A", // Border color on hover
                    },
                  }}
                >
                  <div
                    className="fileUploadInput"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: "5px",
                      width: "100%",
                    }}
                  >
                    <AttachFileIcon
                      sx={{
                        color: selectedMlModelError ? "red" : "#00245A",
                        mt: "14px",
                        ml: "4px",
                        fontSize: "25px",
                      }}
                    />
                    <input
                      type="file"
                      onChange={handleMlModel}
                      accept=".h5"
                      style={{
                        color: selectedMlModel ? "black" : "grey",
                        height: "53px",
                        border: "none",
                        left: "-20px",
                      }}
                    />
                  </div>
                </Box>
              </Grid>
              {selectedMlModelError && (
                <FormHelperText>{selectedMlModelError}</FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>

        <Typography align="center">
          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 5,
              mb: 5,
              bgcolor: "#00245A",
              color: "white",
              pt: 1,
              pb: 1,
              width: "150px",
              "&:hover": {
                bgcolor: "rgba(0, 36, 90, 0.8)",
              },
            }}
          >
            Upload
          </Button>
        </Typography>
      </Box>
    </Container>
  );
}

export default PluginUploadPage;
