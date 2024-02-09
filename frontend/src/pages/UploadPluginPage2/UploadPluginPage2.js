import { CssBaseline, Typography } from "@mui/material";
import { Container, width } from "@mui/system";
import React, { useState, useEffect } from "react";
import "./UploadPluginPage2.css";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import CryptoJS from "crypto-js";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Resumable from "resumablejs";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../../components/NavBar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import pako from "pako";
import { OutlinedInput } from "@mui/material";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
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
import Grid from '@mui/material/Grid';
import { List } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';

function UploadPluginPage2() {
    const containerStyle = {
        backgroundColor: 'white', // Set your desired color here
        // You can also add other styles as needed
        padding: '20px',
        borderRadius: '8px',
        marginTop: '10px',

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
                    marginBottom={3}
                    marginLeft={2}
                >
                    Upload Plugin
                </Typography>



                <Typography
                    variant="h6"
                    color="textSecondary"
                    align="left"

                >
                    <ul>
                        <li>Please read the guidelines section, download the template and edit it and upload in the advised format.</li>
                        <li>File have to be in .py format</li>
                        <li>Size limit 10mb - xxxmb</li>
                        <li>Example for the output: xxxxxxx</li>
                        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                    </ul>
                </Typography>

                <Box component="form" onSubmit={() => { }} sx={{ mt: 3, ml: 5 }} c>

                    <Grid container spacing={5} align="center">
                        <Grid item xs={12} sm={5}>
                            <TextField
                                name="Plugin Name"
                                required
                                fullWidth
                                id="pluginName"
                                label="Plugin Name"
                                autoFocus
                                onChange={() => { }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <TextField
                                id="centerFreq"
                                type="number"
                                label="Center Frequency"
                                variant="outlined"
                                fullWidth
                                // value={centerFreq}
                                // onChange={handleDropdownChange2}
                                style={{ borderColor: "#525252" }}
                                sx={{
                                    "&:hover": {
                                        "&& fieldset": {
                                            border: "3px solid gray"
                                        }
                                    }
                                }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">Hz</InputAdornment>,
                                    inputMode: 'numeric',
                                    pattern: '/^-?\d+(?:\.\d+)?$/g',
                                    inputProps: { min: 0, step: 0.01, style: { textAlign: 'center' } }
                                }}
                                required />
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <TextField
                                required
                                fullWidth
                                id="deviceName"
                                label="Device Name"
                                name="Device Name"
                                onChange={() => { }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <TextField
                                required
                                fullWidth
                                id="des"
                                label="Description"
                                name="Description"
                                onChange={() => { }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <FormControl fullWidth required>
                                <InputLabel id="samplingRate">Sampling Rate</InputLabel>
                                <Select
                                    id="samplingRate"
                                    // value={samplingRate}
                                    // onChange={handleDropdownChange3}
                                    label="Sampling Rate"
                                    style={{ borderColor: "#525252" }}
                                    sx={{
                                        "&:hover": {
                                            "&& fieldset": {
                                                border: "3px solid gray"
                                            }
                                        }
                                    }}
                                >
                                    <MenuItem value="8">8 MHz</MenuItem>
                                    <MenuItem value="10">10 MHz</MenuItem>
                                    <MenuItem value="12.5">12.5 MHz</MenuItem>
                                    <MenuItem value="16">16 MHz</MenuItem>
                                    <MenuItem value="20">20 MHz</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <FormControl fullWidth required>
                                <InputLabel id="EMdataFile">EM data file</InputLabel>
                                <Select
                                    id="EMdataFile"
                                    // value={samplingRate}
                                    // onChange={handleDropdownChange3}
                                    label="EM data file"
                                    style={{ borderColor: "#525252" }}
                                    sx={{
                                        "&:hover": {
                                            "&& fieldset": {
                                                border: "3px solid gray"
                                            }
                                        }
                                    }}
                                >
                                    <MenuItem value="1">EM File 1</MenuItem>
                                    <MenuItem value="2">EM File 2</MenuItem>
                                    <MenuItem value="3">EM File 3 </MenuItem>
                                    <MenuItem value="4">EM File 4</MenuItem>
                                    <MenuItem value="5">EM File 5</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <FormControl
                                fullWidth
                                required
                            >
                                <div class="container">
                                    <div class="fileUploadInput">
                                        <label>Icon Upload(.jpg, .png, .jpeg) :</label>
                                        <button>
                                            <AttachFileIcon fontSize="small" color="primary" />
                                        </button>
                                        <input type="file" />
                                    </div>
                                </div>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <FormControl
                                fullWidth
                                required
                            >
                                <div class="container">
                                    <div class="fileUploadInput">
                                        <label>Dependency list(.txt) : </label>
                                        <button>
                                            <AttachFileIcon fontSize="small" color="primary" />
                                        </button>
                                        <input type="file" />
                                    </div>
                                </div>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <FormControl
                                fullWidth
                                required
                            >
                                <div class="container">
                                    <div class="fileUploadInput">
                                        <label>Plugin file(.py) : </label>
                                        <button>
                                            <AttachFileIcon fontSize="small" color="primary" />
                                        </button>
                                        <input type="file" />
                                    </div>
                                </div>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>



                <Typography align='center'>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        style={{
                            marginTop: "30px",
                            width: "200px",
                            backgroundColor: "#00245A",
                            color: "white",
                            marginLeft: "0px",
                            marginBottom: "20px"
                        }}
                    >
                        Upload
                    </Button>
                </Typography>


            </Container>


        </>
    )
}

export default UploadPluginPage2;