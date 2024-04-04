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
import { useState } from "react";
import { styled } from "@mui/system";
import image from "./../../resources/profile.jpg";
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
}));

const ImageBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  position: "relative",
  display: "inline-block",
  width: "fit-content",
  marginTop: "0%",
}));



function ProfilePage() {
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


  const lessThanSm = useMediaQuery(theme.breakpoints.down("sm"));
  const lessThanMd = useMediaQuery(theme.breakpoints.down("md"));



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
          <Box sx={{ p:1, mt:3, ml:4, width: "90%", }}>
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
    width: lessThanMd? '100%': '100%',
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
        <HeadingBox>
          <Typography variant="h4" gutterBottom>
            Profile page
          </Typography>
        </HeadingBox>
        <ContentBox>
          <Box
            sx={{ bgcolor: 'white', display: 'flex', height: "100%", mt: 2, width: "100%" }}
          >
            <Tabs
              orientation="vertical"
              variant="standard"
              scrollButtons="auto"
              TabIndicatorProps={{
                hidden: 1,
                sx: { backgroundColor: "#00245A", mt: 7, height: 5 },
                style: { // Override the style to force horizontal display
                  display: 'block',
                  width: '100%', // Ensure indicator spans the full width
                  height: '2px', // Set height as per your requirement
                  backgroundColor: '#00245A',
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
                minWidth: lessThanSm ? "100px": "200px",
              }}
            >
              <Tab icon={<EditIcon style={{ marginTop: "5px", marginRight: lessThanSm ? 0 : "10px", }} />}
                label={lessThanSm ? null : "Edit Profile"}
                {...a11yProps(0)}
                sx={{ borderRadius: '10px', display: "flex", flexDirection: "row", backgroundColor: "#f8f8f8", p: lessThanMd ? 0 : 2 }} />

              <Tab icon={<LockIcon style={{ marginTop: "5px", marginRight: lessThanSm ? 0 : "10px" }} />}
                label={lessThanSm ? null : "Password"}
                {...a11yProps(1)}
                sx={{ mt: 3, borderRadius: '10px', display: "flex", flexDirection: "row", backgroundColor: "#f8f8f8", p: lessThanMd ? 0 : 2 }} />

            </Tabs>

            <TabPanel value={value} index={0}>
              <Box component="form" onSubmit={{}}
                sx={{ mt: 0, ml: lessThanMd? -2 : 2, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12}>
                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: lessThanMd ? "space-between" :  "space-between" }}>
                      <ImageBox>
                        <img
                          src={image}
                          alt="profile pic"
                          width="200px"
                          height="200px"
                          style={{ borderRadius: "50%" }}
                        />
                        <UploadButton aria-label="upload">
                          <CameraAltIcon />
                        </UploadButton>
                      </ImageBox>
                    

                        <Button
                           
                          type="submit"
                          variant="contained"
                          onClick={{}}
                          sx={{
                            mt: '145px', 
                            mb: 2, 
                            bgcolor: 'red',
                             color: 'white', 
                             pt: 0, pb: 0, ml : lessThanMd ? "0px" : 0,
                             width: lessThanMd? "50px" :"160px", height: "45px", 
                            '&:hover': {
                              bgcolor: 'rgba(255, 0, 0, 0.7)',
                            },
                          }}
                        >
                          
                          {lessThanMd ? <DeleteIcon /> : 'Delete Account' }
                    
                        </Button>
                    

                    </Box>

                  </Grid>

                  <Grid item xs={12} md={12}>

                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      onChange={(event) => setFirstname(event.target.value)}
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
                      autoComplete="family-name"
                      // error={lastnameError !== ""}
                      // helperText={lastnameError}
                      sx={{
                        ...sxStyle
                      }}
                      onChange={(event) => setLastname(event.target.value)}
                    />
                  </Grid>

                  {/* <span style={{ marginTop: "5px" }}>{"\u00A0"}</span> */}

                  <Grid item xs={12} md={12}>
                    <TextField
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      // error={emailError !== ""}
                      // helperText={emailError}
                      sx={{
                        ...sxStyle,
                      }}
                      onChange={(event) => { }}
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
                      // error={PhoneNumberError !== ""}
                      // helperText={PhoneNumberError}
                      sx={{
                        ...sxStyle
                      }}
                      onChange={(event) => setPhoneNumber(event.target.value)}
                    />
                  </Grid>

                </Grid>
                <span style={{ marginTop: "10px" }}>{"\u00A0"}</span>
                <Button
                  type="submit"
                  variant="contained"
                  onClick={{}}
                  sx={{
                    mt: 0, mb: 2, bgcolor: '#00245A', color: 'white', pt: 1, pb: 1, width: "150px",
                    '&:hover': {
                      bgcolor: 'rgba(0, 36, 90, 0.8)',
                    },
                  }}
                >
                  Update Profile
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
                      variant="outlined"
                      sx={{
                        ...sxStyle
                      }}
                    >
                      <InputLabel htmlFor="outlined-adornment-password">
                        Current Password
                      </InputLabel>
                      <OutlinedInput
                        id="password"
                        type={showPassword ? "text" : "password"}
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
                        onChange={(event) => setCurrentPassword(event.target.value)}
                      // error={passwordError !== ""}
                      />
                      {/* {passwordError !== "" && (
                        <FormHelperText error>{passwordError}</FormHelperText>
                      )} */}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      variant="outlined"
                      sx={{
                        ...sxStyle
                      }}
                    >
                      <InputLabel htmlFor="outlined-adornment-password">
                        New Password
                      </InputLabel>
                      <OutlinedInput
                        id="password"
                        type={showPassword ? "text" : "password"}
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
                        label=" New Password"
                        onChange={(event) => setPassword(event.target.value)}
                      // error={passwordError !== ""}
                      />
                      {/* {passwordError !== "" && (
                        <FormHelperText error>{passwordError}</FormHelperText>
                      )} */}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl
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
                        id="password"
                        type={showPassword ? "text" : "password"}
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
                        onChange={(event) => setConfirmPassword(event.target.value)}
                      // error={passwordError !== ""}
                      />
                      {/* {passwordError !== "" && (
                        <FormHelperText error>{passwordError}</FormHelperText>
                      )} */}
                    </FormControl>
                  </Grid>
                </Grid>
                <span style={{ marginTop: "10px" }}>{"\u00A0"}</span>
                <Button
                  type="submit"
                  variant="contained"
                  onClick={{}}
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
        </ContentBox>

      </ContainerBox>
    </>
  );
}

export default ProfilePage;
