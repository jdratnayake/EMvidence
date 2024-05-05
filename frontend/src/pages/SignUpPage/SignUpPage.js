import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useMutation } from "react-query";
import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  useTheme,
  IconButton,
  useMediaQuery,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  validateFirstName,
  validateLastName,
  validateEmail,
  validateEmailExistence,
  validateRole,
  validatePassword,
  validateConfirmPassword,
} from "./Validation";
import { registerUser } from "../../services/authService";
import { useUser } from "../../contexts/UserContext";
import logo from "../../resources/logo-white.png";
import logo2 from "../../resources/logo-side-white.png";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <RouterLink color="inherit" to="/" style={{ color: "grey" }}>
        EMvidence
      </RouterLink>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

function SignUpPage() {
  const theme = useTheme();
  const lessThanSm = useMediaQuery(theme.breakpoints.down("sm"));
  const lessThanMd = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { user, addUser } = useUser();

  const [firstnameError, setFirstnameError] = useState("");
  const [lastnameError, setLastnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [roleError, setRoleError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const {
    mutate: register,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      setFirstnameError("");
      setLastnameError("");
      setEmailError("");
      setRoleError("");
      setPasswordError("");
      setConfirmPasswordError("");

      if (data.hasOwnProperty("error")) {
        if (data["error"].hasOwnProperty("first_name")) {
          setFirstnameError(data["error"]["first_name"]);
        }
        if (data["error"].hasOwnProperty("last_name")) {
          setLastnameError(data["error"]["last_name"]);
        }
        if (data["error"].hasOwnProperty("email")) {
          setEmailError(data["error"]["email"]);
        }
        if (data["error"].hasOwnProperty("user_type")) {
          setRoleError(data["error"]["user_type"]);
        }
        if (data["error"].hasOwnProperty("password")) {
          setPasswordError(data["error"]["password"]);
        }
        if (data["error"].hasOwnProperty("confirm_password")) {
          setConfirmPasswordError(data["error"]["confirm_password"]);
        }
      } else {
        const userData = {
          user_id: data.user.user_id,
          user_type: data.user.user_type,
          account_status: data.user.account_status,
          first_name: data.user.first_name,
          last_name: data.user.last_name,
          email: data.user.email,
          profile_picture: data.user.profile_picture,
          token: data.token,
        };
        addUser({ userData });
        if (userData.user_type === "admin") {
          navigate("/admin");
        } else if (userData.user_type === "investigator") {
          navigate("/report");
        } else if (userData.user_type === "developer") {
          navigate("/plugin-upload-list");
        } else {
          navigate("/error");
        }
      }
    },

    onError: (error) => {
      console.log(error);
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    setFirstnameError("");
    setLastnameError("");
    setEmailError("");
    setRoleError("");
    setPasswordError("");
    setConfirmPasswordError("");

    let isValid = true;

    const firstNameStatus = validateFirstName(firstname);
    if (firstNameStatus !== null) {
      setFirstnameError(firstNameStatus);
      isValid = false;
    }

    const lastnameStatus = validateLastName(lastname);
    if (lastnameStatus !== null) {
      setLastnameError(lastnameStatus);
      isValid = false;
    }

    const emailStatus = validateEmail(email);
    if (emailStatus !== null) {
      setEmailError(emailStatus);
      isValid = false;
    }

    const checkEmailStatus = await validateEmailExistence(email);
    if (checkEmailStatus) {
      setEmailError(checkEmailStatus);
      isValid = false;
    }

    const roleStatus = validateRole(role);
    if (roleStatus !== null) {
      setRoleError(roleStatus);
      isValid = false;
    }

    const passwordStatus = validatePassword(password);
    if (passwordStatus !== null) {
      setPasswordError(passwordStatus);
      isValid = false;
    }

    const confirmPasswordStatus = validateConfirmPassword(
      confirmPassword,
      password
    );
    if (confirmPasswordStatus !== null) {
      setConfirmPasswordError(confirmPasswordStatus);
      isValid = false;
    }

    if (isValid) {
      const userData = {
        first_name: firstname,
        last_name: lastname,
        email: email,
        user_type: role,
        password: password,
        confirm_password: confirmPassword,
      };

      // console.log(userData);

      register(userData);
    }
  };
  const sxStyle = {
    // "&:hover": {
    //   "&& fieldset": {
    //     border: "2px solid gray",
    //   },
    // },
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
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container spacing={0} style={{ height: "100vh" }}>
        <Grid xs={12} sm={6} sx={{ backgroundColor: "#00245A" }}>
          <Container maxWidth="xs">
            <Box
              marginTop={lessThanSm ? 1 : lessThanMd ? 20 : 10}
              marginBottom={lessThanSm ? 1 : 0}
              //{lessThanSm ? 0 : {lessThanMd ? 18 : 14}}
              sx={{
                display: "flex",
                flexDirection: lessThanSm ? "row" : "column",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: 0,
              }}
            >
              <Box
                component="img"
                sx={{
                  maxHeight: { xs: 300, sm: 350, md: 630 },
                  maxWidth: { xs: 300, sm: 350, md: 500 },
                }}
                src={lessThanSm ? logo2 : logo}
              />
            </Box>
          </Container>
        </Grid>
        <Grid xs={12} sm={6} sx={{ backgroundColor: "white" }}>
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                marginTop: lessThanSm ? 2 : 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "#00245A" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>

              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      onChange={(event) => setFirstname(event.target.value)}
                      error={firstnameError !== ""}
                      helperText={firstnameError}
                      sx={{
                        ...sxStyle,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                      error={lastnameError !== ""}
                      helperText={lastnameError}
                      sx={{
                        ...sxStyle,
                      }}
                      onChange={(event) => setLastname(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      error={emailError !== ""}
                      helperText={emailError}
                      sx={{
                        ...sxStyle,
                      }}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      sx={{
                        ...sxStyle,
                      }}
                    >
                      <InputLabel id="demo-simple-select-label">
                        Your Role
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="selectRole"
                        label="Your Role"
                        value={role}
                        onChange={(event) => setRole(event.target.value)}
                        error={roleError !== ""}
                      >
                        <MenuItem value={"developer"}>Developer</MenuItem>
                        <MenuItem value={"investigator"}>Invesigator</MenuItem>
                      </Select>
                      {roleError !== "" && (
                        <FormHelperText error>{roleError}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      variant="outlined"
                      sx={{
                        ...sxStyle,
                      }}
                    >
                      <InputLabel htmlFor="outlined-adornment-password">
                        Password
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
                        label="Password"
                        onChange={(event) => setPassword(event.target.value)}
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
                      variant="outlined"
                      sx={{
                        ...sxStyle,
                      }}
                    >
                      <InputLabel htmlFor="outlined-adornment-password">
                        Confirm Password
                      </InputLabel>
                      <OutlinedInput
                        id="confirmPassword"
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
                        label="Confirm Password"
                        onChange={(event) =>
                          setConfirmPassword(event.target.value)
                        }
                        error={confirmPasswordError !== ""}
                        InputLabelProps={{
                          style: { color: "grey" },
                        }}
                      />

                      {confirmPasswordError !== "" && (
                        <FormHelperText error>
                          {confirmPasswordError}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
                <Button
                  id="signUpButton"
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    bgcolor: "#00245A",
                    color: "white",
                    mt: 3,
                    mb: 2,
                    pt: 1,
                    pb: 1,
                    "&:hover": {
                      bgcolor: "rgba(0, 36, 90, 0.8)",
                    },
                  }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link
                      component={RouterLink}
                      to="/login"
                      variant="body2"
                      color={"#00245A"}
                      sx={{
                        "&:hover": {
                          color: "rgba(0, 36, 90, 0.8)",
                        },
                      }}
                    >
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
          </Container>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
export default SignUpPage;
