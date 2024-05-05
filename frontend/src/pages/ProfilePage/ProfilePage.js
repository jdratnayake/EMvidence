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
import defaultProfImage from "./../../resources/profile.jpg";
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
import DeleteIcon from '@mui/icons-material/Delete';
import Popover from '@mui/material/Popover';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import { useUser } from "../../contexts/UserContext";
import { useQuery, useQueryClient } from "react-query";
import { API_URL, queryKeys } from "../../constants";
import { getSingleUser } from "../../services/userService";
import {
  validateFirstName,
  validateLastName,
  validateEmail,
  validateEmailExistence,
  validateRole,
  validatePassword,
  validateConfirmPassword,
} from "./Validation";


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



function ProfilePage() {
  const { user, addUser } = useUser();
  const queryClient = useQueryClient();

  const theme = useTheme();
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState();
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
  const [firstNameBackup, setFirstnameBackup] = useState("");
  const [lastNameBackup, setLastnameBackup] = useState();
  const [emailBackup, setEmailBackup] = useState();
  const [phoneNumberBackup, setPhoneNumberBackup] = useState();
  const [showPassword, setShowPassword] = useState();
  const [password, setPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const [passwordError, setPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [firstnameError, setFirstnameError] = useState("");
  const [lastNameError, setLastnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  const lessThanSm = useMediaQuery(theme.breakpoints.down("sm"));
  const lessThanMd = useMediaQuery(theme.breakpoints.down("md"));
  const [image, setImage] = useState(null);
  const [profImage, setProfImage] = useState(null);
  const [imageName, setImageName] = useState(null);
  const [isImageChange, setIsImageChnge] = useState(0);
  const [imageBackup, setImageBackup] = useState(null);

  const { data, error, isLoading } = useQuery({
    queryKey: [queryKeys["getSingleUser"]],
    queryFn: () => getSingleUser(user, user["userData"].user_id),
    enabled: false,
    onSuccess: (data) => {
      setFirstname(data?.first_name);
      setLastname(data?.last_name);
      setEmail(data?.email);
      setPhoneNumber(data?.phone_number);
      setImage(data?.profile_image);
      setImageName(data?.profile_picture)
      setFirstnameBackup(data?.first_name);
      setLastnameBackup(data?.last_name);
      setEmailBackup(data?.email);
      setPhoneNumberBackup(data?.phone_number);
      setImageBackup(data?.profile_image)
    },
  });

  useEffect(() => {
    // Enable the query when the user object becomes available
    if (user) {
      queryClient.prefetchQuery(
        [queryKeys["getSingleUser"]],
        () => getSingleUser(user, user["userData"].user_id)
      );
    }
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfImage(file);
    if (file) {
      const fileName = file.name;
      setImageName(fileName);
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

  const handleFormSubmit = async (event) => {

    const formData = new FormData();

    formData.append('prof_img', profImage);
    formData.append('user_id', user["userData"].user_id);
    formData.append('img_name', imageName);
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('phone_number', phoneNumber);
    formData.append('email', email);
    const token = user["userData"]["token"];
    await axios.post(
      API_URL + "/user/update-user",
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token
        },
      }
    ).then((response) => {
      // console.log(response.data);
      console.log(response.data);

      toast.success("User Data Updated Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // console.log("this is user data in the user state");
      user["userData"].first_name = firstName;
      user["userData"].last_name = lastName;
      user["userData"].email = email;
      // addUser({ user });

    }
    ).catch((error) => {

      toast.error("Faild to Update Details", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });


  };

  // validate phone number
  function validatePhoneNumber(phoneNumber) {
    // Regular expression to match a valid phone number
    const phoneRegex = /^\d{10}$/; // Assumes a 10-digit phone number

    return phoneRegex.test(phoneNumber);
  }

  const handlePassWordSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;
    // if (newPassword !== confirmPassword) {
    //   setError('New password and confirm password must match.');
    //   return;
    // }
    setPasswordError("");
    setNewPasswordError("")
    setConfirmPasswordError("");
    const currentPasswordStatus = validatePassword(password);
    if (currentPasswordStatus !== null) {
      setPasswordError(currentPasswordStatus);
      isValid = false;
    }


    const passwordStatus = validatePassword(newPassword);
    if (passwordStatus !== null) {
      setNewPasswordError(passwordStatus);
      isValid = false;
    }

    const confirmPasswordStatus = validateConfirmPassword(
      confirmPassword,
      newPassword
    );

    if (confirmPasswordStatus !== null) {
      setConfirmPasswordError(confirmPasswordStatus);
      isValid = false;
    }
    if (isValid) {
      const formData = new FormData();
      formData.append('password', password);
      formData.append('new_password', newPassword);
      formData.append('user_id', user["userData"].user_id);

      const token = user["userData"]["token"];

      console.log(token);
      await axios.post(API_URL + '/user/update-password',
        formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token
        },
      }
      ).then((res) => {
        console.log(res.data);
        console.log(res.status);
        if (res.data.status == 'match') {
          toast.success("Password Updated Successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else if (res.data.status == 'not_match') {
          toast.error("Password doesn't Match", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

        } else {

          toast.error("Faild to Update Password", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }
      ).catch((error) => {

        toast.error("Faild to Update Password", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })

      setPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }

  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ContainerBox>
        <Typography
          variant="h4"
          color="textPrimary"
          align="center"
          gutterBottom
        >
          Profile page
        </Typography>

        <Box
          sx={{ bgcolor: 'white', display: 'flex', height: "100%", mt: 2, width: "100%" , mb:8}}
        >
          <Tabs
            orientation="vertical"
            variant="standard"
            scrollButtons="auto"
            TabIndicatorProps={{
              hidden: 1,
              sx: { mt: 7, height: 5 },
              style: { // Override the style to force horizontal display
                display: 'block',
                width: '100%', // Ensure indicator spans the full width
                height: '2px', // Set height as per your requirement
                // backgroundColor: '#00245A',
                display: 'none'
                // Change indicator color if needed
              }
            }}
            textColor="#00245A"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{
              mt: 3, ml: lessThanMd ? 1 : 3, color: "#00245A", display: "flex", justifyContent: "left", alignItems: "left", width: lessThanMd ? '50%' : '15%',
              "& button:hover": { backgroundColor: "#e8e8e8" },
              "& button:focus": { backgroundColor: "#e8e8e8" },
              "& button:active": { backgroundColor: "#e8e8e8" },
              "& button.Mui-selected": { backgroundColor: "#e8e8e8" },
              minWidth: lessThanSm ? "100px" : "200px",
            }}
          >
            <Tooltip title={lessThanSm ? "Edit Profile" : null} placement="top" >
              <Tab icon={<EditIcon style={{ marginTop: "5px", marginRight: lessThanSm ? 0 : "10px", }} />}
                label={lessThanSm ? null : "Edit Profile"}
                {...a11yProps(0)}
                sx={{ borderRadius: '10px', display: "flex", flexDirection: "row", backgroundColor: "#f8f8f8", p: lessThanMd ? 0 : 2 }} />
            </Tooltip>
            <Tooltip title={lessThanSm ? "Update Password" : null} >
              <Tab icon={<LockIcon style={{ marginTop: "5px", marginRight: lessThanSm ? 0 : "10px" }} />}
                label={lessThanSm ? null : "Password"}
                {...a11yProps(1)}
                sx={{ mt: 3, borderRadius: '10px', display: "flex", flexDirection: "row", backgroundColor: "#f8f8f8", p: lessThanMd ? 0 : 2 }} />
            </Tooltip>
          </Tabs>


          <TabPanel value={value} index={0}>

            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: lessThanMd ? "space-between" : "space-between", mt: "0px",  }}>

              <ImageBox>
                <img
                  src={image}
                  alt="profile pic"
                  width="200px"
                  height="200px"
                  style={{ borderRadius: "50%",  border: "2px solid black" }}
                />

                <Tooltip title="Edit Image" placement="left-start">
                  <UploadButton aria-label="upload">
                    <div sx={{ cursor: "pointer", }}>
                      <input
                        accept="image/*"
                        id="contained-button-file"
                        type="file"
                        style={{ display: 'none' }}
                        onChange={handleImageChange}
                      />
                      <label htmlFor="contained-button-file">
                        <CameraAltIcon sx={{ mt: 1, cursor: "pointer" }} />
                      </label>
                    </div>

                  </UploadButton >
                </Tooltip>



              </ImageBox>

              <Tooltip title={lessThanMd ? "Delete Account" : null} >
                <Button
                  type="submit"
                  variant="contained"
                  // onClick={{}}
                  sx={{
                    // mt: '145px',
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
                  {lessThanMd ? <DeleteIcon /> : 'Delete Account'}
                </Button>
              </Tooltip>


            </Box>
            <Box
              sx={{ mt: 1, ml: lessThanMd ? -2 : 2, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", }}>

              <Grid container spacing={2}>

                <Grid item xs={12} md={12}>

                  <TextField
                    name="firstName"
                    fullWidth
                    id="firstName"
                    label="First Name"
                    defaultValue={firstName}
                    autoComplete="firstName"
                    required
                    onBlur={(event) => {
                      setFirstname(event.target.value);
                      console.log(event.target.value);
                    }}
                    // error={firstnameError !== ""}
                    // helperText={firstnameError}
                    sx={{
                      ...sxStyle,
                    }}
                  />
                </Grid>

                {/* <span style={{ marginTop: "5px" }}>{"\u00A0"}</span> */}

                <Grid item xs={12} md={12}>
                  <TextField
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lastName"
                    defaultValue={lastName}
                    required
                    // error={lastNameError !== ""}
                    // helperText={lastNameError}
                    sx={{
                      ...sxStyle
                    }}
                    onBlur={(event) => {
                      setLastname(event.target.value);

                    }}
                  />
                </Grid>

                {/* <span style={{ marginTop: "5px" }}>{"\u00A0"}</span> */}

                <Grid item xs={12} md={12}>
                  <TextField
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    defaultValue={email}
                    autoComplete="email"
                    required
                    // error={emailError !== ""}
                    // helperText={emailError}
                    sx={{
                      ...sxStyle,
                    }}
                    onBlur={(event) => setEmail(event.target.value)}
                  />
                </Grid>

                {/* <span style={{ marginTop: "5px" }}>{"\u00A0"}</span> */}

                <Grid item xs={12} md={12}>
                  <TextField
                    fullWidth
                    id="phoneNum"
                    label="Phone Number"
                    name="phoneNum"
                    autoComplete="phoneNum"
                    defaultValue={phoneNumber}

                    // error={PhoneNumberError !== ""}
                    // helperText={PhoneNumberError}
                    sx={{
                      ...sxStyle
                    }}
                    onBlur={(event) => {
                      setPhoneNumber(event.target.value);
                      const inputValue = event.target.value;
                      setPhoneNumber(inputValue);
                      setIsValidPhoneNumber(validatePhoneNumber(inputValue));

                    }}
                  />
                  {/* {!isValidPhoneNumber && <p style={{color:"red", marginTop: "-1px"}}> * Please enter a valid phone number.</p>} */}
                </Grid>
              </Grid>

              <Button
                type="submit"
                variant="contained"
                onClick={() => {
                  console.log(firstName, lastName, email);
                  handleFormSubmit();
                }}
                sx={{
                  mt: 3, mb: 2, bgcolor: '#00245A', color: 'white', pt: 1, pb: 1, width: "150px",
                  '&:hover': {
                    bgcolor: 'rgba(0, 36, 90, 0.8)',
                  },
                }}
              >
                Update
              </Button>
            </Box>

          </TabPanel>

          <TabPanel value={value} index={1}>
            <Box component="form" onSubmit={{}}
              sx={{ mt: 0, ml: 2, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl
                    fullWidth
                    required
                    variant="outlined"
                    sx={{
                      ...sxStyle
                    }}
                  >
                    <InputLabel htmlFor="outlined-adornment-password">
                      Current Password
                    </InputLabel>
                    <OutlinedInput
                      id="passwordCurrent"
                      type={showPassword ? "text" : "password"}
                      defaultValue={password}

                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword((show) => !show)}
                            onMouseDown={(event) => event.preventDefault()}
                            edge="end"
                          >
                            {showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Current Password"
                      onBlur={(event) => setPassword(event.target.value)}
                      error={passwordError !== ""}
                    />
                    {passwordError !== "" && (
                      <FormHelperText error>{passwordError}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl
                    fullWidth
                    required
                    variant="outlined"
                    sx={{
                      ...sxStyle
                    }}
                  >
                    <InputLabel htmlFor="outlined-adornment-password">
                      New Password
                    </InputLabel>
                    <OutlinedInput
                      id="passwordNew"
                      type={showPassword ? "text" : "password"}
                      defaultValue={newPassword}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword((show) => !show)}
                            onMouseDown={(event) => event.preventDefault()}
                            edge="end"
                          >
                            {showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="New Password"
                      onBlur={(event) => setNewPassword(event.target.value)}
                      error={newPasswordError !== ""}
                    />
                    {newPasswordError !== "" && (
                      <FormHelperText error>{newPasswordError}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl
                    required
                    fullWidth
                    variant="outlined"
                    sx={{
                      ...sxStyle
                    }}
                  >
                    <InputLabel htmlFor="outlined-adornment-password">
                      Confirm Password
                    </InputLabel>
                    <OutlinedInput
                      id="passwordNewConfirm"
                      type={showPassword ? "text" : "password"}
                      defaultValue={confirmPassword}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword((show) => !show)}
                            // onMouseDown={(event) => event.preventDefault()}
                            edge="end"
                          >
                            {showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Confirm Password"
                      onBlur={(event) => setConfirmPassword(event.target.value)}
                      error={confirmPasswordError !== ""}
                    />
                    {confirmPasswordError !== "" && (
                      <FormHelperText error>
                        {confirmPasswordError}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
              <span style={{ marginTop: "10px" }}>{"\u00A0"}</span>
              <Button

                variant="contained"
                onClick={handlePassWordSubmit}
                sx={{
                  mt: 0, mb: 2, bgcolor: '#00245A', color: 'white', pt: 1, pb: 1, width: "150px",
                  '&:hover': {
                    bgcolor: 'rgba(0, 36, 90, 0.8)',
                  },
                }}
              >
                Update
              </Button>
            </Box>
          </TabPanel>

        </Box>


      </ContainerBox>
    </>
  );
}

export default ProfilePage;
