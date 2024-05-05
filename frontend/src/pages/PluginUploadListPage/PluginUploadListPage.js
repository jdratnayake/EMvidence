import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
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
import DeveloperModeIcon from "@mui/icons-material/DeveloperMode";
import RuleIcon from "@mui/icons-material/Rule";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeactivateModal from "../../components/DeactivateModal/DeactivateModal";
import ActivateModal from "../../components/ActivateModal/ActivateModal";
import { API_URL, queryKeys } from "../../constants";
import { useUser } from "../../contexts/UserContext";
import { getDeveloperPluginDetails } from "../../services/pluginService";
import { getDate } from "../../helper";
import "./PluginUploadListPage.css";

function PluginUploadListPage() {
  const [searchText, setSearchText] = useState("");
  const [activateModalStatus, setActivateModalStatus] = useState(false);
  const [deactivateModalStatus, setDeactivateModalStatus] = useState(false);
  const [selectedPluginId, setSelectedPluginId] = useState(null);
  const { user } = useUser();
  const queryClient = useQueryClient();

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchText(searchTerm);

    // console.log(searchTerm);
    if (!searchTerm) {
      queryClient.prefetchQuery([queryKeys["getDeveloperPluginDetails"]], () =>
        getDeveloperPluginDetails(user)
      );
    } else {
      const searchTermLower = searchTerm.toLowerCase();

      const newData = data.filter((plugin) => {
        return plugin.plugin_name.toLowerCase().includes(searchTermLower);
      });

      queryClient.setQueryData(queryKeys["getDeveloperPluginDetails"], newData);
    }
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

  const { data, error, isLoading } = useQuery({
    queryKey: [queryKeys["getDeveloperPluginDetails"]],
    queryFn: () => getDeveloperPluginDetails(user),
    enabled: false,
  });

  useEffect(() => {
    // Enable the query when the user object becomes available
    if (user) {
      queryClient.prefetchQuery([queryKeys["getDeveloperPluginDetails"]], () =>
        getDeveloperPluginDetails(user)
      );
    }
  }, [user]);

  const sendPluginForApproval = async () => {
    const response = await fetch(API_URL + "/plugin/compatibility-verify", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: user["userData"]["token"],
        analysis_plugin_id: selectedPluginId,
        compatibility_status: "pending",
      },
    });

    const responseData = await response.json();

    if (responseData.hasOwnProperty("success")) {
      const newData = data.map((plugin) => {
        if (plugin.plugin_id === selectedPluginId) {
          return { ...plugin, compatibility_status: "pending" };
        } else {
          return plugin;
        }
      });

      queryClient.setQueryData(queryKeys["getDeveloperPluginDetails"], newData);

      setActivateModalStatus(false);
      setDeactivateModalStatus(false);
    } else {
      console.log("Error");
    }
  };

  const deletePlugin = async () => {
    const response = await fetch(API_URL + "/plugin", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: user["userData"]["token"],
        plugin_id: selectedPluginId,
      },
    });

    const responseData = await response.json();

    if (responseData.hasOwnProperty("success")) {
      const newData = data.filter(
        (plugin) => plugin.plugin_id !== selectedPluginId
      );

      queryClient.setQueryData(queryKeys["getDeveloperPluginDetails"], newData);

      setActivateModalStatus(false);
      setDeactivateModalStatus(false);
    } else {
      console.log("Error");
    }
  };

  return (
    <>
      <ActivateModal
        open={activateModalStatus}
        name="Are you sure you want to verify the plugin?"
        onClose={() => setActivateModalStatus(false)}
        handleBanStatusChange={sendPluginForApproval}
        activateButtonName="Verify"
      />
      <DeactivateModal
        open={deactivateModalStatus}
        name="Are you sure you want to delete the plugin?"
        onClose={() => setDeactivateModalStatus(false)}
        handleBanStatusChange={deletePlugin}
        deactivateButtonName="Delete"
      />

      <Container>
        <Typography
          variant="h4"
          color="textPrimary"
          align="center"
          gutterBottom
        >
          Your Plugins
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

              {data?.map((plugin) => (
                <TableRow key={plugin.plugin_id}>
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
                  <TableCell component="th" scope="row" align="center">
                    {plugin.compatibility_status === "initial" && (
                      <Chip
                        sx={{
                          background: "#FFFAF2 ",
                          color: "orange",
                          mt: "10px",
                        }}
                        label={"Initial"}
                      />
                    )}
                    {plugin.compatibility_status === "pending" && (
                      <Chip
                        sx={{
                          background: "#FFF4E0",
                          color: "orange",
                          mt: "10px",
                        }}
                        label={"Pending"}
                      />
                    )}
                    {plugin.compatibility_status === "incompatible" && (
                      <Chip
                        sx={{ background: "#FFF2F2", color: "red", mt: "10px" }}
                        label={"Failed"}
                      />
                    )}
                    {plugin.compatibility_status === "compatible" && (
                      <Chip
                        sx={{
                          background: "#ECFDF3",
                          color: "green",
                          mt: "10px",
                        }}
                        label={"Active"}
                      />
                    )}
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
                      <Tooltip title={lessThanMd ? "Test & Confirm" : null}>
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
                          {lessThanMd ? (
                            <DeveloperModeIcon />
                          ) : (
                            "Test & Confirm"
                          )}
                        </Button>
                      </Tooltip>

                      <Tooltip title={lessThanMd ? "Delete" : null}>
                        <Button
                          variant="outlined"
                          sx={{ ml: 2 }}
                          color="error"
                          onClick={() => {
                            setSelectedPluginId(plugin.plugin_id);
                            setDeactivateModalStatus(true);
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
              ))}
            </TableBody>
            <TableFooter></TableFooter>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}

export default PluginUploadListPage;
