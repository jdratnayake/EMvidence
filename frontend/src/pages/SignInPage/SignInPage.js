import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import {
  Avatar,
  Button,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  useTheme,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import TextBox from "../../components/TextBox/TextBox";
import Copyright from "../../components/Copyright/Copyright";
import { validateEmail, validatePassword } from "./Validation";
import { loginUser } from "../../services/authService";
import { useUser } from "../../contexts/UserContext";
import logo from "../../resources/logo8.png";

const defaultTheme = createTheme();

export default function SignInPage() {
  const theme = useTheme();
  const lessThanSm = useMediaQuery(theme.breakpoints.down("sm"));
  const lessThanMd = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { user, addUser } = useUser();

  const {
    mutate: login,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setEmailError("");
      setPasswordError("");

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
        navigate("/investigation");
      } else if (userData.user_type === "developer") {
        navigate("/plugin-upload-list");
      } else {
        navigate("/error");
      }
    },
    onError: (error) => {
      if (error.message === "Unauthorized") {
        setPasswordError("Invalid email or password");
      }
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // Reset error messages
    setEmailError("");
    setPasswordError("");

    let isValid = true;

    const emailValidationResult = validateEmail(data.get("email"));
    if (emailValidationResult !== true) {
      setEmailError(emailValidationResult);
      isValid = false;
    }

    const passwordValidationResult = validatePassword(data.get("password"));
    if (passwordValidationResult !== true) {
      setPasswordError(passwordValidationResult);
      isValid = false;
    }

    if (isValid) {
      console.log("Form data is valid");

      const userData = {
        email: data.get("email"),
        password: data.get("password"),
      };

      login(userData);
    } else {
      console.log("Form data is invalid");
    }
  };

  return (
    <span className="sign-in-pages">
      <ThemeProvider theme={defaultTheme}>
        <Grid container spacing={0} style={{ height: "100vh" }}>
          <Grid xs={12} sm={6} sx={{ backgroundColor: "#00245A" }}>
            <Container maxWidth="xs">
              <Box
                marginTop={lessThanSm ? 2 : lessThanMd ? 20 : 10}
                marginBottom={lessThanSm ? 2 : 0}
                //{lessThanSm ? 0 : {lessThanMd ? 18 : 14}}
                sx={{
                  display: "flex",
                  flexDirection: lessThanSm ? "row" : "column",
                  alignItems: "center",
                  marginLeft: lessThanSm ? 14 : 0,
                }}
              >
                <Box
                  component="img"
                  sx={{
                    height: 520,
                    width: 680,
                    maxHeight: { xs: 200, sm: 300, md: 500 },
                    maxWidth: { xs: 200, sm: 300, md: 500 },
                  }}
                  src={logo}
                />
                {/* <Typography  variant={lessThanMd ? 'h2' : 'h1'}  color="white" sx={{
                  paddingBottom: 4,
                  marginTop: lessThanSm ? 4 : 2,
                  marginLeft: lessThanSm ? '20px' : 0,
                  variant: lessThanSm ? 'h4' : 'h1',
                  }}>
                  EMvidence
                </Typography> */}
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
                  {/* <LockOutlinedIcon /> */}
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ mt: 1 }}
                >
                  <TextBox
                    idValue="email"
                    labelValue="Email Address"
                    nameValue="email"
                    autoCompleteValue="email"
                    autoFocusStatus={true}
                    errorStatus={emailError !== ""}
                    helperTextValue={emailError}
                  />

                  <TextBox
                    idValue="password"
                    labelValue="Password"
                    typeName="password"
                    nameValue="password"
                    autoCompleteValue="current-password"
                    autoFocusStatus={true}
                    errorStatus={passwordError !== ""}
                    helperTextValue={passwordError}
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        sx={{
                          "& .MuiSvgIcon-root": {
                            fill: "#00245A",
                          },
                        }}
                      />
                    }
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    sx={{
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
                    variant="contained"
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link
                        href="#"
                        variant="body2"
                        color={"#00245A"}
                        sx={{
                          "&:hover": {
                            color: "rgba(0, 36, 90, 0.8)",
                          },
                        }}
                      >
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link
                        href="#"
                        variant="body2"
                        color={"#00245A"}
                        sx={{
                          "&:hover": {
                            color: "rgba(0, 36, 90, 0.8)",
                          },
                        }}
                      >
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              <Copyright />
              {/* <h1>{catData?.fact}</h1> */}
            </Container>
          </Grid>
        </Grid>
      </ThemeProvider>
    </span>
  );
}
