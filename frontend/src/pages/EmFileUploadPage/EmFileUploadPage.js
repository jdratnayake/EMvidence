import React, { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { CssBaseline, Typography } from "@mui/material";
import { borderColor, Container, height } from "@mui/system";
import "./EmFileUploadPage.css";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import CryptoJS from "crypto-js";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Resumable from "resumablejs";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
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
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Tooltip from "@mui/material/Tooltip";
import { createTheme, ThemeProvider } from "@mui/material/styles";
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
import { API_URL, queryKeys } from "../../constants";
import { useUser } from "../../contexts/UserContext";
import { getDeviceDetails } from "../../services/deviceService";

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

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function ConfirmCancelDialog({ open, onClose }) {
  const handleClose = () => {
    onClose(false); // User chose to cancel
  };

  const handleConfirm = () => {
    onClose(true); // User chose to confirm
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogContentText>
            Do you want to cancel the process?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={handleConfirm} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}

function EmFileUploadPage() {
  const baseURL1 = API_URL + "/upload_data_file";
  const baseURL2 = API_URL + "/send_to_database";
  const baseURL3 = API_URL + "/process_file";

  const { user } = useUser();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [isSuccess, setIsSuccess] = useState(0);
  const [isFileAdded, setIsFileAdded] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [hash, setHash] = useState("");
  const [hasingProgress, setHasingProgress] = useState(0);
  const [compressedFile, setCompressedFile] = useState(null);
  const [compressionProgress, setCompressionProgress] = useState(0);
  const [uploading, setuploading] = useState(0);
  const [resumable, setResumable] = useState(null);
  const [isSendToDatabase, setIsSendToDatabase] = useState(false);
  const [showCancelAlert, setShowCancelAlert] = useState(false);
  const queryClient = useQueryClient();

  // State to manage the selected value of the dropdown
  const [deviceId, setDeviceId] = useState();
  const [centerFreq, setCenterFreq] = useState();
  const [samplingRate, setSamplingRate] = useState();
  const [selectedFile, setSelectedFile] = useState(null);

  const [fileUniqueName, setFileUniqueName] = useState("");
  const [fileSize, setFileSize] = useState(0);
  const [fileName, setFileName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [finishTime, setFinishTime] = useState(0);
  const [uploadTime, setUploadTime] = useState(0);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const confirmCancel = () => {
    setShowCancelDialog(true);
  };

  const handleCloseCancelDialog = (confirmed) => {
    setShowCancelDialog(false);
    if (confirmed) {
      navigate("/file-list"); // Perform cancel action
    }
  };

  function LinearProgressWithLabel(props) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mt: compressedFile ? 4 : 0,
        }}
      >
        <Box sx={{ width: "100%", mr: 1 }}>
          <BorderLinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35, ml: 1 }}>
          <Typography variant="h6" color="text.secondary">{`${Math.round(
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
      calculateHash();
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

  //calculate hash
  const calculateHash = () => {
    if (selectedFile) {
      console.log("if---");
      const chunkSize = 1024 * 1024 * 20; // 1 MB chunks
      const totalChunks = Math.ceil(selectedFile.size / chunkSize);
      let currentChunk = 0;
      let hash = CryptoJS.algo.MD5.create();

      const reader = new FileReader();

      reader.onload = (event) => {
        const chunkData = CryptoJS.lib.WordArray.create(event.target.result);
        hash.update(chunkData);

        currentChunk++;
        const currentProgress = (currentChunk / totalChunks) * 100;
        setHasingProgress(currentProgress);

        if (currentChunk < totalChunks) {
          processNextChunk();
        } else {
          const finalHash = hash.finalize();
          setHash(finalHash.toString());
        }
      };

      const processNextChunk = () => {
        const start = currentChunk * chunkSize;
        const end = Math.min(start + chunkSize, selectedFile.size);
        const blob = selectedFile.slice(start, end);
        reader.readAsArrayBuffer(blob);
      };

      processNextChunk();
    } else {
      console.log("else---");
    }
  };

  //compress the file
  const compressFile = async (selectedFile) => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }
    let time1 = performance.now();
    const compressedFileName = `${selectedFile.name}.gz`;
    const CHUNK_SIZE = 1024 * 1024 * 20;
    const originalFileName = selectedFile.name;
    const compressedChunks = [];

    let offset = 0;

    const readNextChunk = () => {
      const reader = new FileReader();

      reader.onload = (event) => {
        // console.log(event.target.result);
        const chunkData = new Uint8Array(event.target.result);
        // console.log(chunkData);
        const compressedData = pako.gzip(chunkData);
        compressedChunks.push(compressedData);

        offset += CHUNK_SIZE;
        setCompressionProgress((offset / selectedFile.size) * 100);

        if (offset < selectedFile.size) {
          readNextChunk();
        } else {
          // Combine all compressed chunks into a single Uint8Array
          const compressedResult = concatenateUint8Arrays(compressedChunks);

          // Create a Blob with the compressed data
          const compressedBlob = new Blob([compressedResult], {
            type: "application/gzip",
          });

          setCompressedFile(compressedBlob);
          let time2 = performance.now();
          console.log(
            "Time for Compression : ",
            (time2 - time1) / 1000,
            " sec"
          );
        }
      };

      const chunk = selectedFile.slice(offset, offset + CHUNK_SIZE);
      reader.readAsArrayBuffer(chunk);
    };

    readNextChunk();
  };

  const concatenateUint8Arrays = (arrays) => {
    const totalLength = arrays.reduce((acc, arr) => acc + arr.length, 0);
    const result = new Uint8Array(totalLength);

    let offset = 0;
    arrays.forEach((arr) => {
      result.set(arr, offset);
      offset += arr.length;
    });

    return result;
  };

  const uploader = new Resumable({
    target: baseURL1,
    // fileType: ['png', 'jpg', 'jpeg', 'mp4', 'csv', 'h5', 'mkv', 'gz', 'zip', 'cfile', 'HEIC', 'iso'],
    fileType: ["cfile", "gz"],
    chunkSize: 1024 * 1024 * 20,
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
    console.log("----------  this is base url ----------");
    console.log(baseURL1);
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
    navigate("/file-list");
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
      const userId = user["userData"].user_id;
      axios
        .post(baseURL2, {
          user_id: userId,
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
          } else {
            alert("Error", response);
            navigate("/file-list");
          }
        });

      // axios.post(baseURL3, { unique_name: fileUniqueName })
      //   .then(() => {
      //     console.log(" --- msg 1 ---");
      //     navigate("/file-list");

      //   })
      //   .catch(error => {
      //     console.error("Error processing file:", error);
      //     // Handle error, e.g., show a message to the user
      //   });

      setTimeout(() => {
        navigate("/file-list");
        console.log(" --- msg 2 ---");
      }, 3000);

      console.log(fileName, fileSize, fileUniqueName);
    }
  }, [isSuccess, percentage, fileName, fileSize, fileUniqueName]);

  const { data, error, isLoading } = useQuery({
    queryKey: [queryKeys["getDeviceDetails"]],
    queryFn: () => getDeviceDetails(user),
    enabled: false,
  });

  useEffect(() => {
    if (user) {
      queryClient.prefetchQuery([queryKeys["getDeviceDetails"]], () =>
        getDeviceDetails(user)
      );
    }
  }, [user]);

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
  };

  const containerStyle = {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "8px",
    marginTop: "80px",
  };

  return (
    <div className="maindiv">
      {!isSubmitted && (
        <Container maxWidth="sm" id="form" style={containerStyle}>
          <Typography
            variant="h4"
            color="textPrimary"
            align="center"
            gutterBottom
            sx={{ p: 3 }}
          >
            Upload File
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
                  {data?.map((device) => (
                    <MenuItem value={device.device_id}>
                      {device.device_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth style={{ marginBottom: "20px" }} required>
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
                      <InputAdornment position="end">MHz</InputAdornment>
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
                  width: "100%",
                  marginLeft: "0px",
                  borderColor: "red",
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
                    border: "1px solid #bbbbbb",
                    borderRadius: "4px",
                    "&:hover": {
                      border: "2px solid #00245A", // Border color on hover
                    },
                  }}
                >
                  <div
                    className="fileUploadInput"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                    }}
                  >
                    <AttachFileIcon
                      fontSize="7px"
                      sx={{ color: "#00245A", mt: "10px", ml: "4px" }}
                    />

                    <input
                      type="file"
                      required
                      onChange={handleFileSelect}
                      accept=".cfile"
                      style={{
                        color: selectedFile ? "black" : "grey",
                        height: "53px",
                        border: "none",
                        left: "-20px",
                        width: "100%",
                      }}
                    />
                  </div>
                </Box>
                <Typography  sx={{alignItems:"left", fontSize:"15px", justifyContent:"left", display:"flex", mt:"2px"}}>* .cfile only</Typography>
              </FormControl>

              {/* Submit button */}
              <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  bgcolor: "#00245A",
                  color: "white",
                  pt: 1,
                  pb: 1,
                  width: "150px",
                  "&:hover": {
                    bgcolor: "rgba(0, 36, 90, 0.8)",
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
        <Container maxWidth="sm" id="showProgress">
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

          <Box
            sx={{
              width: "100%",
              marginTop: 10,
              mb: hash && compressedFile ? 40 : 36,
              display: "flex",
              flexDirection: "row",
            }}
          >
            {compressedFile && (
              <div style={{ width: "100%", mt: 10 }}>
                <LinearProgressWithLabel value={progress} />
              </div>
            )}

            {!hash && !compressedFile && (
              <div style={{ width: "100%" }}>
                <Stack
                  spacing={1}
                  direction="row"
                  justifyContent="left"
                  alignItems="center"
                >
                  <Typography variant="h6" color="textSecondary" align="left">
                    Calculating file hash
                  </Typography>
                  {/* <Box sx={{ display: "flex", size: "10px" }}>
                    <CircularProgress size={16} />
                  </Box> */}
                </Stack>
                <LinearProgressWithLabel value={hasingProgress} />
              </div>
            )}

            {hash && !compressedFile && (
              <div style={{ width: "100%" }}>
                <Stack
                  spacing={1}
                  direction="row"
                  justifyContent="left"
                  alignItems="center"
                >
                  <Typography variant="h6" color="textSecondary" align="left">
                    Compressing{" "}
                  </Typography>
                  {/* <Box sx={{ display: "flex", size: "10px" }}>
                    <CircularProgress size={16} />
                  </Box> */}
                </Stack>
                <LinearProgressWithLabel value={compressionProgress} />
              </div>
            )}
            {/* <Tooltip title="Cancel">
              <IconButton sx={{ mt: "28px", ml: 1, background:"white", fontSize: "small" }} onClick={confirmCancel}>
                <CloseIcon sx={{ color: "red" }} />
              </IconButton>
            </Tooltip> */}
            <ConfirmCancelDialog
              open={showCancelDialog}
              onClose={handleCloseCancelDialog}
            />
          </Box>
        </Container>
      )}
      {isSendToDatabase && (
        <Container maxWidth="sm" id="showSuccess" sx={{ mb: 58 }}>
          <Alert>
            <AlertTitle>File successfully uploaded</AlertTitle>
          </Alert>
        </Container>
      )}
    </div>
  );
}

export default EmFileUploadPage;
