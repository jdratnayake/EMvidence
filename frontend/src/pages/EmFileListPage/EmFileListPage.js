import { AppBar, CssBaseline, Toolbar, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState, useEffect } from "react";
import "./EmFileListPage.css";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
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
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import NavBar from "../../components/NavBar/NavBar";
import { Grid, Card, CardContent, Chip, TextField } from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import Divider from "@mui/material/Divider";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CardActions from "@mui/material/CardActions";
import logo from "../PluginsPage/p4.png";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeactivateModal from "../../components/DeactivateModal/DeactivateModal";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useQuery, useQueryClient } from "react-query";
import { API_URL, queryKeys } from "../../constants";
import "react-toastify/dist/ReactToastify.css";
import noFiles from "../../resources/no_files_found.png";
import { useUser } from "../../contexts/UserContext";
import { getEmRawDetails } from "../../services/fileManage";

const baseURL1 = API_URL + "/em_data_records";
const baseURL2 = API_URL + "/delete_file";

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

function EmFileListPage() {
  const theme = useTheme();
  const lessThanSm = useMediaQuery(theme.breakpoints.down("sm"));
  const lessThanMd = useMediaQuery(theme.breakpoints.down("md"));
  const lessThanLg = useMediaQuery(theme.breakpoints.down("lg"));
  const [emData, setEMData] = useState([]);
  const [emDataInTable, setEMDataInTable] = useState([]);
  const [fileId, setFileId] = useState();
  const [searchText, setSearchText] = useState("");
  const [deactivateModalStatus, setDeactivateModalStatus] = useState(false);
  const queryClient = useQueryClient();
  const { user } = useUser();

  const navigate = useNavigate();
  const navigateToUploadForm = () => {
    navigate("/file-upload");
  };

  const [open, setOpen] = useState(false);
  const [selectedFileData, setSelectedFileData] = useState(null);

  const handleClickOpen = (data) => {
    setSelectedFileData(data);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderFileDetails = () => {
    if (selectedFileData) {
      return (
        <Card variant="outlined">
          <CardContent>
            <Grid container alignItems="center" justifyContent="center">
              {/* <InsertDriveFileIcon fontSize="medium" color="primary"/> */}
              <Typography
                variant="h6"
                color="textPrimary"
                align="center"
                gutterBottom
              >
                {selectedFileData.em_raw_file_visible_name}
              </Typography>
            </Grid>
            {/* <Typography color="textSecondary" align="left">
              File Status : {selectedFileData.em_raw_upload_status}
            </Typography> */}
            {selectedFileData.em_raw_upload_status === "processing" && (
              <Stack direction="row" spacing={1}>
                <Typography color="textSecondary" align="left">
                  File Status :
                </Typography>
                <Typography style={{ color: "orange" }}>processing</Typography>
              </Stack>
            )}
            {selectedFileData.em_raw_upload_status === "processed" && (
              <Stack direction="row" spacing={1}>
                <Typography color="textSecondary" align="left">
                  File Status :
                </Typography>
                <Typography style={{ color: "green" }}>processed</Typography>
              </Stack>
            )}
            {selectedFileData.em_raw_upload_status === "faild" && (
              <Stack direction="row" spacing={1}>
                <Typography color="textSecondary" align="left">
                  File Status :
                </Typography>
                <Typography style={{ color: "red" }}>faild</Typography>
              </Stack>
            )}
            <Typography color="textSecondary" align="left">
              File Size : {bytesToSize(selectedFileData.em_raw_cfile_file_size)}
            </Typography>
            <Typography color="textSecondary" align="left">
              Created Date : {selectedFileData.file_upload_timestamp}
            </Typography>
            <Typography color="textSecondary" align="left">
              Device : {selectedFileData.device_name}
            </Typography>
            <Typography color="textSecondary" align="left">
              Center Frequency : {selectedFileData.center_frequency} MHz
            </Typography>
            <Typography color="textSecondary" align="left">
              Sampling Rate : {selectedFileData.sampling_rate} MHz
            </Typography>
            {/* Add more file details here as needed */}
          </CardContent>
        </Card>
      );
    } else {
      return null;
    }
  };

  function bytesToSize(bytes) {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

    if (bytes === 0) return "0 Byte";

    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));

    return Math.round(100 * (bytes / Math.pow(1024, i))) / 100 + " " + sizes[i];
  }

  const {
    data: emDataFile,
    error,
    isLoading,
  } = useQuery({
    queryKey: [queryKeys["getEmRawDetails"]],
    queryFn: () => getEmRawDetails(user),
    enabled: false,
  });

  useEffect(() => {
    // Enable the query when the user object becomes available
    if (user) {
      queryClient.prefetchQuery([queryKeys["getEmRawDetails"]], () =>
        getEmRawDetails(user)
      );
    }
    setEMData(emDataFile);
    setEMDataInTable(emDataFile);
  }, [user, emDataFile]);

  const deleteRecord = async () => {
    console.log(fileId);
    axios
      .post(baseURL2, {
        file_id: fileId,
      })
      .then((response) => {
        console.log(response.status);
        if (response.data.status == 200) {
          // alert('File is successfully deleted.');
          setDeactivateModalStatus(false);
          const updatedData = emData.filter(
            (file) => file.em_raw_file_id !== fileId
          );
          setEMData(updatedData);
          setEMDataInTable(updatedData);
          toast.success("File is Deleted Successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          //window.location.reload();
        } else {
          setDeactivateModalStatus(false);
          toast.error("Faild to Delete the File", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          //window.location.reload();
        }
      });
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value);
    const searchText = event.target.value.toLowerCase();
    console.log(searchText);
    const filteredFiles = emData.filter((file) =>
      file.em_raw_file_visible_name.toLowerCase().includes(searchText)
    );
    setEMDataInTable(filteredFiles);
  };

  return (
    <>
      <DeactivateModal
        open={deactivateModalStatus}
        name="Do you really want to delete this file?"
        onClose={() => setDeactivateModalStatus(false)}
        deactivateButtonName="Yes"
        handleBanStatusChange={deleteRecord}
      />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
        >
          <DialogContent>{renderFileDetails()}</DialogContent>
        </Dialog>
      </div>

      <div className="maindiv">
        <Container>
          <Typography
            variant="h4"
            color="textPrimary"
            align="center"
            gutterBottom
          >
            EM File Manage
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
                  label={searchText === "" ? "Search File" : ""}
                  sx={{ ...sxStyle }}
                  InputLabelProps={{
                    shrink: false,
                  }}
                  value={searchText}
                  onChange={handleSearch}
                  variant="outlined"
                  style={{
                    width: lessThanMd ? "80%" : "50%",
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
              <Tooltip title={lessThanMd ? "Upload" : null}>
                <Button
                  variant="contained"
                  onClick={navigateToUploadForm}
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
                  {lessThanMd ? <CloudUploadIcon /> : "Upload"}
                </Button>
              </Tooltip>
            </Box>
          </Box>

          <TableContainer
            component={Paper}
            style={{ marginTop: "20px" }}
            sx={{
              maxHeight: "70vh",
              overflowY: emDataInTable?.length > 5 ? "scroll" : "hidden",
            }}
          >
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
              <TableBody>
                <TableRow>
                  <TableCell scope="row">
                    <Typography variant="h6" color="textPrimary">
                      File Name
                    </Typography>
                  </TableCell>
                  <TableCell scope="row">
                    <Typography variant="h6" color="textPrimary">
                      Size
                    </Typography>
                  </TableCell>
                  <TableCell scope="row">
                    <Typography variant="h6" color="textPrimary">
                      Created Date
                    </Typography>
                  </TableCell>
                  <TableCell scope="row" align="center">
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

                {emDataInTable?.map((data) => (
                  <TableRow key={data.em_raw_file_id} hover={true}>
                    <TableCell scope="row">
                      <Stack direction="row" spacing={2}>
                        <InsertDriveFileIcon
                          fontSize="medium"
                          sx={{ color: "#00245A" }}
                        />
                        <Typography variant="h7">
                          {data.em_raw_file_visible_name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {bytesToSize(data.em_raw_cfile_file_size)}
                    </TableCell>
                    <TableCell>{data.file_upload_timestamp}</TableCell>
                    {/* {if(data.em_raw_upload_status == "preprocessing"){}} */}
                    <TableCell align="center">
                      {data.em_raw_upload_status === "processing" && (
                        <Chip
                          sx={{
                            background: "#FFF4E0",
                            color: "orange",
                            mt: "10px",
                          }}
                          label={"processing"}
                        />
                      )}
                      {data.em_raw_upload_status === "processed" && (
                        <Chip
                          sx={{
                            background: "#ECFDF3",
                            color: "green",
                            mt: "10px",
                          }}
                          label={"processed"}
                        />
                      )}
                      {(data.em_raw_upload_status === "failed" ||
                        data.em_raw_upload_status === "faild") && (
                        <Chip
                          sx={{
                            background: "#FFF2F2",
                            color: "red",
                            mt: "10px",
                          }}
                          label={"failed"}
                        />
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <Box
                        //{lessThanSm ? 0 : {lessThanMd ? 18 : 14}}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          "& > Button": {
                            marginRight: 2, // Adjust the value as needed
                          },
                        }}
                      >
                        <Tooltip title={lessThanMd ? "Delete File" : null}>
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => {
                              setFileId(data.em_raw_file_id);
                              setDeactivateModalStatus(true);
                            }}
                          >
                            {lessThanMd ? null : (
                              <DeleteIcon sx={{ ml: -1, mr: 1 }} />
                            )}
                            {lessThanMd ? <DeleteIcon /> : "Delete"}
                          </Button>
                        </Tooltip>

                        <Tooltip title={lessThanMd ? "More Details" : null}>
                          <Button
                            variant="outlined"
                            style={{ color: "#00245A" }}
                            sx={{
                              borderColor: "rgba(0, 36, 90, 0.4)",
                              "&:hover": {
                                borderColor: "#00245A", // Change to the desired hover color
                              },
                            }}
                            onClick={() => handleClickOpen(data)}
                          >
                            {lessThanMd ? null : (
                              <InfoIcon sx={{ ml: -1, mr: 1 }} />
                            )}
                            {lessThanMd ? <InfoIcon /> : "More Details"}
                          </Button>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
                {emDataInTable?.length == 0 && (
                  <TableRow style={{ height: 53 }}>
                    <TableCell colSpan={6} align="center">
                      <Typography variant="h4" sx={{ color: "#00245A" }}>
                        No files found
                      </Typography>
                      <Box
                        component="img"
                        sx={{
                          height: 200,
                          width: 200,
                          mt: 2,
                          ml: 2,
                        }}
                        src={noFiles}
                      />
                    </TableCell>
                  </TableRow>
                )}
                <TableRow style={{ height: 30 }}>
                  <TableCell colSpan={6} />
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </div>
    </>
  );
}

export default EmFileListPage;
