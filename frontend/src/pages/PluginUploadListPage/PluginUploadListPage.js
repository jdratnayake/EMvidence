import { CssBaseline, Typography } from "@mui/material";
import { Container, width } from "@mui/system";
import React, { useState, useEffect } from "react";
import "./PluginUploadListPage.css";
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

function PluginUploadListPage() {
  const containerStyle = {
    backgroundColor: "white", // Set your desired color here
    // You can also add other styles as needed
    padding: "20px",
    borderRadius: "8px",
    marginTop: "10px",
  };
  const navigate = useNavigate();
  const navigateToPluginUploadPage2 = () => {
    navigate("/plugin_upload2");
  };
  return (
    <>
      <Grid container spacing={0}>
        <Grid xs={8} sm={9} md={10}>
          <Typography
            variant="h4"
            color="textPrimary"
            align="left"
            marginBottom={3}
            marginLeft={2}
          >
            Guildlines
          </Typography>
        </Grid>
        <Grid xs={1}>
          <Button
            variant="contained"
            color="primary"
            style={{
              width: "180px",
              backgroundColor: "#00245A",
              color: "white",
            }}
            onClick={navigateToPluginUploadPage2}
          >
            Upload Plugin
          </Button>
        </Grid>
      </Grid>
      <Typography variant="h6" color="textSecondary" align="left">
        <ul>
          <li>The plugins should be in the .py format.</li>
          <li>Input for the plugin: Array of signals.</li>
          <li>Output for the plugin: insight type with the accuracy.</li>
          <li>Example for the output: xxxxxxx</li>
          <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
          <li>
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </li>
          <li>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat
          </li>
          <li>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur.
          </li>
          <li>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </li>
        </ul>
      </Typography>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{
          marginTop: "20px",
          width: "200px",
          backgroundColor: "#00245A",
          color: "white",
          marginLeft: "20px",
        }}
      >
        Download Template
      </Button>
    </>
  );
}

export default PluginUploadListPage;
