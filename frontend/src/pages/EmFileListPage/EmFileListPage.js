import { AppBar, CssBaseline, Toolbar, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState, useEffect } from "react";
import "./EmFileListPage.css";
import PropTypes from "prop-types";
import { useTheme, } from "@mui/material/styles";
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
import { Grid, Card, CardContent, Chip } from "@mui/material";
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
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from "react-toastify";
import { useQuery, useQueryClient } from "react-query";
import { API_URL } from "../../constants";
import "react-toastify/dist/ReactToastify.css";
import noFiles from "../../resources/no_files_found.png";
import { useUser } from "../../contexts/UserContext";

const baseURL1 = API_URL + "/em_data_records";
const baseURL2 = API_URL + "/delete_file";


function TablePaginationActions(props) {
  const theme = useTheme();

  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function EmFileListPage() {
  const theme = useTheme();
  const lessThanSm = useMediaQuery(theme.breakpoints.down("sm"));
  const lessThanMd = useMediaQuery(theme.breakpoints.down("md"));
  const lessThanLg = useMediaQuery(theme.breakpoints.down("lg"));
  const [emData, setEMData] = useState([]);


  useEffect(() => {
    axios.get(baseURL1, {
      headers: {
        'Content-Type': 'application/json',
        'user_id': 1,
      },
    })
      .then((response) => {
        console.log("--- file list ---");
        console.log(response.data.em_raw_files);
        setEMData(response.data.em_raw_files);
      })
      .catch((error) => {
        console.error('There was a problem with Axios request:', error);
      });
  }, []);

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
              Device : {selectedFileData.device_id}
            </Typography>
            <Typography color="textSecondary" align="left">
              Center Frequency : {selectedFileData.center_frequency} Hz
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



  function deleteRecord(id) {
    console.log(id);
    axios
      .post(baseURL2, {
        file_id: id,
      })
      .then((response) => {
        console.log(response.status);
        if (response.status == 200) {
          // alert('File is successfully deleted.');
          window.location.reload();
        } else {
          alert("An Error occured when deleting the file.");
          window.location.reload();
        }
      });
  }


  function bytesToSize(bytes) {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

    if (bytes === 0) return "0 Byte";

    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));

    return Math.round(100 * (bytes / Math.pow(1024, i))) / 100 + " " + sizes[i];
  }

  const notify = () => toast("File upload successfully");



  return (
    <>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />

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
        <Container >
          <Typography
            variant="h4"
            color="textPrimary"
            align="center"
            gutterBottom

          >
            File Manage
          </Typography>
          <Stack direction="row" spacing={2} display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              onClick={navigateToUploadForm}
              sx={{
                pl: 4,
                pr: 4,
                bgcolor: "#00245A",
                color: "white",
                "&:hover": {
                  bgcolor: "rgba(0, 36, 90, 0.8)",
                },
              }}
            >
              upload
            </Button>
          </Stack>

          <TableContainer component={Paper} style={{ marginTop: "20px" }} sx={{ maxHeight: "70vh", overflowY: emData.length > 5 ? "scroll" : "hidden" }}>
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
              <TableBody>
                <TableRow >
                  <TableCell scope="row">
                    <Typography variant="h6" color="textPrimary" >
                      File Name
                    </Typography>
                  </TableCell>
                  <TableCell scope="row">
                    <Typography variant="h6" color="textPrimary" >
                      Size
                    </Typography>
                  </TableCell>
                  <TableCell scope="row">
                    <Typography variant="h6" color="textPrimary" >
                      Created Date
                    </Typography>
                  </TableCell>
                  <TableCell scope="row" align="center">
                    <Typography variant="h6" color="textPrimary" >
                      Status
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6" color="textPrimary" >
                      Action
                    </Typography>
                  </TableCell>
                </TableRow>
                {emData?.map((data) => (
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
                    <TableCell >
                      {bytesToSize(data.em_raw_cfile_file_size)}
                    </TableCell>
                    <TableCell >
                      {data.file_upload_timestamp}
                    </TableCell>
                    {/* {if(data.em_raw_upload_status == "preprocessing"){}} */}
                    <TableCell align="center" >
                      {data.em_raw_upload_status === "processing" && (
                        <Chip
                          sx={{ background: "#FFF4E0", color: "orange", mt: "10px" }}
                          label={"processing"}
                        />
                      )}
                      {data.em_raw_upload_status === "processed" && (
                        <Chip
                          sx={{ background: "#ECFDF3", color: "green", mt: "10px" }}
                          label={"processed"}
                        />
                      )}
                      {(data.em_raw_upload_status === "failed" || data.em_raw_upload_status === "faild") && (
                        <Chip
                          sx={{ background: "#FFF2F2", color: "red", mt: "10px" }}
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
                          '& > Button': {
                            marginRight: 2, // Adjust the value as needed
                          }
                        }}
                      >
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => {
                            const confirmBox = window.confirm(
                              "Do you really want to delete this file?"
                            );
                            if (confirmBox === true) {
                              deleteRecord(data.em_raw_file_id);
                            }
                          }}
                        >
                          <DeleteIcon sx={{ ml: -1, mr: 1 }} />
                          Delete
                        </Button>
                        <Button
                          variant="outlined"
                          style={{ color: "#00245A", }}
                          sx={{
                            borderColor: "rgba(0, 36, 90, 0.4)",
                            '&:hover': {
                              borderColor: "#00245A", // Change to the desired hover color
                            },
                          }}
                          onClick={() => handleClickOpen(data)}
                        >
                          More Details
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
                {emData.length == 0 && (
                  <TableRow style={{ height: 53 }}>
                    <TableCell colSpan={6} align="center">
                      <Typography variant="h4" sx={{color:"#00245A"}}>
                        No files found
                      </Typography>
                      <Box
                        component="img"
                        sx={{
                          height: 200,
                          width: 200,
                          mt:2,
                          ml:2
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
