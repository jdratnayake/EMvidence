import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PluginUploadPage.css";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Link from "@mui/material/Link";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { API_URL, queryKeys } from "../../constants";
import { useUser, addUser } from "../../contexts/UserContext";

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
  const { user, addUser } = useUser();

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

  const handleSubmit = async (event) => {
    event.preventDefault();

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
          const userData = {
            ...user["userData"],
            successMessage: "Plugin Upload Request Submitted Successfully",
          };

          addUser({ userData });

          console.log(responseData["success"]);

          navigate("/plugin-list");
        }
      })
      .catch((error) => {
        // Handle error response
        console.error("Error submitting form data with files:", error);
      });
  };

  return (
    <Container style={containerStyle} maxWidth="md">
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
            href="#"
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
            Guidlines
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
              >
                <MenuItem value="1">Arduino</MenuItem>
                <MenuItem value="2">Raspberry Pi</MenuItem>
              </Select>
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
              >
                <MenuItem value="1">EM File 1</MenuItem>
                <MenuItem value="2">EM File 2</MenuItem>
                <MenuItem value="3">EM File 3 </MenuItem>
                <MenuItem value="4">EM File 4</MenuItem>
                <MenuItem value="5">EM File 5</MenuItem>
              </Select>
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
              >
                <MenuItem value="8">8 MHz</MenuItem>
                <MenuItem value="10">10 MHz</MenuItem>
                <MenuItem value="12.5">12.5 MHz</MenuItem>
                <MenuItem value="16">16 MHz</MenuItem>
                <MenuItem value="20">20 MHz</MenuItem>
              </Select>
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
                  <InputAdornment position="end">Hz</InputAdornment>
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
              >
                <MenuItem value={1}>1024</MenuItem>
                <MenuItem value={2}>2048</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
            sx={{ display: lessThanSm ? "none" : "block" }}
          ></Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
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
                  border: "1px solid #bbbbbb",
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
                      color: "#00245A",
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
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl
              fullWidth
              required
              display="flex"
              justifyContent="flex-start"
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
                  border: "1px solid #bbbbbb",
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
                      color: "#00245A",
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
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
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
                    border: "1px solid #bbbbbb",
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
                        color: "#00245A",
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
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
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
                    border: "1px solid #bbbbbb",
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
                        color: "#00245A",
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
