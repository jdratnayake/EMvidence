import { CssBaseline, Typography } from "@mui/material";
import { Container, width } from "@mui/system";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import NavBar from "../../components/NavBar/NavBar";
import { Grid, Card, CardContent, Chip } from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import Divider from "@mui/material/Divider";
import CardActions from "@mui/material/CardActions";
import logo from "../PluginsPage/p4.png";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from '@mui/icons-material/Visibility';
import Tooltip from '@mui/material/Tooltip';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import RuleIcon from '@mui/icons-material/Rule';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Input,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { List } from "@mui/material";

import "./PluginVerifyPage.css"

function PluginVerifyPage() {


  const [searchText, setSearchText] = useState("");

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };
  const navigate = useNavigate();
  const navigateToPluginList = () => {
    navigate("/plugin-list");
  };
  const theme = useTheme();
  const lessThanSm = useMediaQuery(theme.breakpoints.down("sm"));
  const lessThanMd = useMediaQuery(theme.breakpoints.down("md"));

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

  return (
    <>
      <Container >
        <Typography
          variant="h4"
          color="textPrimary"
          align="center"
          gutterBottom

        >
          Verify Plugins
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <Grid container alignItems="left" justifyContent="left" >
            <Grid item xs={12} md={12}>
              <TextField
                id="search"
                label={searchText === "" ? "Search" : ""}
                sx={{ ...sxStyle }}
                InputLabelProps={{
                  shrink: false,
                }}
                value={searchText}
                onChange={handleSearch}
                variant="outlined"
                style={{ width: "80%", marginTop: "40px", backgroundColor: "white", borderRadius: 4 }}
                InputProps={{
                  endAdornment: <SearchIcon sx={{ fontSize: 30 }} />,
                }}
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: "42px" }}>
            <Tooltip title={lessThanMd ? "All Plugin" : null}>
              <Button
                variant="contained"
                onClick={navigateToPluginList}
                sx={{
                  pl: 4,
                  pr: 4,
                  height: 50,
                  width: lessThanMd ? "50px" : "170px",
                  bgcolor: "#00245A",
                  color: "white",
                  "&:hover": {
                    bgcolor: "rgba(0, 36, 90, 0.8)",
                  },
                }}
              >
                {lessThanMd ? <OpenInNewIcon /> : 'All Plugins'}
              </Button>
            </Tooltip>

          </Box>
        </Box>
        <TableContainer component={Paper} style={{ marginTop: "20px" }}>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography variant="h6" color="textPrimary" >
                    Plugin Name
                  </Typography>
                </TableCell>
                <TableCell component="th" scope="row">
                  <Typography variant="h6" color="textPrimary" >
                    Created Date
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6" color="textPrimary" >
                    Action
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell component="th" scope="row">
                  <Typography variant="h7" color="textPrimary" >
                    plugin 1
                  </Typography>
                </TableCell>
                
                <TableCell component="th" scope="row">
                  <Typography variant="h7" color="textPrimary" >
                    2024-04-03 20:56:53
                  </Typography>
                </TableCell>

                <TableCell align="center">
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      '& > Button': {
                        marginRight: 2, // Adjust the value as needed
                      }
                    }}
                  >
                    <Tooltip title={lessThanMd ? "View" : null}>
                      <Button
                        variant="outlined"
                        style={{ color: "#00245A", }}
                        sx={{
                          borderColor: "rgba(0, 36, 90, 0.4)",
                          '&:hover': {
                            borderColor: "#00245A", // Change to the desired hover color
                          },
                        }}
                        onClick={() => { }}
                      >
                        {lessThanMd ? null : <VisibilityIcon sx={{ ml: -1, mr: 1 }} />}
                        {lessThanMd ? <VisibilityIcon /> : ' View'}

                      </Button>
                    </Tooltip>

                    <Tooltip title={lessThanMd ? "Verify Plugin" : null}>
                      <Button
                       variant="outlined"
                       style={{ color: "#00245A", }}
                       sx={{
                         borderColor: "rgba(0, 36, 90, 0.4)",
                         '&:hover': {
                           borderColor: "#00245A", // Change to the desired hover color
                         },
                       }}
                       onClick={() => { }}
                      >
                        {lessThanMd ? null : <RuleIcon sx={{ ml: -1, mr: 1 }} />}
                        {lessThanMd ? <RuleIcon /> : 'Verify'}

                      </Button>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell component="th" scope="row">
                  <Typography variant="h7" color="textPrimary" >
                    plugin 2
                  </Typography>
                </TableCell>
                <TableCell component="th" scope="row">
                  <Typography variant="h7" color="textPrimary" >
                    2024-04-03 20:56:53
                  </Typography>
                </TableCell>
                
                <TableCell align="center">
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      '& > Button': {
                        marginRight: 2, // Adjust the value as needed
                      }
                    }}
                  >
                    <Tooltip title={lessThanMd ? "View" : null}>
                      <Button
                        variant="outlined"
                        style={{ color: "#00245A", }}
                        sx={{
                          borderColor: "rgba(0, 36, 90, 0.4)",
                          '&:hover': {
                            borderColor: "#00245A", // Change to the desired hover color
                          },
                        }}
                        onClick={() => { }}
                      >
                        {lessThanMd ? null : <VisibilityIcon sx={{ ml: -1, mr: 1 }} />}
                        {lessThanMd ? <VisibilityIcon /> : ' View'}

                      </Button>
                    </Tooltip>

                    <Tooltip title={lessThanMd ? "Verify Plugin" : null}>
                      <Button
                       variant="outlined"
                       style={{ color: "#00245A", }}
                       sx={{
                         borderColor: "rgba(0, 36, 90, 0.4)",
                         '&:hover': {
                           borderColor: "#00245A", // Change to the desired hover color
                         },
                       }}
                       onClick={() => { }}
                      >
                        {lessThanMd ? null : <RuleIcon sx={{ ml: -1, mr: 1 }} />}
                        {lessThanMd ? <RuleIcon /> : 'Verify'}

                      </Button>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell component="th" scope="row">
                  <Typography variant="h7" color="textPrimary" >
                    plugin 3
                  </Typography>
                </TableCell>
                <TableCell component="th" scope="row">
                  <Typography variant="h7" color="textPrimary" >
                    2024-04-03 20:56:53
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      '& > Button': {
                        marginRight: 2, // Adjust the value as needed
                      }
                    }}
                  >
                    <Tooltip title={lessThanMd ? "View" : null}>
                      <Button
                        variant="outlined"
                        style={{ color: "#00245A", }}
                        sx={{
                          borderColor: "rgba(0, 36, 90, 0.4)",
                          '&:hover': {
                            borderColor: "#00245A", // Change to the desired hover color
                          },
                        }}
                        onClick={() => { }}
                      >
                        {lessThanMd ? null : <VisibilityIcon sx={{ ml: -1, mr: 1 }} />}
                        {lessThanMd ? <VisibilityIcon /> : ' View'}

                      </Button>
                    </Tooltip>

                    <Tooltip title={lessThanMd ? "Verify Plugin" : null}>
                      <Button
                       variant="outlined"
                       style={{ color: "#00245A", }}
                       sx={{
                         borderColor: "rgba(0, 36, 90, 0.4)",
                         '&:hover': {
                           borderColor: "#00245A", // Change to the desired hover color
                         },
                       }}
                       onClick={() => { }}
                      >
                        {lessThanMd ? null : <RuleIcon sx={{ ml: -1, mr: 1 }} />}
                        {lessThanMd ? <RuleIcon /> : 'Verify'}

                      </Button>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>

            </TableBody>
            <TableFooter>

            </TableFooter>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}

export default PluginVerifyPage;
