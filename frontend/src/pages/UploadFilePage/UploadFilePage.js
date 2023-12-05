import { AppBar, CssBaseline, Toolbar, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState, useEffect } from "react";
import "./UploadFilePage.css";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
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
import PropTypes from "prop-types";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import Resumable from "resumablejs";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../../components/NavBar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <BorderLinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

function UploadFilePage() {
  const baseURL1 = "http://127.0.0.1:8000/api/upload_data_file";
  const baseURL2 = "http://127.0.0.1:8000/api/send_to_database";

  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [isSuccess, setIsSuccess] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [isSendToDatabase, setIsSendToDatabase] = useState(false);

  // State to manage the selected value of the dropdown
  const [selectedValue1, setSelectedValue1] = useState("");
  const [selectedValue2, setSelectedValue2] = useState("");
  const [selectedValue3, setSelectedValue3] = useState("");
  const [selectedValue4, setSelectedValue4] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const [fileUniqueName, setFileUniqueName] = useState("");
  const [fileSize, setFileSize] = useState(0);
  const [fileName, setFileName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handler for dropdown value change

  const handleDropdownChange1 = (event) => {
    setSelectedValue1(event.target.value);
  };
  const handleDropdownChange2 = (event) => {
    setSelectedValue2(event.target.value);
  };
  const handleDropdownChange3 = (event) => {
    setSelectedValue3(event.target.value);
  };
  const handleDropdownChange4 = (event) => {
    setSelectedValue4(event.target.value);
  };
  // Handler for form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
    // Do something with the form data, e.g., send it to an API
    console.log(
      "Form submitted with selected value:",
      selectedValue1,
      selectedValue2,
      selectedValue3
    );
    console.log("Selected file:", selectedFile);
    if (resumable) {
      resumable.upload();
    }
  };

  const [resumable, setResumable] = useState(null);
  //const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

  function hideProgress() {
    progress.hide();
  }

  function showSuccess() {
    alert("success.");
    //location.reload();
  }

  const uploader = new Resumable({
    target: baseURL1,
    fileType: [
      "png",
      "jpg",
      "jpeg",
      "mp4",
      "csv",
      "h5",
      "mkv",
      "gz",
      "zip",
      "cfile",
      "HEIC",
    ],
    chunkSize: 1024 * 1024 * 20,
    uploadMethod: "POST",
    headers: {
      // 'X-CSRF-TOKEN': csrfToken,
      Accept: "application/json",
    },
    simultaneousUploads: 3,
    testChunks: false,
    throttleProgressCallbacks: 1,
  });

  useEffect(() => {
    setResumable(uploader);
  }, []);

  uploader.on("fileAdded", (file) => {
    console.log("File added:", file);
  });

  uploader.on("fileSuccess", (file, message) => {
    const response = JSON.parse(message);
    console.log("this is file unique name:-", response.file_unique_name);
    setFileUniqueName(response.file_unique_name);
    setIsSuccess(1);
  });

  uploader.on("fileProgress", function (file, response) {
    // trigger when file progress update
    setProgress(Math.floor(file.progress() * 100));

    if (Math.floor(file.progress() * 100) == 100) {
      setPercentage(100);
    }
  });

  uploader.on("fileError", function (file, response) {
    // trigger when there is any error
    console.log(file);
    alert("file uploading error.");
    navigate("/file_manage");
  });

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setSelectedFile(file);
    setFileName(file.name);
    setFileSize(file.size);
    if (resumable) {
      resumable.addFile(file);
    }
  };

  function handleUpload() {}

  useEffect(() => {
    if (isSuccess === 1 && percentage == 100) {
      axios
        .post(baseURL2, {
          name: fileName,
          size: fileSize,
          unique_name: fileUniqueName,
        })
        .then((response) => {
          console.log(response.status);
          if (response.status == 200) {
            setIsSendToDatabase(true);
            setTimeout(() => {
              navigate("/file_manage");
            }, 1000);
          } else {
            alert("Error");
            navigate("/file_manage");
          }
        });
      console.log(fileName, fileSize, fileUniqueName);
    }
  }, [isSuccess, percentage, fileName, fileSize, fileUniqueName]);

  // const handleUpload = async () => {
  //     if (resumable) {
  //       try {
  //         const response = await fetch('http://127.0.0.1:8000/csrf-token'); // should do in post method
  //         const data = await response.json();
  //         console.log(data);
  //         resumable.opts.query = {_token: data.csrf_token};
  //         resumable.opts.headers = {
  //             'X-CSRF-TOKEN': data.csrf_Token,
  //           };
  //         console.log("in upload section");
  //         resumable.upload();
  //       } catch (error) {
  //         console.error('Error fetching CSRF token:', error);
  //       }
  //     }
  //   };

  const customStyles = {
    backgroundColor: "#525252",
    color: "white",
  };
  const styles = (theme) => ({
    select: {
      "&:before": {
        bordercolor: "#525252",
      },
      "&:after": {
        bordercolor: "#525252",
      },
    },
    icon: {
      fill: "#525252",
    },
  });
  return (
    <>
      <CssBaseline />
      <NavBar />

      <div className="maindiv" style={{ marginTop: "100px" }}>
        {!isSubmitted && (
          <Container maxWidth="sm" id="form">
            <Typography
              variant="h2"
              color="textPrimary"
              align="center"
              gutterBottom
            >
              Upload File
            </Typography>
            <Typography
              variant="h4"
              color="textPrimary"
              align="center"
              gutterBottom
            >
              <form onSubmit={handleSubmit}>
                {/* Dropdown */}
                <FormControl
                  fullWidth
                  style={{ marginBottom: "20px" }}
                  required
                >
                  <InputLabel id="dropdown-label-1">Device Name</InputLabel>
                  <Select
                    labelId="dropdown-label-1"
                    id="dropdown-1"
                    value={selectedValue1}
                    onChange={handleDropdownChange1}
                    label="Device Name"
                    style={{ borderColor: "#525252" }}
                    sx={{
                      "&:hover": {
                        "&& fieldset": {
                          border: "3px solid gray",
                        },
                      },
                    }}
                  >
                    <MenuItem value="Arduino">iPhone 4S</MenuItem>
                    <MenuItem value="Arduino">Arduino</MenuItem>
                    <MenuItem value="Raspberry Pi">Raspberry Pi</MenuItem>
                  </Select>
                </FormControl>

                <FormControl
                  fullWidth
                  style={{ marginBottom: "20px" }}
                  required
                >
                  <TextField
                    id="text-1"
                    type="number"
                    label="Center Frequency"
                    variant="outlined"
                    value={selectedValue2}
                    onChange={handleDropdownChange2}
                    style={{ borderColor: "#525252" }}
                    sx={{
                      "&:hover": {
                        "&& fieldset": {
                          border: "3px solid gray",
                        },
                      },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">MHz</InputAdornment>
                      ),
                      inputMode: "numeric",
                      pattern: "/^-?d+(?:.d+)?$/g",
                      inputProps: {
                        min: 0,
                        step: 0.01,
                        style: { textAlign: "center" },
                      },
                    }}
                    required
                  />
                </FormControl>

                <FormControl
                  fullWidth
                  style={{ marginBottom: "20px" }}
                  required
                >
                  <InputLabel id="dropdown-label-3">Sampling Rate</InputLabel>
                  <Select
                    labelId="dropdown-label-2"
                    id="dropdown-2"
                    value={selectedValue3}
                    onChange={handleDropdownChange3}
                    label="Sampling Rate"
                    style={{ borderColor: "#525252" }}
                    sx={{
                      "&:hover": {
                        "&& fieldset": {
                          border: "3px solid gray",
                        },
                      },
                    }}
                  >
                    <MenuItem value="8 MHz">8 MHz</MenuItem>
                    <MenuItem value="10 MHz">10 MHz</MenuItem>
                    <MenuItem value="12.5 MHz">12.5 MHz</MenuItem>
                    <MenuItem value="16 MHz">16 MHz</MenuItem>
                    <MenuItem value="20 MHz">20 MHz</MenuItem>
                  </Select>
                </FormControl>

                <FormControl
                  fullWidth
                  style={{ marginBottom: "20px" }}
                  required
                >
                  <InputLabel htmlFor="file-input"></InputLabel>
                  <Input
                    id="file-input"
                    type="file"
                    onChange={handleFileSelect}

                    // endAdornment={<InputAdornment position="end">{selectedFile && selectedFile.name}</InputAdornment>}
                  />
                </FormControl>

                {/* Submit button */}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{
                    marginTop: "20px",
                    width: "200px",
                    backgroundColor: "#525252",
                    color: "white",
                  }}
                >
                  Submit
                </Button>
              </form>
            </Typography>
          </Container>
        )}
        {isSubmitted && !isSendToDatabase && (
          <Container maxWidth="sm" id="showProgress">
            <Stack
              spacing={2}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="h3" color="textPrimary" align="center">
                Uploading
              </Typography>
              <div className="bouncing-loader" style={{ marginTop: "40px" }}>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </Stack>

            <Box sx={{ width: "100%", marginTop: "15px" }}>
              <LinearProgressWithLabel value={progress} />
            </Box>
          </Container>
        )}
        {isSendToDatabase && (
          <Container maxWidth="sm" id="showSuccess">
            <Alert>
              <AlertTitle>File successfully uploaded</AlertTitle>
            </Alert>
          </Container>
        )}
      </div>
    </>
  );
}

export default UploadFilePage;
