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
import { useNavigate} from "react-router-dom";
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
      <Box sx={{ width: "100%", mr: 1 , }}>
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
  const baseURL2 = "http://127.0.0.1:8000/api/send_to_database";

  const navigate = useNavigate();
 // const history = useHistory();
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

  // State to manage the selected value of the dropdown
  const [deviceName, setDeviceName] = useState("");
  const [centerFreq, setCenterFreq] = useState(null);
  const [samplingRate, setSamplingRate] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const [fileUniqueName, setFileUniqueName] = useState("");
  const [fileSize, setFileSize] = useState(0);
  const [fileName, setFileName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handler for dropdown value change

  const handleDropdownChange1 = (event) => {
    setDeviceName(event.target.value);
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

      if (
        fileExtension === "png" ||
        fileExtension === "cfile" ||
        fileExtension === "h5"
      ) {
        // Valid PNG file selected, you can proceed with further handling
        console.log("Valid cfile is selected:", fileName);
        // Add your additional logic here
      } else {
        // Display an error message or take appropriate action for invalid file
        alert("Invalid file type. Please select a cfile.");
        // Clear the file input if needed
        event.target.value = null;
      }

      setIsSubmitted(true);
      calculateHash();
      // Do something with the form data, e.g., send it to an API
      console.log(
        "Form submitted with selected value:",
        deviceName,
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
      const chunkSize = 1024 * 1024 * 5; // 1 MB chunks
      const totalChunks = Math.ceil(selectedFile.size / chunkSize);
      let currentChunk = 0;
      let hash = CryptoJS.algo.SHA256.create();

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
    const compressedFileName = `${selectedFile.name}.gz`;
    const CHUNK_SIZE = 1024 * 1024 * 5;
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

        //encrypting
        // console.log('encrypting');
        // let chunkData = event.target.result;
        // console.log(chunkData.toString());
        // let encryptedData = CryptoJS.AES.encrypt(chunkData, 'encryption_key');
        // let  dataToCompress = new Uint8Array(encryptedData);
        // const compressedData = pako.gzip(dataToCompress);
        // compressedChunks.push(compressedData);
        // console.log('+++++++++++');

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
        }
      };

      const chunk = selectedFile.slice(offset, offset + CHUNK_SIZE);
      reader.readAsArrayBuffer(chunk);
    };

    readNextChunk();
  };

  const encryptChunk = (data) => {
    return new Promise((resolve, reject) => {
      try {
        const encryptedData = CryptoJS.AES.encrypt(
          data,
          "encryption_key"
        ).toString();
        resolve(encryptedData);
      } catch (error) {
        reject(error);
      }
    });
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

  //const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

  const uploader = new Resumable({
    target: baseURL1,
    // fileType: ['png', 'jpg', 'jpeg', 'mp4', 'csv', 'h5', 'mkv', 'gz', 'zip', 'cfile', 'HEIC', 'iso'],
    fileType: ["png", "h5", "cfile", "gz"],
    chunkSize: 1024 * 1024 * 20,
    uploadMethod: "POST",
    headers: {
      // 'X-CSRF-TOKEN': csrfToken,
      Accept: "application/json",
    },
    preprocess: function (chunk) {
      // console.log('preprocessing');
      // console.log(chunk.data);
      // const encryptedData = CryptoJS.AES.encrypt(chunk.data, 'encryption_key');
      // console.log('+++++++++++');
      // // Update the chunk data with the encrypted data
      // chunk.data = encryptedData;
      // console.log(chunk.data);
      chunk.preprocessFinished();

    },
    simultaneousUploads: 3,
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
      deviceName,
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

  uploader.on("chunkingComplete", function (file, response) {
    // trigger when there is any error
    console.log("this is file chunks -----------");
    console.log(file.chunks);
    console.log("chunking complete");
    file.chunks.forEach(function (chunk) {
      console.log("before encryption");
      console.log(chunk.data);
      var key = "1234"; // Use the same key generation logic
      var encryptedChunk = CryptoJS.AES.encrypt(chunk.data, key);
      console.log("after encryption");
      chunk.data = encryptedChunk;
      console.log(encryptedChunk);
      console.log(chunk.data);
    });
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
      console.log("-- ---- --");
      console.log(
        fileName,
        fileSize,
        fileUniqueName,
        deviceName,
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
          device_name: deviceName,
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
            }, 1000);
          } else {
            alert("Error");
            navigate("/file-list");
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
  const sxStyle = {
    // "&:hover": {
    //   "&& fieldset": {
    //     border: "2px solid gray",
    //   },
    // },
    borderRadius: "4px",
    backgroundColor : "white",
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
            sx={{p:3}}
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
                  value={deviceName}
                  onChange={handleDropdownChange1}
                  label="Device Name"
                  style={{ borderColor: "#525252" }}

                >
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
                      borderColor: 'black', // Border color on hover
                    },
                  }}

                >
                  <div className="fileUploadInput" style={{ display: 'flex', flexDirection: 'row', }} >

                    <AttachFileIcon fontSize="7px" sx={{ color: '#00245A', mt: '10px', ml: '4px' }} />

                    <input
                      type="file"
                      required
                      onChange={handleFileSelect}
                      accept=".h5, .cfile, .png, .pdf"
                      style={{
                        color: selectedFile ? 'black' : 'grey', height: '53px',
                        border: 'none', left: '-20px'
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
              Please wait. This will take few minitues.
            </Typography>
          </div>

          <Box sx={{ width: "100%", marginTop: 10 , mb: hash && compressedFile ? 40 :36}}>
            {compressedFile && <LinearProgressWithLabel value={progress} />}

            {!hash && !compressedFile && (
              <div>
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
              <div>
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
          </Box>
        </Container>
      )}
      {isSendToDatabase && (
        <Container maxWidth="sm" id="showSuccess" sx={{mb: 58}}>
          <Alert>
            <AlertTitle>File successfully uploaded</AlertTitle>
          </Alert>
        </Container>
      )}
    </div>

  );
}

export default EmFileUploadPage;
