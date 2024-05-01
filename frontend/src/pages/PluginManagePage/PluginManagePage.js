import React, { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
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
import DeactivateModal from "../../components/DeactivateModal/DeactivateModal";
import ActivateModal from "../../components/ActivateModal/ActivateModal";
import { API_URL, queryKeys } from "../../constants";
import { getVerifiedPluginDetails } from "../../services/pluginService";
import { useUser } from "../../contexts/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const { user } = useUser();
  const queryClient = useQueryClient();
  const [selectedPluginId, setSelectedPluginId] = useState(0);
  const [activateModalStatus, setActivateModalStatus] = useState(false);
  const [deactivateModalStatus, setDeactivateModalStatus] = useState(false);

  const theme = useTheme();
  const lessThanSm = useMediaQuery(theme.breakpoints.down("sm"));
  const lessThanMd = useMediaQuery(theme.breakpoints.down("md"));

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchText(event.target.value);

    if (!searchTerm) {
      queryClient.prefetchQuery([queryKeys["getVerifiedPluginDetails"]], () =>
        getVerifiedPluginDetails(user)
      );
    } else {
      const searchTermLower = searchTerm.toLowerCase();

      const newData = data.filter((plugin) => {
        return plugin.plugin_name.toLowerCase().includes(searchTermLower);
      });

      queryClient.setQueryData(queryKeys["getVerifiedPluginDetails"], newData);
    }
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

  const { data, error, isLoading } = useQuery({
    queryKey: [queryKeys["getVerifiedPluginDetails"]],
    queryFn: () => getVerifiedPluginDetails(user),
    enabled: false,
  });

  const handleBanStatusChange = async (status) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: user["userData"]["token"],
      user_id: user["userData"]["user_id"],
      analysis_plugin_id: selectedPluginId,
      compatibility_status: status,
    };

    axios
      .get(API_URL + "/plugin/compatibility", { headers })
      .then((response) => {
        console.log(response);

        setActivateModalStatus(false);
        setDeactivateModalStatus(false);

        const newData = data.map((plugin) => {
          if (plugin.plugin_id === selectedPluginId) {
            return { ...plugin, compatibility_status: status };
          } else {
            return plugin;
          }
        });

        queryClient.setQueryData(
          queryKeys["getVerifiedPluginDetails"],
          newData
        );

        const message =
          status === "compatible"
            ? "Plugin Activated Successfully"
            : "Plugin Deactivated Successfully";

        toast.success(message, {
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

  useEffect(() => {
    if (user) {
      queryClient.prefetchQuery([queryKeys["getVerifiedPluginDetails"]], () =>
        getVerifiedPluginDetails(user)
      );
    }
  }, [user]);

  return (
    <>
      <DeactivateModal
        open={deactivateModalStatus}
        name="Do you want to deactivate the plugin?"
        onClose={() => setDeactivateModalStatus(false)}
        handleBanStatusChange={() => {
          handleBanStatusChange("incompatible");
        }}
        deactivateButtonName="Deactivate"
      />
      <ActivateModal
        open={activateModalStatus}
        name="Do you want to activate the plugin?"
        onClose={() => setActivateModalStatus(false)}
        handleBanStatusChange={() => {
          handleBanStatusChange("compatible");
        }}
        activateButtonName="Activate"
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
                    {data?.map((plugin) => (
                      <TableRow hover>
                        <TableCell scope="row">
                          <Typography variant="h7" color="textPrimary">
                            {plugin.plugin_name}
                          </Typography>
                        </TableCell>

                        <TableCell scope="row" align="center">
                          {plugin.compatibility_status === "compatible" && (
                            <Chip
                              sx={{
                                background: "#ECFDF3",

                                color: "#037847",

                                mt: "10px",

                                ml: "4px",
                              }}
                              label={"Active"}
                            />
                          )}

                          {plugin.compatibility_status === "incompatible" && (
                            <Chip
                              sx={{
                                background: "#FFF2F2",
                                color: "red",
                                mt: "10px",
                              }}
                              label={"Inactive"}
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
                            {/* <Tooltip title={lessThanMd ? "Test" : null}>
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
                            </Tooltip> */}

                            {plugin.compatibility_status === "incompatible" && (
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
                                  onClick={() => {
                                    setSelectedPluginId(plugin.plugin_id);
                                    setActivateModalStatus(true);
                                  }}
                                >
                                  {lessThanMd ? null : (
                                    <OfflinePinIcon sx={{ ml: -1, mr: 1 }} />
                                  )}
                                  {lessThanMd ? <OfflinePinIcon /> : "Activate"}
                                </Button>
                              </Tooltip>
                            )}

                            {plugin.compatibility_status === "compatible" && (
                              <Tooltip title={lessThanMd ? "Deactivate" : null}>
                                <Button
                                  variant="outlined"
                                  color="error"
                                  onClick={() => {
                                    setSelectedPluginId(plugin.plugin_id);
                                    setDeactivateModalStatus(true);
                                  }}
                                >
                                  {lessThanMd ? null : (
                                    <UnpublishedIcon sx={{ ml: -1, mr: 1 }} />
                                  )}

                                  {lessThanMd ? (
                                    <UnpublishedIcon />
                                  ) : (
                                    "Deactivate"
                                  )}
                                </Button>
                              </Tooltip>
                            )}
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
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
