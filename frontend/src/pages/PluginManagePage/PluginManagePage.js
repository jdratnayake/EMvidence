import React, { useState } from "react";
import { Box, styled } from "@mui/system";
import {
  Button,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DeveloperModeIcon from "@mui/icons-material/DeveloperMode";
import OfflinePinIcon from "@mui/icons-material/OfflinePin";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import Tooltip from "@mui/material/Tooltip";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";
// comment
const ContainerBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "0 0 3% 0",
}));

const HeadingBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "3%",
  marginBottom: "3%",
}));

const ContentBox = styled(Box)(() => ({
  backgroundColor: "#FFFFFF",
  borderRadius: "24px",
  width: "80vw",
  marginLeft: "0",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

const SearchBox = styled(Box)(() => ({
  margin: "0% 0% 3% 0%",
  padding: "3% 0% 0% 0%",
}));

const TableBox = styled(Box)(() => ({
  width: "100%",
}));

const SearchButton = styled(Button)(() => ({
  backgroundColor: "#00245A",
  height: "60px",
  borderRadius: "0",
}));

const SearchField = styled(TextField)(() => ({
  border: "2px solid #00245A",
  // MUI element css change
  "& label.Mui-focused": {
    color: "transparent",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "transparent",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "transparent",
    },
    "&:hover fieldset": {
      borderColor: "transparent",
    },
    "&.Mui-focused fieldset": {
      borderColor: "transparent",
    },
  },
  width: "40vw",
}));

const TableHeadRow = styled(TableRow)(() => ({
  "& th": {
    color: "rgba(96, 96, 96)",
    backgroundColor: "#FCFCFD",
  },
}));

const TableCellBlue = styled(TableCell)(() => ({
  color: "#00245A",
}));

function PluginManagePage() {
  const [searchText, setSearchText] = useState("");

  const theme = useTheme();
  const lessThanSm = useMediaQuery(theme.breakpoints.down("sm"));
  const lessThanMd = useMediaQuery(theme.breakpoints.down("md"));

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const rows = [
    {
      id: 1,
      plugin: "Firmware Version Detection",
      status: "Inactive",
      actions: "1",
    },
    {
      id: 2,
      plugin: "Firmware Version Detection",
      status: "Active",
      actions: "2",
    },
    {
      id: 3,
      plugin: "Firmware Version Detection",
      status: "Active",
      actions: "3",
    },
  ];

  function getStatusByActions(actionsValue) {
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].actions === actionsValue) {
        return rows[i].status;
      }
    }
    return null;
  }

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
      <ContainerBox>
        <Typography variant="h4" gutterBottom sx={{ mb: -1 }}>
          Plugins
        </Typography>

        <Grid
          container
          alignItems="center"
          justifyContent="center"
          sx={{ mb: 4 }}
        >
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
              minWidth: "400px",
              width: "50%",
              marginTop: "40px",
              backgroundColor: "white",
              borderRadius: 4,
            }}
            InputProps={{
              endAdornment: <SearchIcon sx={{ fontSize: 30 }} />,
            }}
          />
        </Grid>
        <ContentBox>
          <TableBox>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: "440" }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableCell>
                      <Typography variant="h6" color="textPrimary">
                        Plugin Name
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h6" color="textPrimary">
                        Status
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h6" color="textPrimary">
                        Action
                      </Typography>
                    </TableCell>
                  </TableHead>
                  <TableBody>
                    <TableRow hover>
                      <TableCell scope="row">
                        <Typography variant="h7" color="textPrimary">
                          plugin 1
                        </Typography>
                      </TableCell>

                      <TableCell scope="row" align="center">
                        <Chip
                          sx={{
                            background: "#FFF2F2",
                            color: "red",
                            mt: "10px",
                          }}
                          label={"Inactive"}
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
                          <Tooltip title={lessThanMd ? "Test" : null}>
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
                                <DeveloperModeIcon sx={{ ml: -1, mr: 1 }} />
                              )}
                              {lessThanMd ? <DeveloperModeIcon /> : "Test"}
                            </Button>
                          </Tooltip>

                          <Tooltip title={lessThanMd ? "Activate" : null}>
                            <Button
                              variant="outlined"
                              style={{ color: "#00245A" }}
                              sx={{
                                borderColor: "rgba(0, 36, 90, 0.4)",
                                "&:hover": {
                                  borderColor: "#00245A", // Change to the desired hover color
                                },
                                pl: lessThanMd ? 0 : 3,
                                pr: lessThanMd ? 0 : 3,
                              }}
                              onClick={() => {}}
                            >
                              {lessThanMd ? null : (
                                <OfflinePinIcon sx={{ ml: -1, mr: 1 }} />
                              )}
                              {lessThanMd ? <OfflinePinIcon /> : "Activate"}
                            </Button>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                    <TableRow hover>
                      <TableCell scope="row">
                        <Typography variant="h7" color="textPrimary">
                          plugin 2
                        </Typography>
                      </TableCell>

                      <TableCell scope="row" align="center">
                        <Chip
                          sx={{
                            background: "#ECFDF3",
                            color: "#037847",
                            mt: "10px",
                            ml: "4px",
                          }}
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
                          <Tooltip title={lessThanMd ? "Test" : null}>
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
                                <DeveloperModeIcon sx={{ ml: -1, mr: 1 }} />
                              )}
                              {lessThanMd ? <DeveloperModeIcon /> : "Test"}
                            </Button>
                          </Tooltip>

                          <Tooltip title={lessThanMd ? "Deactivate" : null}>
                            <Button
                              variant="outlined"
                              color="error"
                              onClick={() => {}}
                            >
                              {lessThanMd ? null : (
                                <UnpublishedIcon sx={{ ml: -1, mr: 1 }} />
                              )}
                              {lessThanMd ? <UnpublishedIcon /> : "Deactivate"}
                            </Button>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </TableBox>
        </ContentBox>
      </ContainerBox>
    </>
  );
}

export default PluginManagePage;
