import { React, useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
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
// import Copyright from "../../components/Copyright/Copyright";
import { validateEmail, validatePassword } from "./Validation";
import { loginUser } from "../../services/authService";
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

      if (data.hasOwnProperty("error")) {
        setPasswordError(data["error"]);
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
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        spacing={0}
        style={{ height: lessThanSm ? "80vh" : "100vh" }}
      >
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
                  id="loginButton"
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
                      component={RouterLink}
                      to="/register"
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
            <Copyright sx={{ mt: 5 }} />
            {/* <h1>{catData?.fact}</h1> */}
          </Container>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
