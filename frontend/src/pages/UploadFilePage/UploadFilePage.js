import { AppBar, CssBaseline, Toolbar, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import "./UploadFilePage.css";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Input,
} from '@mui/material';
import PropTypes from 'prop-types';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

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
    const [progress, setProgress] = React.useState(10);
    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
        }, 800);
        return () => {
            clearInterval(timer);
        };
    }, []);
    // State to manage the selected value of the dropdown
    const [selectedValue1, setSelectedValue1] = useState('');
    const [selectedValue2, setSelectedValue2] = useState('');
    const [selectedValue3, setSelectedValue3] = useState('');
    const [selectedValue4, setSelectedValue4] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };
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
        console.log('Form submitted with selected value:', selectedValue1, selectedValue2,selectedValue3,selectedValue4);
        console.log('Selected file:', selectedFile);
       
    };
    return (
        <>
            <CssBaseline />
            <AppBar possition="relative">
                <Toolbar>
                    <Typography variant="h6">
                        EMvidance
                    </Typography>
                </Toolbar>
            </AppBar>
            
            <div className="maindiv" style={{ marginTop: '100px', }}>
            {!isSubmitted && (
                <Container maxWidth="sm" id="form">
                    <Typography variant="h2" color="textPrimary" align="center" gutterBottom>
                        Upload File
                    </Typography>
                    <Typography variant="h4" color="textPrimary" align="center" gutterBottom>
                        <form onSubmit={handleSubmit}>
                            {/* Dropdown */}
                            <FormControl fullWidth style={{ marginBottom: '20px' }} required>
                                <InputLabel id="dropdown-label-1">Select an option</InputLabel>
                                <Select
                                    labelId="dropdown-label-1"
                                    id="dropdown-1"
                                    value={selectedValue1}
                                    onChange={handleDropdownChange1}
                                    label="Select an option"

                                >
                                    <MenuItem value="option1">Option 1</MenuItem>
                                    <MenuItem value="option2">Option 2</MenuItem>
                                    <MenuItem value="option3">Option 3</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth style={{ marginBottom: '20px' }} required>
                                <InputLabel id="dropdown-label-2">Select an option</InputLabel>
                                <Select
                                    labelId="dropdown-label-2"
                                    id="dropdown-2"
                                    value={selectedValue2}
                                    onChange={handleDropdownChange2}
                                    label="Select an option"

                                >
                                    <MenuItem value="option1">Option 1</MenuItem>
                                    <MenuItem value="option2">Option 2</MenuItem>
                                    <MenuItem value="option3">Option 3</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth style={{ marginBottom: '20px' }} required>
                                <InputLabel id="dropdown-label-3">Select an option</InputLabel>
                                <Select
                                    labelId="dropdown-label-3"
                                    id="dropdown-3"
                                    value={selectedValue3}
                                    onChange={handleDropdownChange3}
                                    label="Select an option"

                                >
                                    <MenuItem value="option1">Option 1</MenuItem>
                                    <MenuItem value="option2">Option 2</MenuItem>
                                    <MenuItem value="option3">Option 3</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth style={{ marginBottom: '20px' }} required>
                                <InputLabel id="dropdown-label-4">Select an option</InputLabel>
                                <Select
                                    labelId="dropdown-label-4"
                                    id="dropdown-4"
                                    value={selectedValue4}
                                    onChange={handleDropdownChange4}
                                    label="Select an option"

                                >
                                    <MenuItem value="option1">Option 1</MenuItem>
                                    <MenuItem value="option2">Option 2</MenuItem>
                                    <MenuItem value="option3">Option 3</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth style={{ marginBottom: '20px' }} required>
                                <InputLabel htmlFor="file-input"></InputLabel>
                                <Input
                                    id="file-input"
                                    type="file"
                                    onChange={handleFileChange}
                                // endAdornment={<InputAdornment position="end">{selectedFile && selectedFile.name}</InputAdornment>}
                                />
                            </FormControl>


                            {/* Submit button */}
                            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px', width: '200px' }}>
                                Submit
                            </Button>
                        </form>
                    </Typography>

                </Container>
                    )}
                {isSubmitted && (
                <Container maxWidth="sm" id="showProgress">
                    <Box sx={{ width: '100%' }}>
                        <LinearProgressWithLabel value={progress}/>
                    </Box>
                </Container>
                )}
            </div>

        </>
    );
}

export default UploadFilePage;