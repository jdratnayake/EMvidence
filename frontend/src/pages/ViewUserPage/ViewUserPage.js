import {
    IconButton,
    Paper,
    TextField,
    useMediaQuery,
    useTheme,
    Grid,
    Avatar,
    Button,
    Link,
    Box,
    Typography,
    Container,
    createTheme,
    ThemeProvider,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    OutlinedInput,
    InputAdornment,
    FormHelperText,
} from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import { useState } from "react";
import { styled } from "@mui/system";
import profImage from "./../../resources/profile.jpg";
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import LockIcon from '@mui/icons-material/Lock';
import EditIcon from '@mui/icons-material/Edit';
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Stack from "@mui/material/Stack";
import DeleteIcon from '@mui/icons-material/Delete';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate, useLocation } from "react-router-dom";

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
    borderRadius: "10px",
    width: "100%",
    marginLeft: "0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "left",
    alignItems: "flex-start",
    height: "90vh",
}));

const UploadButton = styled(IconButton)(() => ({
    background: "grey",
    height: "40px",
    width: "40px",
    position: "absolute",
    bottom: "3%",
    left: "50%",
    transform: "translateX(-50%)",
    // cursor: "pointer",
    // '&:hover': {
    //   cursor: 'pointer',
    // },
}));

const ImageBox = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    position: "relative",
    display: "inline-block",
    width: "fit-content",
    marginTop: "-5px",
    paddingBottom: "10px",
}));



function ViewUserPage() {
    const theme = useTheme();
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [firstnameError, setFirstnameError] = useState("");
    const [lastnameError, setLastnameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [phoneNumberError, setPhoneNumberError] = useState("");

    const navigate = useNavigate();

    const lessThanSm = useMediaQuery(theme.breakpoints.down("sm"));
    const lessThanMd = useMediaQuery(theme.breakpoints.down("md"));

    const [image, setImage] = useState(profImage);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`vertical-tabpanel-${index}`}
                aria-labelledby={`vertical-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 1, mt: 3, ml: 4, width: "90%", }}>
                        {children}
                    </Box>
                )}
            </div>
        );
    }

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };

    function a11yProps(index) {
        return {
            id: `vertical-tab-${index}`,
            'aria-controls': `vertical-tabpanel-${index}`,
        };
    }

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const sxStyle = {
        width: lessThanMd ? '100%' : '100%',
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
    }

    return (
        <>
            <ContainerBox>
                {/* <HeadingBox>
                    <Typography variant="h4" gutterBottom>
                        Profile page
                    </Typography>
                </HeadingBox> */}

                <Box
                    sx={{
                        bgcolor: 'white',
                        display: 'flex',
                        width: lessThanSm ? "100%" : "75%",
                        borderRadius: "10px",
                        mt: 2,
                        p: 2,
                        flexDirection: "column",
                        justificontent: "center",
                        alignItems: "center",
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: "right",
                            width: "100%",
                            alignItems: "center",

                        }}

                    >
                        <Tooltip title={lessThanSm ? "Back" : null} >
                            <Button
                                type="submit"
                                variant="contained"
                                onClick={() => {
                                    navigate("/user-list")
                                }}
                                sx={{
                                    // mt: '145px',
                                    mb: 2,
                                    bgcolor: '#00245A',
                                    color: 'white',
                                    pt: 0, pb: 0, ml: lessThanMd ? "0px" : 0,
                                    width: lessThanMd ? "50px" : "100px", height: "45px",
                                    '&:hover': {
                                        bgcolor: 'rgba(0,36,90, 0.8)',
                                    },
                                }}
                            >
                                {lessThanMd ? <KeyboardBackspaceIcon /> : 'Back'}
                            </Button>
                        </Tooltip>
                    </Box>


                    <ImageBox>
                        <img
                            src={image}
                            alt="profile pic"
                            width="200px"
                            height="200px"
                            style={{ borderRadius: "50%" }}
                        />

                    </ImageBox>
                    <Typography color="textPrimary" variant={lessThanSm ? "h4" : "h3"} fontWeight="bold">
                        Emali perera
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: "left",
                            // width: "100%",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            mt: 2,

                        }}
                    >
                        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                            <Typography color="textPrimary" variant={lessThanSm ? "h6" : "h5"}  fontWeight="bold">
                                User Type :
                            </Typography>
                            <Typography variant={lessThanSm ? "h6" : "h5"}>
                                Developer
                            </Typography>
                        </Stack>

                        <Stack direction="row" spacing={1} sx={{ mt: 2 }} >
                            <Typography color="textPrimary" variant={lessThanSm ? "h6" : "h5"} fontWeight="bold">
                                Email :
                            </Typography>
                            <Typography variant={lessThanSm ? "h6" : "h5"}>
                                kksenalpunsara@gmail.com
                            </Typography>
                        </Stack>

                        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                            <Typography color="textPrimary" variant={lessThanSm ? "h6" : "h5"} fontWeight="bold">
                                Account Status:
                            </Typography>
                            <Typography variant={lessThanSm ? "h6" : "h5"} sx={{ color: "green" }}>
                                Active
                            </Typography>
                        </Stack>
                    </Box>
                    <Tooltip title={lessThanMd ? "Deactivate Account" : null} >
                        <Button
                            type="submit"
                            variant="contained"
                            // onClick={{}}
                            sx={{
                                mt: 3,
                                mb: 2,
                                bgcolor: 'red',
                                color: 'white',
                                pt: 0, pb: 0, ml: lessThanMd ? "0px" : 0,
                                width: lessThanMd ? "50px" : "200px", height: "45px",
                                '&:hover': {
                                    bgcolor: 'rgba(255, 0, 0, 0.7)',
                                },
                            }}
                        >
                            {lessThanMd ? <PersonOffIcon /> : 'Deactivate Account'}
                        </Button>
                    </Tooltip>


                </Box>


            </ContainerBox>
        </>
    );
}

export default ViewUserPage;