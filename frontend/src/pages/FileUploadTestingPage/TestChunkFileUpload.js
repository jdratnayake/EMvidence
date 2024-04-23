import { CssBaseline, Typography } from "@mui/material";
import { borderColor, Container, height } from "@mui/system";
import React, { useState, useEffect } from "react";
import "./EmFileUploadPage.css";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import CryptoJS from "crypto-js";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Resumable from "resumablejs";
import { useNavigate } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import NavBar from "../../components/NavBar/NavBar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import pako from "pako";
import { OutlinedInput } from "@mui/material";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Input,
} from "@mui/material";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { notifyManager } from "react-query";


const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 14,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "white",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#00245A",
  },
}));

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1, }}>
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

function EmFileUploadPage() {
  const baseURL1 = "http://127.0.0.1:8000/api/upload_data_file";
  const baseURL2 = "http://127.0.0.1:8000/api/send_to_database_test";

  const key = window.crypto.getRandomValues(new Uint8Array(32));
  const iv = window.crypto.getRandomValues(new Uint8Array(12));

  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [isSuccess, setIsSuccess] = useState(0);
  const [isFileAdded, setIsFileAdded] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [hash, setHash] = useState("hsbivbijsvndsvd");
  const [hasingProgress, setHasingProgress] = useState(0);
  const [compressedFile, setCompressedFile] = useState(null);
  const [compressionProgress, setCompressionProgress] = useState(0);
  const [uploading, setuploading] = useState(0);
  const [resumable, setResumable] = useState(null);
  const [isSendToDatabase, setIsSendToDatabase] = useState(false);

  // State to manage the selected value of the dropdown
  const [deviceId, setDeviceId] = useState(1);
  const [centerFreq, setCenterFreq] = useState(10);
  const [samplingRate, setSamplingRate] = useState(8);
  const [selectedFile, setSelectedFile] = useState(null);

  const [fileUniqueName, setFileUniqueName] = useState("");
  const [fileSize, setFileSize] = useState(0);
  const [fileName, setFileName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [finishTime, setFinishTime] = useState(0);
  const [uploadTime, setUploadTime] = useState(0);

  // Handler for dropdown value change

  const handleDropdownChange1 = (event) => {
    setDeviceId(event.target.value);
  };
  const handleDropdownChange2 = (event) => {
    setCenterFreq(event.target.value);
  };
  const handleDropdownChange3 = (event) => {
    setSamplingRate(event.target.value);
  };

  // Handler for form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectedFile) {
      const fileName = selectedFile.name;
      const fileExtension = fileName.split(".").pop().toLowerCase();

      setIsSubmitted(true);

      // Do something with the form data, e.g., send it to an API
      console.log(
        "Form submitted with selected value:",
        deviceId,
        centerFreq,
        samplingRate
      );
      console.log("Selected file:", selectedFile);
    }
  };

  useEffect(() => {
    if (hash && !compressedFile) {
      compressFile(selectedFile);
    } else {
      console.log("compression didnt start");
    }
  }, [hash, compressedFile, selectedFile]);

  useEffect(() => {
    if (resumable && compressedFile) {
      console.log(compressedFile);
      console.log(resumable);
      const compressedFileName = `${selectedFile.name}.gz`;
      const zippedFile = new File([compressedFile], compressedFileName);

      console.log("this is zipped file");
      console.log(zippedFile);
      if (resumable) {
        resumable.addFile(zippedFile);
        if (isFileAdded) {
          let nowtime = performance.now();
          setStartTime(nowtime);
          console.log("start time :", nowtime);
          resumable.upload();
        }
      }
    } else {
      console.log("file not added to resumable object");
    }
  }, [compressedFile, selectedFile, resumable, isFileAdded]);



  //compress the file
  const compressFile = async (selectedFile) => {

    setCompressedFile(selectedFile);

  };


  //const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

  const uploader = new Resumable({
    target: baseURL1,
    // fileType: ['png', 'jpg', 'jpeg', 'mp4', 'csv', 'h5', 'mkv', 'gz', 'zip', 'cfile', 'HEIC', 'iso'],
    fileType: ["png", "h5", "cfile", "gz"],
    chunkSize: 1024 * 1024 * 25,
    uploadMethod: "POST",
    headers: {
      // 'X-CSRF-TOKEN': csrfToken,
      Accept: "application/json",
    },

    simultaneousUploads: 1,
    testChunks: false,
    throttleProgressCallbacks: 1,
  });

  uploader.on("fileAdded", (file) => {
    console.log("File added:");
    console.log("File added:", file);
    setIsFileAdded(true);
  });

  uploader.on("uploadStart", function (file, response) {
    // trigger when file progress update
    console.log("uploading");
  });

  uploader.on("fileSuccess", (file, message) => {
    console.log("fileSuccess");
    const response = JSON.parse(message);
    console.log("this is file unique name:-", response.file_unique_name);
    setFileUniqueName(response.file_unique_name);
    setIsSuccess(1);
    console.log(
      fileName,
      fileSize,
      response.file_unique_name,
      deviceId,
      centerFreq,
      samplingRate,
      hash
    );
  });

  uploader.on("fileProgress", function (file, response) {
    // trigger when file progress update
    console.log("---- this is uploading files -----");
    console.log(file);
    setProgress(Math.floor(file.progress() * 100));

    if (Math.floor(file.progress() * 100) == 100) {
      setPercentage(100);
    }
  });

  uploader.on("fileError", function (file, response) {
    // trigger when there is any error
    console.log(file);
    console.log(response);
    alert("file uploading error.");
    navigate("/testUploadChunk");
  });

 
  useEffect(() => {
    setResumable(uploader);
  }, []);

  const handleFileSelect = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file != null) {
      console.log(file);
      setSelectedFile(file);
      setFileName(file.name);
      setFileSize(file.size);
    }

  };

  useEffect(() => {
    if (isSuccess === 1 && percentage == 100) {
      let nowtime = performance.now();
      console.log("end time : ", nowtime);
      let dif = ((nowtime - startTime) / 1000).toFixed(2);
      console.log("time to take for upload : ", dif, " sec");
      setUploadTime(dif);

      console.log("-- ---- --");
      console.log(
        fileName,
        fileSize,
        fileUniqueName,
        deviceId,
        centerFreq,
        samplingRate,
        hash
      );
      console.log("-- ---- --");
      axios
        .post(baseURL2, {
          name: fileName,
          size: fileSize,
          unique_name: fileUniqueName,
          device_id: deviceId,
          center_freq: centerFreq,
          sampling_rate: samplingRate,
          file_hash: hash,
        })
        .then((response) => {
          console.log(response);
          if (response.data.status == 200) {
            setIsSendToDatabase(true);
            setTimeout(() => {
              navigate("/file-list");
            }, 10000);
          } else {
            alert("Error");
            navigate("/file-list");
          }
        });
      console.log(fileName, fileSize, fileUniqueName);
    }
  }, [isSuccess, percentage, fileName, fileSize, fileUniqueName]);


  const sxStyle = {
    "&:hover": {
      "&& fieldset": {
        border: "2px solid #00245A",
      },
    },
    borderRadius: "4px",
    backgroundColor: "white",
    "& .MuiInputLabel-outlined": {
      color: "grey", // Initial color
      "&.Mui-focused": {
        color: "#00245A", // Color when focused
      },
    },
    "& .MuiOutlinedInput-root": {

      "&.Mui-focused": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#00245A",
          borderWidth: "2px",
        },
      },
      "& .MuiInputLabel-outlined": {
        color: "#00245A",
        fontWeight: "bold",
        "&.Mui-focused": {
          color: "grey",
          fontWeight: "bold",
        },
      },
    },
  }

  const containerStyle = {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "8px",
    marginTop: "80px",
  };

  return (

    <div className="maindiv" >

      {!isSubmitted && (
        <Container maxWidth="sm" id="form" style={containerStyle}>
          <Typography
            variant="h4"
            color="textPrimary"
            align="center"
            gutterBottom
            sx={{ p: 3 }}
          >
         testUploadChunk
          </Typography>
          <Typography
            variant="h4"
            color="textPrimary"
            align="center"
            marginTop={7}
            gutterBottom
          >
            <form onSubmit={handleSubmit}>
              {/* Dropdown */}
              <FormControl
                fullWidth
                style={{ marginBottom: "20px", textAlign: "left" }}
                required
                sx={{
                  ...sxStyle,

                }}
              >
                <InputLabel id="dropdown-label-1">Device Name</InputLabel>
                <Select
                  labelId="dropdown-label-1"
                  id="dropdown-1"
                  value={deviceId}
                  onChange={handleDropdownChange1}
                  label="Device Name"
                  style={{ borderColor: "#525252" }}

                >
                  <MenuItem value={1}>Arduino</MenuItem>
                  <MenuItem value={2}>Raspberry Pi</MenuItem>
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
                  value={centerFreq}
                  onChange={handleDropdownChange2}

                  sx={{
                    ...sxStyle,
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">Hz</InputAdornment>
                    ),
                    inputMode: "numeric",
                    pattern: "/^-?d+(?:.d+)?$/g",
                    inputProps: {
                      min: 0,
                      step: 0.01,

                    },
                  }}
                  required
                />
              </FormControl>

              <FormControl
                fullWidth
                style={{ marginBottom: "20px", textAlign: "left" }}

                sx={{
                  ...sxStyle,
                }}
                required
              >
                <InputLabel id="dropdown-label-3">Sampling Rate</InputLabel>
                <Select
                  labelId="dropdown-label-2"
                  id="dropdown-2"
                  value={samplingRate}
                  onChange={handleDropdownChange3}
                  label="Sampling Rate"
                >
                  <MenuItem value="8">8 MHz</MenuItem>
                  <MenuItem value="10">10 MHz</MenuItem>
                  <MenuItem value="12.5">12.5 MHz</MenuItem>
                  <MenuItem value="16">16 MHz</MenuItem>
                  <MenuItem value="20">20 MHz</MenuItem>
                </Select>
              </FormControl>

              <FormControl
                required
                sx={{
                  width: '100%',
                  marginLeft: '0px',
                  borderColor: 'red'
                }}

              >
                <Box
                  sx={{
                    backgroundColor: "white",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "left",
                    justifyContent: "left",
                    marginLeft: 0,
                    border: '1px solid #bbbbbb',
                    borderRadius: '4px',
                    '&:hover': {
                      border: '2px solid #00245A', // Border color on hover
                    },
                  }}

                >
                  <div className="fileUploadInput" style={{ display: 'flex', flexDirection: 'row', width: "100%" }} >

                    <AttachFileIcon fontSize="7px" sx={{ color: '#00245A', mt: '10px', ml: '4px' }} />

                    <input
                      type="file"
                      required
                      onChange={handleFileSelect}
                      accept=".h5, .cfile, .png, .pdf, .jpg"
                      style={{
                        color: selectedFile ? 'black' : 'grey', height: '53px',
                        border: 'none', left: '-20px', width: "100%"
                      }}

                    />
                  </div>


                </Box>

              </FormControl>

              {/* Submit button */}
              <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: 3, mb: 2, bgcolor: '#00245A', color: 'white', pt: 1, pb: 1, width: "150px",
                  '&:hover': {
                    bgcolor: 'rgba(0, 36, 90, 0.8)',
                  },
                }}
              >
                Upload
              </Button>
            </form>
          </Typography>
        </Container>
      )}
      {isSubmitted && !isSendToDatabase && (
        <Container maxWidth="sm" id="showProgress" >
          <Stack
            spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            {compressedFile ? (
              <div>
                <Typography variant="h3" color="textPrimary" align="center">
                  Uploading
                </Typography>
              </div>
            ) : (
              <div>
                <Typography variant="h3" color="textPrimary" align="center">
                  Preparing
                </Typography>
              </div>
            )}
            <div className="bouncing-loader" style={{ marginTop: "40px" }}>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </Stack>

          <div>
            <Typography variant="h6" color="textSecondary" align="center">
              Please wait. This will take several minutes.
            </Typography>
          </div>
          <Box sx={{ width: "100%", marginTop: 10, mb: hash && compressedFile ? 40 : 36 }}>
            {compressedFile && <LinearProgressWithLabel value={progress} />}
          </Box>

        </Container>
      )}
      {isSendToDatabase && (
        <Container maxWidth="sm" id="showSuccess" sx={{ mb: 58 }}>
          <Alert>
            <AlertTitle>File successfully uploaded</AlertTitle>
          </Alert>
          <h1>{uploadTime} sec</h1>
        </Container>
      )}
    </div>

  );
}

export default EmFileUploadPage;
