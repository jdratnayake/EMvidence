import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import TextBox from "../../components/TextBox/TextBox";
import Copyright from "../../components/Copyright/Copyright";
import { validateEmail, validatePassword } from "./Validation";
import { loginUser } from "../../services/authService";
import { useUser } from "../../contexts/UserContext";

const defaultTheme = createTheme();

export default function SignIn() {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const { user, addUser } = useUser();
  const {
    mutate: login,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
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
        navigate("/investigator");
      } else if (userData.user_type === "developer") {
        navigate("/developer");
      } else {
        navigate("/error");
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

    if (!validateEmail(data.get("email"))) {
      setEmailError("Invalid email address");
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
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
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
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright />
          {/* <h1>{catData?.fact}</h1> */}
        </Container>
      </ThemeProvider>
    </span>
  );
}
