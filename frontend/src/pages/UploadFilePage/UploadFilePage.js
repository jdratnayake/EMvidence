import { CssBaseline, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState, useEffect } from "react";
import "./UploadFilePage.css";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import CryptoJS from 'crypto-js';
import {
    FormControl,
    InputLabel,
    Input,
} from '@mui/material';
import PropTypes from 'prop-types';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Resumable from 'resumablejs';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from "../../components/NavBar";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import pako from 'pako';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
}));

function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <BorderLinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
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

    const baseURL1 = 'http://127.0.0.1:8000/api/upload_data_file';
    const baseURL2 = 'http://127.0.0.1:8000/api/send_to_database';


    const navigate = useNavigate();
    const [progress, setProgress] = useState(0);
    const [isSuccess, setIsSuccess] = useState(0);
    const [isFileAdded, setIsFileAdded] = useState(false);
    const [percentage, setPercentage] = useState(0);
    const [hash, setHash] = useState("");
    const [hasingProgress, setHasingProgress] = useState(0);
    const [compressedFile, setCompressedFile] = useState(null);
    const [compressionProgress, setCompressionProgress] = useState(0);
    const [uploading, setuploading] = useState(0)
    const [resumable, setResumable] = useState(null);
    const [isSendToDatabase, setIsSendToDatabase] = useState(false);


    // State to manage the selected value of the dropdown
    const [selectedValue1, setSelectedValue1] = useState('test');
    const [selectedValue2, setSelectedValue2] = useState('test');
    const [selectedValue3, setSelectedValue3] = useState('test');
    const [selectedValue4, setSelectedValue4] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    const [fileUniqueName, setFileUniqueName] = useState('');
    const [fileSize, setFileSize] = useState(0);
    const [fileName, setFileName] = useState('');
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

        if (selectedFile) {
            const fileName = selectedFile.name;
            const fileExtension = fileName.split('.').pop().toLowerCase();

            if (fileExtension === 'png' || fileExtension === 'cfile' || fileExtension === 'h5') {
                // Valid PNG file selected, you can proceed with further handling
                console.log('Valid PNG file selected:', fileName);
                // Add your additional logic here
            } else {
                // Display an error message or take appropriate action for invalid file
                console.error('Invalid file type. Please select a PNG file.');
                // Clear the file input if needed
                event.target.value = null;
            }
        }
        setIsSubmitted(true);
        calculateHash();
        // Do something with the form data, e.g., send it to an API
        console.log('Form submitted with selected value:', selectedValue1, selectedValue2, selectedValue3);
        console.log('Selected file:', selectedFile);
    };


    useEffect(() => {
        if (hash && !compressedFile) {
            compressFile(selectedFile);
        } else {
            console.log("compression didnt start");
        }
    }, [hash,compressedFile, selectedFile])



    useEffect(() => {
        if (resumable && compressedFile ) {
            console.log(compressedFile);
            console.log(resumable);
            const compressedFileName = `${selectedFile.name}.gz`;
            const zippedFile = new File([compressedFile], compressedFileName);
            if (resumable) {
                resumable.addFile(zippedFile);
                if(isFileAdded){
                    resumable.upload();
                }
            }
        } else {
            console.log("file not added to resumable object");
        }
    }, [compressedFile, selectedFile, resumable, isFileAdded])
   

    // useEffect(() => {
    //     if (hash && compressedFile) {
    //         if (resumable) {
                
    //         } else {
    //             console.log("not ploading");
    //         }
    //     } else {
    //         console.log("hash not set");
    //     }
    // }, [hash, compressedFile, resumable])


    //calculate hash
    const calculateHash = () => {
        if (selectedFile) {
            console.log("if---");
            const chunkSize = 1024 * 1024; // 1 MB chunks
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
            alert('Please select a file first.');
            return;
        }
        const compressedFileName = `${selectedFile.name}.gz`;
        const CHUNK_SIZE = 1024 * 1024 * 20;
        const originalFileName = selectedFile.name;
        const compressedChunks = [];

        let offset = 0;

        const readNextChunk = () => {
            const reader = new FileReader();

            reader.onload = (event) => {
                const chunkData = new Uint8Array(event.target.result);
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
                        type: 'application/gzip',
                    });

                    setCompressedFile(compressedBlob);
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

    
    //const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');


    const uploader = new Resumable({
        target: baseURL1,
        // fileType: ['png', 'jpg', 'jpeg', 'mp4', 'csv', 'h5', 'mkv', 'gz', 'zip', 'cfile', 'HEIC', 'iso'],
        fileType: ['png', 'h5', 'cfile', 'gz'],
        chunkSize: 1024 * 1024 * 5,
        uploadMethod: 'POST',
        headers: {
            // 'X-CSRF-TOKEN': csrfToken,
            'Accept': 'application/json',
        },
        simultaneousUploads: 3,
        testChunks: false,
        throttleProgressCallbacks: 1,
    });


    uploader.on('fileAdded', (file) => {
        console.log('File added:', file);
        setIsFileAdded(true)
    });

    uploader.on('uploadStart', function (file, response) {
        // trigger when file progress update
        console.log("uploading");
    });


    uploader.on('fileSuccess', (file, message) => {
        console.log("fileSuccess")
        const response = JSON.parse(message);
        console.log('this is file unique name:-', response.file_unique_name);
        setFileUniqueName(response.file_unique_name);
        setIsSuccess(1);
    });


    uploader.on('fileProgress', function (file, response) {
        console.log("fileProgress")
        // trigger when file progress update
        setProgress(Math.floor(file.progress() * 100));

        if (Math.floor(file.progress() * 100) == 100) {
            setPercentage(100);
        }
    });

    uploader.on('fileError', function (file, response) {
        // trigger when there is any error
        console.log(file);
        alert('file uploading error.')
        navigate('/file_manage')
    });


    useEffect(() => {
        setResumable(uploader);
    }, []);


    const handleFileSelect = (event) => {
        event.preventDefault();
        const file = event.target.files[0];
        if (file) {
            const fileName = file.name;
            const fileExtension = fileName.split('.').pop().toLowerCase();

            if (fileExtension === 'png' || fileExtension === 'cfile' || fileExtension === 'h5') {
                // Valid PNG file selected, you can proceed with further handling
                console.log('Valid cfile selected:', fileName);
                // Add your additional logic here
            } else {
                // Display an error message or take appropriate action for invalid file
                console.error('Invalid file type. Please select a cfile file.');
                // Clear the file input if needed
                event.target.value = null;
            }
        }
        console.log(file);
        setSelectedFile(file);
        setFileName(file.name);
        setFileSize(file.size);
        
    };

    useEffect(() => {
        if (isSuccess === 1 && percentage == 100) {
            axios.post(baseURL2, {
                name: fileName,
                size: fileSize,
                unique_name: fileUniqueName,
                device_name: selectedValue1,
                center_freq: selectedValue2,
                sampling_rate: selectedValue3,
                file_hash: hash,
            })
                .then((response) => {
                    console.log(response.status);
                    if (response.status == 200) {
                        setIsSendToDatabase(true);
                        setTimeout(() => {
                            navigate('/file_manage')

                        }, 1000);

                    } else {
                        alert('Error')
                        navigate('/file_manage')
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

   
    return (
        <>
            <CssBaseline />
            <NavBar />

            <div className="maindiv" style={{ marginTop: '100px', }}>
                {!isSubmitted && (

                    <Container maxWidth="sm" id="form">
                        <Typography variant="h2" color="textPrimary" align="center" gutterBottom>
                            Upload File
                        </Typography>
                        <Typography variant="h4" color="textPrimary" align="center" gutterBottom>
                            <form onSubmit={handleSubmit}>

                                {/* Dropdown */}
                                {/* <FormControl fullWidth style={{ marginBottom: '20px' }} required>
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
                                                    border: "3px solid gray"
                                                }
                                            }
                                        }}

                                    >
                                        <MenuItem value="Arduino">Arduino</MenuItem>
                                        <MenuItem value="Raspberry Pi">Raspberry Pi</MenuItem>

                                    </Select>
                                </FormControl>

                                <FormControl fullWidth style={{ marginBottom: '20px' }} required>
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
                                                    border: "3px solid gray"
                                                }
                                            }
                                        }}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">Hz</InputAdornment>,
                                            inputMode: 'numeric',
                                            pattern: '/^-?\d+(?:\.\d+)?$/g',
                                            inputProps: { min: 0, step: 0.01, style: { textAlign: 'center' } }
                                        }}
                                        required />
                                </FormControl>

                                <FormControl fullWidth style={{ marginBottom: '20px' }} required>
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
                                                    border: "3px solid gray"
                                                }
                                            }
                                        }}
                                    >
                                        <MenuItem value="8 MHz">8 MHz</MenuItem>
                                        <MenuItem value="10 MHz">10 MHz</MenuItem>
                                        <MenuItem value="12.5 MHz">12.5 MHz</MenuItem>
                                        <MenuItem value="16 MHz">16 MHz</MenuItem>
                                        <MenuItem value="20 MHz">20 MHz</MenuItem>
                                    </Select>
                                </FormControl> */}

                                <FormControl fullWidth style={{ marginBottom: '20px' }} required>
                                    <InputLabel htmlFor="file-input"></InputLabel>
                                    <Input
                                        id="file-input"
                                        type="file"
                                        onChange={handleFileSelect}
                                        accept="image/png, image/jpeg"
                                    />
                                </FormControl>


                                {/* Submit button */}
                                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px', width: '200px', backgroundColor: '#525252', color: 'white' }} >
                                    Submit
                                </Button>
                            </form>
                        </Typography>

                    </Container>
                )}
                {isSubmitted && !isSendToDatabase && (

                    <Container maxWidth="sm" id="showProgress">
                        <Stack spacing={2} direction="row" justifyContent="center" alignItems="center" >

                            {compressedFile ? (
                                <div >
                                    <Typography variant="h3" color="textPrimary" align="center" >
                                        Uploading
                                    </Typography>
                                </div>
                            ) : (
                                <div>
                                    <Typography variant="h3" color="textPrimary" align="center" >
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

                        <div >
                            <Typography variant="h6" color="textSecondary" align="center" >
                                Please wait. This will take few minitues.
                            </Typography>
                        </div>


                        <Box sx={{ width: '100%', marginTop: "15px" }}>
                            {compressedFile && (
                                <LinearProgressWithLabel value={progress} />
                            )}

                            {!hash && !compressedFile && (
                                <div>
                                    <Stack spacing={1} direction="row" justifyContent="left" alignItems="center" >
                                        <Typography variant="h6" color="textSecondary" align="left">Calculating file hash</Typography>
                                        <Box sx={{ display: 'flex', size: '10px' }}>
                                            <CircularProgress size={16} />
                                        </Box>

                                    </Stack>
                                    <LinearProgressWithLabel value={hasingProgress} />
                                </div>
                            )}

                            {hash && !compressedFile && (
                                <div>
                                    <Stack spacing={1} direction="row" justifyContent="left" alignItems="center" >
                                        <Typography variant="h6" color="textSecondary" align="left">Compressing </Typography>
                                        <Box sx={{ display: 'flex', size: '10px' }}>
                                            <CircularProgress size={16} />
                                        </Box>

                                    </Stack>
                                    <LinearProgressWithLabel value={compressionProgress} />
                                </div>
                            )}

                        </Box>


                    </Container>
                )}
                {isSendToDatabase && (
                    <Container maxWidth="sm" id="showSuccess">

                        <Alert >
                            <AlertTitle>File successfully uploaded</AlertTitle>
                        </Alert>

                    </Container>

                )}
            </div>

        </>
    );
}

export default UploadFilePage;

