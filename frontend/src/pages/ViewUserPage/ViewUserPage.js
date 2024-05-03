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
import { useState, useEffect } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { useQuery, useQueryClient } from "react-query";
import { API_URL, queryKeys } from "../../constants";
import { getSingleUser } from "../../services/userService";


const ContainerBox = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 0 3% 0",
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
    const { selectedUserId } = useParams();
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

    const { user } = useUser();
    const queryClient = useQueryClient();

    const { data: selectedUser, error, isLoading } = useQuery({
        queryKey: [queryKeys["getSingleUser"]],
        queryFn: () => getSingleUser(user, selectedUserId),
        enabled: false,
    });

    useEffect(() => {
        // Enable the query when the user object becomes available
        if (user) {
            queryClient.prefetchQuery(
                [queryKeys["getSingleUser"]],
                () => getSingleUser(user, selectedUserId)
            );
        }
    }, [user, selectedUserId]);

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
                        pb:10,
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
                        <Tooltip title={lessThanMd ? "Back" : null} >
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
                            src={selectedUser?.profile_image}
                            alt="profile pic"
                            width="200px"
                            height="200px"
                            style={{ borderRadius: "50%",  border: "2px solid black" }}
                        />

                    </ImageBox>
                    <Typography color="textPrimary" variant={lessThanMd ? "h4" : "h3"} fontWeight="bold">
                        {selectedUser?.first_name}  {selectedUser?.last_name}
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
                            <Typography color="textPrimary" variant={lessThanSm ? "h6" : "h5"} fontWeight="bold">
                                User Type :
                            </Typography>
                            {selectedUser?.user_type == "developer" && (
                                <Typography variant={lessThanSm ? "h6" : "h5"}>
                                    Developer
                                </Typography>
                            )}
                            {selectedUser?.user_type == "investigator" && (
                                <Typography variant={lessThanSm ? "h6" : "h5"}>
                                    Investigator
                                </Typography>
                            )}

                        </Stack>

                        <Stack direction="row" spacing={1} sx={{ mt: 2 }} >
                            <Typography color="textPrimary" variant={lessThanSm ? "h6" : "h5"} fontWeight="bold">
                                Email :
                            </Typography>
                            <Typography variant={lessThanSm ? "h6" : "h5"}>
                                {selectedUser?.email}
                            </Typography>
                        </Stack>

                        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                            <Typography color="textPrimary" variant={lessThanSm ? "h6" : "h5"} fontWeight="bold">
                                Account Status:
                            </Typography>
                            {selectedUser?.ban_status == "false" && (
                                <Typography variant={lessThanSm ? "h6" : "h5"} sx={{ color: "green" }}>
                                    Active
                                </Typography>
                            )}
                            {selectedUser?.ban_status == "true" && (
                                <Typography variant={lessThanSm ? "h6" : "h5"} sx={{ color: "red" }}>
                                    Inactive
                                </Typography>
                            )}

                        </Stack>
                    </Box>
                </Box>
            </ContainerBox>
        </>
    );
}

export default ViewUserPage;
