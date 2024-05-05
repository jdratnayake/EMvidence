import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import { Container } from "@mui/system";
import axios from "axios";
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
  TextField,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ExtensionIcon from "@mui/icons-material/Extension";
import SearchIcon from "@mui/icons-material/Search";
import DeveloperModeIcon from "@mui/icons-material/DeveloperMode";
import ActivateModal from "../../components/ActivateModal/ActivateModal";
import RuleIcon from "@mui/icons-material/Rule";
import { API_URL, queryKeys } from "../../constants";
import { getPendingPluginDetails } from "../../services/pluginService";
import { useUser } from "../../contexts/UserContext";
import { getDate } from "../../helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./PluginVerifyListPage.css";

function PluginVerifyPage() {
  const [searchText, setSearchText] = useState("");
  const { user } = useUser();
  const [activateModalStatus, setActivateModalStatus] = useState(false);
  const [selectedPluginId, setSelectedPluginId] = useState(null);
  const queryClient = useQueryClient();

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchText(event.target.value);

    if (!searchTerm) {
      queryClient.prefetchQuery([queryKeys["getPendingPluginDetails"]], () =>
        getPendingPluginDetails(user)
      );
    } else {
      const searchTermLower = searchTerm.toLowerCase();

      const newData = data.filter((plugin) => {
        return plugin.plugin_name.toLowerCase().includes(searchTermLower);
      });

      queryClient.setQueryData(queryKeys["getPendingPluginDetails"], newData);
    }
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
  };

  const sendPluginForApproval = async () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: user["userData"]["token"],
      user_id: user["userData"]["user_id"],
      analysis_plugin_id: selectedPluginId,
      compatibility_status: "compatible",
    };

    axios
      .get(API_URL + "/plugin/compatibility", { headers })
      .then((response) => {
        const newData = data.filter(
          (plugin) => plugin.plugin_id !== selectedPluginId
        );

        queryClient.setQueryData(queryKeys["getPendingPluginDetails"], newData);

        setActivateModalStatus(false);

        toast.success("Plugin Acceptance Successful", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const { data, error, isLoading } = useQuery({
    queryKey: [queryKeys["getPendingPluginDetails"]],
    queryFn: () => getPendingPluginDetails(user),
    enabled: false,
  });

  useEffect(() => {
    // Enable the query when the user object becomes available
    if (user) {
      queryClient.prefetchQuery([queryKeys["getPendingPluginDetails"]], () =>
        getPendingPluginDetails(user)
      );
    }
  }, [user]);

  return (
    <>
      <ActivateModal
        open={activateModalStatus}
        name="Are you sure you want to verify the plugin?"
        onClose={() => setActivateModalStatus(false)}
        handleBanStatusChange={sendPluginForApproval}
        activateButtonName="Verify"
      />
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
      <Container>
        <Typography
          variant="h4"
          color="textPrimary"
          align="center"
          gutterBottom
        >
          Verify Plugin List
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
                label={searchText === "" ? "Search Plugin" : ""}
                sx={{ ...sxStyle }}
                InputLabelProps={{
                  shrink: false,
                }}
                value={searchText}
                onChange={handleSearch}
                variant="outlined"
                style={{
                  width: lessThanMd ? "80%" : "55%",
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
                {lessThanMd ? <ExtensionIcon /> : "All Plugins"}
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
                    Created Date
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6" color="textPrimary">
                    Action
                  </Typography>
                </TableCell>
              </TableRow>

              {data?.map((plugin) => (
                <TableRow hover>
                  <TableCell component="th" scope="row">
                    <Typography variant="h7" color="textPrimary">
                      {plugin.plugin_name}
                    </Typography>
                  </TableCell>

                  <TableCell component="th" scope="row">
                    <Typography variant="h7" color="textPrimary">
                      {getDate(plugin.plugin_upload_timestamp)}
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
                      <Tooltip title={lessThanMd ? "Test & Verify" : null}>
                        <Button
                          variant="outlined"
                          style={{ color: "#00245A" }}
                          sx={{
                            borderColor: "rgba(0, 36, 90, 0.4)",
                            "&:hover": {
                              borderColor: "#00245A", // Change to the desired hover color
                            },
                          }}
                          component={Link}
                          to={`/plugin-verify/${plugin.plugin_id}`}
                        >
                          {lessThanMd ? null : (
                            <DeveloperModeIcon sx={{ ml: -1, mr: 1 }} />
                          )}
                          {lessThanMd ? <DeveloperModeIcon /> : "Test & Verify"}
                        </Button>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter></TableFooter>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}

export default PluginVerifyPage;
