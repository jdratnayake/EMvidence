import { CssBaseline, Typography } from "@mui/material";
import { Container, display, width } from "@mui/system";
import React, { useState, useEffect } from "react";
import "./PluginUploadPage.css";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import CryptoJS from "crypto-js";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Resumable from "resumablejs";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../../components/NavBar/NavBar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import pako from "pako";
import { OutlinedInput } from "@mui/material";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Link from '@mui/material/Link';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Input,
  useTheme,
  useMediaQuery
} from "@mui/material";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import Grid from "@mui/material/Grid";
import { List } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";

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
  }

  const theme = useTheme();
  const lessThanSm = useMediaQuery(theme.breakpoints.down("sm"));
  const lessThanMd = useMediaQuery(theme.breakpoints.down("md"));
  const [pluginName, setSelectedPluginName] = useState(null);
  const [description, setDescription] = useState(null);
  const [deviceName, setDeviceName] = useState(null);
  const [emDataFile, setemDataFile] = useState(null);
  const [samplingRate, setSamplingRate] = useState(null);
  const [centerFreq, setCenterFreq] = useState(null);
  const [fttSize, setFttSize] = useState(null);
  const [selectedFileIcon, setSelectedFileIcon] = useState(null);
  const [selectedFileDependency, setSelectedFileDependency] = useState(null);
  const [selectedPluginFile, setSelectedPluginFile] = useState(null);
  const [mlModel, setMlModel] = useState(null);


  const handleDeviceName = (event) => {
    setDeviceName(event.target.value);
  };



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
      setMlModel(file);
    }

  };

  return (

    <Container style={containerStyle} maxWidth="md">
      <Typography
        variant="h4"
        color="textPrimary"
        align="center"
        marginBottom={0}
        marginLeft={0}
        sx={{p:3}}
      >
        Upload Plugin
      </Typography>

      <Grid container justifyContent="flex-end">
        <Grid item sx={{ marginBottom: 3 }}>
          <Link href="#" variant="body2" color={'rgba(0, 36, 90, 0.8)'}
            sx={{
              '&:hover': {
                color: '#00245A',
              },
              fontSize: 20,
              fontWeight: 1
            }}>
            Guidlines
          </Link>
        </Grid>
      </Grid>


      <Box component="form" onSubmit={() => { }} sx={{ mt: 3, }}
        display="flex"
        flexDirection="column" // Change flex direction to row
        alignItems="center"
        justifyContent="center">

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
                ...sxStyle
              }}
              onChange={() => { }}
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
                ...sxStyle
              }}
              onChange={() => { }}
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
                  onChange={handleDeviceName}
                  label="Device Name"
                  style={{ borderColor: "#525252" }}

                >
                  <MenuItem value="Arduino">Arduino</MenuItem>
                  <MenuItem value="Raspberry Pi">Raspberry Pi</MenuItem>
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
            <FormControl fullWidth required
              sx={{
                ...sxStyle
              }}>
              <InputLabel id="samplingRate">Sampling Rate</InputLabel>
              <Select
                id="samplingRate"
                // value={samplingRate}
                // onChange={handleDropdownChange3}
                label="Sampling Rate"
                style={{ borderColor: "#525252" }}
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
                ...sxStyle
              }}
              // value={centerFreq}
              // onChange={handleDropdownChange2}

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
            <FormControl fullWidth required
              sx={{
                ...sxStyle
              }}>
              <InputLabel id="fttSizeLabel">FTT Size</InputLabel>
              <Select
                id="fttSize"
                value={fttSize}
                // onChange={handleDropdownChange3}
                label="FTT Size"
                style={{ borderColor: "#525252" }}
              >
                <MenuItem value={1}>1024</MenuItem>
                <MenuItem value={2}>2048</MenuItem>
               
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} sx={{display: lessThanSm ? "none" : "block" }}>
           
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required >
              <label style={{ color: 'grey' }}>Icon Upload (accepting formats: .jpg, .png, .jpeg)</label>
              <Box
                sx={{
                  backgroundColor: "white",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "left",
                  justifyContent: "left",
                  marginLeft: 0,
                  border: '1px solid #bbbbbb',
                  borderRadius: '4px',
                  '&:hover': {
                    border: "2px solid #00245A", // Border color on hover
                  },
                }}
              >
                <div className="fileUploadInput" style={{ display: 'flex', flexDirection: 'row', marginTop: '5px', width: '100%' }}>
                  <AttachFileIcon sx={{ color: '#00245A', mt: '14px', ml: '4px', fontSize: "25px" }} />
                  <input
                    type="file"
                    onChange={handleFileIcon}
                    accept=".jpg, .png, .jpeg"
                    style={{
                      color: selectedFileIcon ? 'black' : 'grey', height: '53px',
                      border: 'none', left: '-20px'
                    }}

                  />
                </div>
              </Box>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required display="flex" justifyContent="flex-start" >
              <label style={{ color: 'grey' }}>Dependency list (accepting format: .txt)</label>
              <Box
                sx={{
                  backgroundColor: "white",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "left",
                  justifyContent: "left",
                  marginLeft: 0,
                  border: '1px solid #bbbbbb',
                  borderRadius: '4px',
                  '&:hover': {
                    border: "2px solid #00245A", // Border color on hover
                  },
                }}
              >
                <div className="fileUploadInput" style={{
                  display: 'flex', flexDirection: 'row', marginTop: '5px', width: '100%'
                }}

                >
                  <AttachFileIcon sx={{ color: '#00245A', mt: '14px', ml: '4px', fontSize: "25px" }} />
                  <input
                    type="file"
                    onChange={handleFileDependency}
                    accept=".txt"
                    style={{
                      color: selectedFileIcon ? 'black' : 'grey', height: '53px',
                      border: 'none', left: '-20px'
                    }}
                  />
                </div>
              </Box>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required >
              <Grid justifyContent="flex-start" display="flex" flexDirection="column">
                <label style={{ color: 'grey' }}>Plugin file (accepting format: .py)</label>
                <Box
                  sx={{
                    backgroundColor: "white",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "left",
                    justifyContent: "left",
                    marginLeft: 0,
                    border: '1px solid #bbbbbb',
                    borderRadius: '4px',
                    '&:hover': {
                      border: "2px solid #00245A", // Border color on hover
                    },
                  }}
                >
                  <div className="fileUploadInput" style={{
                    display: 'flex', flexDirection: 'row', marginTop: '5px', width: '100%'
                  }}>
                    <AttachFileIcon sx={{ color: '#00245A', mt: '14px', ml: '4px', fontSize: "25px" }} />
                    <input
                      type="file"
                      onChange={handleFilePlugin}
                      accept=".py"
                      style={{
                        color: selectedFileIcon ? 'black' : 'grey', height: '53px',
                        border: 'none', left: '-20px'
                      }}
                    />
                  </div>
                </Box>
                </Grid>
            </FormControl>
          </Grid>
              
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required >
              <Grid justifyContent="flex-start" display="flex" flexDirection="column">
                <label style={{ color: 'grey' }}> Machine learning model (accepting format: .h5)</label>
                <Box
                  sx={{
                    backgroundColor: "white",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "left",
                    justifyContent: "left",
                    marginLeft: 0,
                    border: '1px solid #bbbbbb',
                    borderRadius: '4px',
                    '&:hover': {
                      border: "2px solid #00245A", // Border color on hover
                    },
                  }}
                >
                  <div className="fileUploadInput" style={{
                    display: 'flex', flexDirection: 'row', marginTop: '5px', width: '100%'
                  }}>
                    <AttachFileIcon sx={{ color: '#00245A', mt: '14px', ml: '4px', fontSize: "25px" }} />
                    <input
                      type="file"
                      onChange={handleMlModel}
                      accept=".py"
                      style={{
                        color: selectedFileIcon ? 'black' : 'grey', height: '53px',
                        border: 'none', left: '-20px'
                      }}
                    />
                  </div>
                </Box>
                </Grid>
            </FormControl>
          </Grid>
          
        
        </Grid>
      </Box>

      <Typography align="center">
        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: 5, mb: 5, bgcolor: '#00245A', color: 'white', pt: 1, pb: 1, width: "150px",
            '&:hover': {
              bgcolor: 'rgba(0, 36, 90, 0.8)',
            },
          }}
        >
          Upload
        </Button>
      </Typography>
    </Container>

  );
}

export default PluginUploadPage;
