import { React, useState } from "react";
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
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TextBox from "../../components/TextBox/TextBox";
import Copyright from "../../components/Copyright/Copyright";
import { validateEmail, validatePassword } from "./Validation";
import TextField from '@mui/material/TextField';
import axios from "axios";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import { useUser } from "../../contexts/UserContext";
import { useNavigate } from 'react-router-dom';

const baseURL = 'http://127.0.0.1:8000/api/login';

const defaultTheme = createTheme();

export default function SignIn() {

  const navigate = useNavigate();
  const { user, loginUser } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();

  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (email != "" && password != "") {
      
      axios.post(baseURL, {
        email: email,
        password: password
      })
        .then((response) => {
          if (response.data.status == 200){
            loginUser({ 
              first_name : response.data.user.first_name, 
              last_name : response.data.user.last_name, 
              role : response.data.user.role, 
              user_id : response.data.user.user_id,
              token : response.data.token,
              email : response.data.user.email, 

            });
           
            if (response.data.user.role === "admin"){
              navigate('/home_admin');
            } else if (response.data.user.role === "developer"){
              navigate('/home_dev');
              
            }else if (response.data.user.role === "invesigator"){
              navigate('/home_investigator');
              
            }
              
          }else if (response.data.status == 401){
            alert('Email or Password is invalid')
          } else {
            alert('Internel server error')
          }
          
        })
        .catch((error) => {
          // Handle errors related to the HTTP request
          console.error("Error making the request:", error);
          alert('Failed to connect to the server. Please try again later.');
        });
    } else {
      alert("Email or Password is empty.")
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
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleEmail}
                />
              </Grid>
              <br />
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined" required>
                  <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                  <OutlinedInput
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                    onChange={handlePassword}
                  />
                </FormControl>
              </Grid>
              <Grid container justifyContent="flex-end">
                <Grid>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
                </Grid>
                
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>

            </Box>
          </Box>
          <Copyright />
        </Container>
      </ThemeProvider>
    </span>
  );
}
