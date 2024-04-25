import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/system";
import {
  Typography,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableRow,
  Paper,
  Grid,
  Chip,
  TextField,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useUser } from "../../contexts/UserContext";
import "./PluginUploadListPage.css";

function PluginUploadListPage() {
  const [searchText, setSearchText] = useState("");
  const { user, addUser } = useUser();

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };
  const navigate = useNavigate();
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
  };

  return (
    <>
      <Container>
        <Typography
          variant="h4"
          color="textPrimary"
          align="center"
          gutterBottom
        >
          Plugins
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Grid container alignItems="left" justifyContent="left">
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
                style={{
                  width: "80%",
                  marginTop: "40px",
                  backgroundColor: "white",
                  borderRadius: 4,
                }}
                InputProps={{
                  endAdornment: <SearchIcon sx={{ fontSize: 30 }} />,
                }}
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: "42px" }}>
            <Tooltip title={lessThanMd ? "Upload Plugin" : null}>
              <Button
                variant="contained"
                onClick={() => navigate("/plugin-upload")}
                sx={{
                  pl: 4,
                  pr: 4,
                  height: 50,
                  width: lessThanMd ? "50px" : "175px",
                  bgcolor: "#00245A",
                  color: "white",
                  "&:hover": {
                    bgcolor: "rgba(0, 36, 90, 0.8)",
                  },
                }}
              >
                {lessThanMd ? <CloudUploadIcon /> : "Upload Plugin"}
              </Button>
            </Tooltip>
          </Box>
        </Box>
        <TableContainer component={Paper} style={{ marginTop: "20px" }}>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography variant="h6" color="textPrimary">
                    Plugin Name
                  </Typography>
                </TableCell>
                <TableCell component="th" scope="row">
                  <Typography variant="h6" color="textPrimary">
                    Size
                  </Typography>
                </TableCell>
                <TableCell component="th" scope="row">
                  <Typography variant="h6" color="textPrimary">
                    Created Date
                  </Typography>
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                  <Typography variant="h6" color="textPrimary">
                    Status
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6" color="textPrimary">
                    Action
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography variant="h7" color="textPrimary">
                    plugin 1
                  </Typography>
                </TableCell>
                <TableCell component="th" scope="row">
                  <Typography variant="h7" color="textPrimary">
                    10 MB
                  </Typography>
                </TableCell>
                <TableCell component="th" scope="row">
                  <Typography variant="h7" color="textPrimary">
                    2024-04-03 20:56:53
                  </Typography>
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                  <Chip
                    sx={{ background: "#FFF2F2", color: "red", mt: "10px" }}
                    label={"failed"}
                  />
                </TableCell>
                <TableCell align="center">
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      "& > Button": {
                        marginRight: 2, // Adjust the value as needed
                      },
                    }}
                  >
                    <Tooltip title={lessThanMd ? "View" : null}>
                      <Button
                        variant="outlined"
                        style={{ color: "#00245A" }}
                        sx={{
                          borderColor: "rgba(0, 36, 90, 0.4)",
                          "&:hover": {
                            borderColor: "#00245A", // Change to the desired hover color
                          },
                        }}
                        onClick={() => {}}
                      >
                        {lessThanMd ? null : (
                          <VisibilityIcon sx={{ ml: -1, mr: 1 }} />
                        )}
                        {lessThanMd ? <VisibilityIcon /> : " View"}
                      </Button>
                    </Tooltip>

                    <Tooltip title={lessThanMd ? "Delete" : null}>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => {
                          const confirmBox = window.confirm(
                            "Do you want to delete this plugin?"
                          );
                          if (confirmBox === true) {
                          }
                        }}
                      >
                        {lessThanMd ? null : (
                          <DeleteIcon sx={{ ml: -1, mr: 1 }} />
                        )}
                        {lessThanMd ? <DeleteIcon /> : "Delete"}
                      </Button>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography variant="h7" color="textPrimary">
                    plugin 2
                  </Typography>
                </TableCell>
                <TableCell component="th" scope="row">
                  <Typography variant="h7" color="textPrimary">
                    20 MB
                  </Typography>
                </TableCell>
                <TableCell component="th" scope="row">
                  <Typography variant="h7" color="textPrimary">
                    2024-04-03 20:56:53
                  </Typography>
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                  <Chip
                    sx={{ background: "#ECFDF3", color: "green", mt: "10px" }}
                    label={"Active"}
                  />
                </TableCell>
                <TableCell align="center">
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      "& > Button": {
                        marginRight: 2, // Adjust the value as needed
                      },
                    }}
                  >
                    <Tooltip title={lessThanMd ? "View" : null}>
                      <Button
                        variant="outlined"
                        style={{ color: "#00245A" }}
                        sx={{
                          borderColor: "rgba(0, 36, 90, 0.4)",
                          "&:hover": {
                            borderColor: "#00245A", // Change to the desired hover color
                          },
                        }}
                        onClick={() => {}}
                      >
                        {lessThanMd ? null : (
                          <VisibilityIcon sx={{ ml: -1, mr: 1 }} />
                        )}
                        {lessThanMd ? <VisibilityIcon /> : " View"}
                      </Button>
                    </Tooltip>

                    <Tooltip title={lessThanMd ? "Delete" : null}>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => {
                          const confirmBox = window.confirm(
                            "Do you want to delete this plugin?"
                          );
                          if (confirmBox === true) {
                          }
                        }}
                      >
                        {lessThanMd ? null : (
                          <DeleteIcon sx={{ ml: -1, mr: 1 }} />
                        )}
                        {lessThanMd ? <DeleteIcon /> : "Delete"}
                      </Button>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography variant="h7" color="textPrimary">
                    plugin 3
                  </Typography>
                </TableCell>
                <TableCell component="th" scope="row">
                  <Typography variant="h7" color="textPrimary">
                    30 MB
                  </Typography>
                </TableCell>
                <TableCell component="th" scope="row">
                  <Typography variant="h7" color="textPrimary">
                    2024-04-03 20:56:53
                  </Typography>
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                  <Typography variant="h7" color="textPrimary">
                    <Chip
                      sx={{
                        background: "#FFF4E0",
                        color: "orange",
                        mt: "10px",
                      }}
                      label={"pending"}
                    />
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      "& > Button": {
                        marginRight: 2, // Adjust the value as needed
                      },
                    }}
                  >
                    <Tooltip title={lessThanMd ? "View" : null}>
                      <Button
                        variant="outlined"
                        style={{ color: "#00245A" }}
                        sx={{
                          borderColor: "rgba(0, 36, 90, 0.4)",
                          "&:hover": {
                            borderColor: "#00245A", // Change to the desired hover color
                          },
                        }}
                        onClick={() => {}}
                      >
                        {lessThanMd ? null : (
                          <VisibilityIcon sx={{ ml: -1, mr: 1 }} />
                        )}
                        {lessThanMd ? <VisibilityIcon /> : " View"}
                      </Button>
                    </Tooltip>

                    <Tooltip title={lessThanMd ? "Delete" : null}>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => {
                          const confirmBox = window.confirm(
                            "Do you want to delete this plugin?"
                          );
                          if (confirmBox === true) {
                          }
                        }}
                      >
                        {lessThanMd ? null : (
                          <DeleteIcon sx={{ ml: -1, mr: 1 }} />
                        )}
                        {lessThanMd ? <DeleteIcon /> : "Delete"}
                      </Button>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            </TableBody>
            <TableFooter></TableFooter>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}

export default PluginUploadListPage;
