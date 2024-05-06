import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import { Container } from "@mui/system";
import {
  Typography,
  Button,
  Box,
  Grid,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Tooltip,
  TableFooter,
  TableRow,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "react-toastify/dist/ReactToastify.css";
import SearchIcon from "@mui/icons-material/Search";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import DeactivateModal from "../../components/DeactivateModal/DeactivateModal";
import { API_URL, queryKeys } from "../../constants";
import { useUser } from "../../contexts/UserContext";
import { getReportDetails } from "../../services/pluginService";
import { getDate } from "../../helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ReportPage.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "1000px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "20px",
};

function ReportPage() {
  const [searchText, setSearchText] = useState("");
  const { user } = useUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchText(searchTerm);

    if (!searchTerm) {
      queryClient.prefetchQuery([queryKeys["getReportDetails"]], () =>
        getReportDetails(user)
      );
    } else {
      const searchTermLower = searchTerm.toLowerCase();

      const newData = data.filter((report) => {
        return report.report_visible_name
          .toLowerCase()
          .includes(searchTermLower);
      });

      queryClient.setQueryData(queryKeys["getReportDetails"], newData);
    }
  };

  const theme = useTheme();
  const lessThanSm = useMediaQuery(theme.breakpoints.down("sm"));
  const lessThanMd = useMediaQuery(theme.breakpoints.down("md"));

  const [open, setOpen] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState("");
  const [deactivateModalStatus, setDeactivateModalStatus] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const deleteReport = async () => {
    const response = await fetch(API_URL + "/plugin/report", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: user["userData"]["token"],
        report_id: selectedReportId,
      },
    });
    const responseData = await response.json();

    if (responseData.hasOwnProperty("success")) {
      const newData = data.filter(
        (report) => report.report_id !== selectedReportId
      );

      queryClient.setQueryData(queryKeys["getReportDetails"], newData);
      setDeactivateModalStatus(false);
      toast.success("Report Deleted Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      console.log("Error");
    }
  };

  const button_component_properties = {
    width: "300px",
    height: "40px",
    backgroundColor: "#00245A",
    color: "white",
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
    queryKey: [queryKeys["getReportDetails"]],
    queryFn: () => getReportDetails(user),
    enabled: false,
  });

  useEffect(() => {
    // Enable the query when the user object becomes available
    if (user) {
      queryClient.prefetchQuery([queryKeys["getReportDetails"]], () =>
        getReportDetails(user)
      );
    }
  }, [user]);

  return (
    <>
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

      <DeactivateModal
        open={deactivateModalStatus}
        name="Are you sure you want to delete the report?"
        onClose={() => setDeactivateModalStatus(false)}
        handleBanStatusChange={deleteReport}
        deactivateButtonName="Delete"
      />

      <Container>
        <Typography
          variant="h4"
          color="textPrimary"
          align="center"
          gutterBottom
        >
          Analysis Report
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
                label={searchText === "" ? "Search Report" : ""}
                sx={{ ...sxStyle }}
                InputLabelProps={{
                  shrink: false,
                }}
                value={searchText}
                onChange={handleSearch}
                variant="outlined"
                style={{
                  width: lessThanMd ? "80%" :"50%",
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
            <Tooltip title={lessThanMd ? "Analysis" : null}>
              <Button
                variant="contained"
                onClick={() => {
                  navigate("/analysis");
                }}
                sx={{
                  pl: 4,
                  pr: 4,
                  height: 50,
                  width: lessThanMd ? "50px" : "100px",
                  bgcolor: "#00245A",
                  color: "white",
                  "&:hover": {
                    bgcolor: "rgba(0, 36, 90, 0.8)",
                  },
                }}
              >
                {lessThanMd ? <EqualizerIcon /> : "Analysis"}
              </Button>
            </Tooltip>
          </Box>
        </Box>
        <TableContainer component={Paper} style={{ marginTop: "20px" }}>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography
                    variant={lessThanMd ? "h6" : "h6"}
                    color="textPrimary"
                  >
                    Report
                  </Typography>
                </TableCell>

                <TableCell component="th" scope="row">
                  <Typography
                    variant={lessThanMd ? "h6" : "h6"}
                    color="textPrimary"
                  >
                    Created Date
                  </Typography>
                </TableCell>

                <TableCell align="center">
                  <Typography
                    variant={lessThanMd ? "h6" : "h6"}
                    color="textPrimary"
                  >
                    Action
                  </Typography>
                </TableCell>
              </TableRow>
              {data?.map((report) => (
                <TableRow key={report.report_id}>
                  <TableCell component="th" scope="row">
                    <Typography variant="h7" color="textPrimary">
                      {report.report_visible_name}
                    </Typography>
                  </TableCell>

                  <TableCell component="th" scope="row">
                    <Typography variant="h7" color="textPrimary">
                      {getDate(report.created_date)}
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
                      <Tooltip title={lessThanMd ? "Open" : null}>
                        <Button
                          variant="outlined"
                          style={{ color: "#00245A" }}
                          sx={{
                            borderColor: "rgba(0, 36, 90, 0.4)",
                            "&:hover": {
                              borderColor: "#00245A", // Change to the desired hover color
                            },
                          }}
                          onClick={() => {
                            // window.location.href = report.report_filepath;
                            window.open(report.report_filepath, "_blank");
                          }}
                        >
                          {lessThanMd ? null : (
                            <OpenInNewIcon sx={{ ml: -1, mr: 1 }} />
                          )}
                          {lessThanMd ? <OpenInNewIcon /> : "Open"}
                        </Button>
                      </Tooltip>

                      <Tooltip title={lessThanMd ? "Delete" : null}>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => {
                            setSelectedReportId(report.report_id);
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

export default ReportPage;
