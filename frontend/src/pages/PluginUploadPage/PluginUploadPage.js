import { CssBaseline, Typography } from "@mui/material";
import { Container, width } from "@mui/system";
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

  const [selectedFileIcon, setSelectedFileIcon] = useState(null);
  const [selectedFileDependency, setSelectedFileDependency] = useState(null);
  const [selectedFilePlugin, setSelectedFilePlugin] = useState(null);

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
      setSelectedFilePlugin(file);
    }

  };
  return (
    <>
      <CssBaseline />
      <NavBar />

      <Container style={containerStyle} maxWidth="md">
        <Typography
          variant="h4"
          color="textPrimary"
          align="center"
          marginBottom={0}
          marginLeft={0}
        >
          Upload Plugin
        </Typography>

        <Grid container justifyContent="flex-end">
          <Grid item sx={{ marginBottom: 3 }}>
            <Link href="#" variant="body2" color={'#00245A'} sx={{
              '&:hover': {
                color: 'rgba(0, 36, 90, 0.8)',
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

          <Grid container spacing={5} align="center">

            <Grid item xs={12} sm={6}>
              <TextField
                name="Plugin Name"
                required
                fullWidth
                id="pluginName"
                label="Plugin Name"
                autoFocus
                sx={{
                  // "&:hover": {
                  //   "&& fieldset": {
                  //     border: "2px solid gray",
                  //   },
                  // },
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
                }}
                onChange={() => { }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="centerFreq"
                type="number"
                label="Center Frequency"
                variant="outlined"
                fullWidth
                sx={{
                  // "&:hover": {
                  //   "&& fieldset": {
                  //     border: "2px solid gray",
                  //   },
                  // },
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
              <TextField
                required
                fullWidth
                id="deviceName"
                label="Device Name"
                name="Device Name"
                sx={{
                  // "&:hover": {
                  //   "&& fieldset": {
                  //     border: "2px solid gray",
                  //   },
                  // },
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
                  // "&:hover": {
                  //   "&& fieldset": {
                  //     border: "2px solid gray",
                  //   },
                  // },
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
                }}
                onChange={() => { }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required
                sx={{
                  // "&:hover": {
                  //   "&& fieldset": {
                  //     border: "2px solid gray",
                  //   },
                  // },
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
              <FormControl fullWidth required sx={{
                // "&:hover": {
                //   "&& fieldset": {
                //     border: "2px solid gray",
                //   },
                // },
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
              }}>
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
              <FormControl fullWidth required >
                <Grid container justifyContent="flex-start" fullWidth>
                  <label >Icon Upload (accepting formats: .jpg, .png, .jpeg)</label>
                  <div className="fileUploadInput" style={{
                    border: '1px solid #bbbbbb', borderRadius: '4px', display: 'flex', flexDirection: 'row', marginTop: '5px', width: '100%'
                  }}
                    onMouseEnter={(mouseEnterEvent) => {
                      mouseEnterEvent.target.style.borderColor = 'black';
                    }}
                    onMouseLeave={(mouseLeaveEvent) => {
                      mouseLeaveEvent.target.style.borderColor = '#bbbbbb';
                    }}
                  >
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
                </Grid>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <Grid container justifyContent="flex-start" fullWidth>
                  <label >Dependency list (accepting format: .txt)</label>
                  <div className="fileUploadInput" style={{
                    border: '1px solid #bbbbbb', borderRadius: '4px', display: 'flex', flexDirection: 'row', marginTop: '5px', width: '100%'
                  }}
                    onMouseEnter={(mouseEnterEvent) => {
                      mouseEnterEvent.target.style.borderColor = 'black';
                    }}
                    onMouseLeave={(mouseLeaveEvent) => {
                      mouseLeaveEvent.target.style.borderColor = '#bbbbbb';
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
                </Grid>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <Grid container justifyContent="flex-start" fullWidth>
                  <label >Plugin file (accepting format: .py)</label>
                  <div className="fileUploadInput" style={{
                    border: '1px solid #bbbbbb', borderRadius: '4px', display: 'flex', flexDirection: 'row', marginTop: '5px', width: '100%'
                  }}
                    onMouseEnter={(mouseEnterEvent) => {
                      mouseEnterEvent.target.style.borderColor = 'black';
                    }}
                    onMouseLeave={(mouseLeaveEvent) => {
                      mouseLeaveEvent.target.style.borderColor = '#bbbbbb';
                    }}
                  >
                    <AttachFileIcon sx={{ color: '#00245A', mt: '14px', ml: '4px', fontSize: "25px" }} />
                    <input
                      type="file"
                      onChange={handleFileDependency}
                      accept=".py"
                      style={{
                        color: selectedFileIcon ? 'black' : 'grey', height: '53px',
                        border: 'none', left: '-20px'
                      }}
                    />
                  </div>
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
              mt: 3, mb: 2, bgcolor: '#00245A', color: 'white', pt: 1, pb: 1, width: "150px",
              '&:hover': {
                bgcolor: 'rgba(0, 36, 90, 0.8)',
              },
            }}
          >
            Upload
          </Button>
        </Typography>
      </Container>
    </>
  );
}

export default PluginUploadPage;
