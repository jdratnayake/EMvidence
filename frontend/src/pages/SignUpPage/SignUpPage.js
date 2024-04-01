import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import { useState, useEffect } from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import logo from "../../resources/logo8.png";

const baseURL = 'http://127.0.0.1:8000/api/register';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="">
        EMvidence
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

function SignUpPage() {

  const navigate = useNavigate();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();
  const lessThanSm = useMediaQuery(theme.breakpoints.down('sm'));
  const lessThanMd = useMediaQuery(theme.breakpoints.down('md'));


  const handleFirstname = (event) => {
    setFirstname(event.target.value);
  };
  const handleLastname = (event) => {
    setLastname(event.target.value);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };
  const handleRole = (event) => {
    setRole(event.target.value);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();

  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password != confirmPassword) {
      alert("Password mismatched");
    } else {
      console.log(firstname, lastname, email, password, confirmPassword, role);
      axios.post(baseURL, {
        first_name: firstname,
        last_name: lastname,
        role: role,
        email: email,
        password: password
      })
        .then((response) => {
          if (response.data.status == 200) {
            navigate('/login');
          } else if (response.data.status == 380) {
            alert('Email is already in use')
          } else {
            alert('Registration is faild.')
          }


        })
        .catch((error) => {
          // Handle errors related to the HTTP request
          console.error("Error making the request:", error);
          alert('Failed to connect to the server. Please try again later.');
        });;
    }

  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container spacing={0} style={{ height: '100vh' }}>
        <Grid xs={12} sm={6} sx={{ backgroundColor: '#00245A' }}>
        <Container maxWidth="xs">
              <CssBaseline />
              <Box marginTop={lessThanSm ? 2 : lessThanMd ? 20 : 10} marginBottom={lessThanSm ? 2 :0}
              //{lessThanSm ? 0 : {lessThanMd ? 18 : 14}}
                sx={{
                  display: "flex",
                  flexDirection: lessThanSm ? 'row' : 'column',
                  alignItems: "center",
                  marginLeft: lessThanSm ? 14 : 0,
                }}
              >
                <Box
                  component="img"
                  sx={{
                    height: 520,
                    width: 680,
                    maxHeight: { xs: 200,sm: 300, md: 500 },
                    maxWidth: { xs: 200,sm: 300 , md: 500 },
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
        <Grid xs={12} sm={6} sx={{ backgroundColor: 'white' }}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: lessThanSm ? 2 : 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: '#00245A' }}>
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
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      onChange={handleFirstname}
                      sx={{
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
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                      sx={{
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
                      }}
                      onChange={handleLastname}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      
                      sx={{
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
                      }}
                      onChange={handleEmail}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth required
                      sx={{
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
                        "& .MuiOutlinedInput-root": {

                          "&.Mui-focused": {
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#00245A",
                              borderWidth: "2px",
                            },
                          },
                          "& .MuiInputLabel-outlined": {
                            color: "#00245A",
                            fontWeight: "bold",
                            "&.Mui-focused": {
                              color: "grey",
                              fontWeight: "bold",
                            },
                          },
                        },

                      }}>
                      <InputLabel id="demo-simple-select-label" >Your Role</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Your Role"
                        value={role}
                        onChange={handleRole}

                      >
                        <MenuItem value={'developer'}>Developer</MenuItem>
                        <MenuItem value={'invesigator'}>Invesigator</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined"
                      sx={{
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
                        "& .MuiOutlinedInput-root": {

                          "&.Mui-focused": {
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#00245A",
                              borderWidth: "2px",
                            },
                          },
                          "& .MuiInputLabel-outlined": {
                            color: "#00245A",
                            fontWeight: "bold",
                            "&.Mui-focused": {
                              color: "grey",
                              fontWeight: "bold",
                            },
                          },
                        },

                      }}>
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
                  <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined" sx={{
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
                      "& .MuiOutlinedInput-root": {

                        "&.Mui-focused": {
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#00245A",
                            borderWidth: "2px",
                          },
                        },
                        "& .MuiInputLabel-outlined": {
                          color: "#00245A",
                          fontWeight: "bold",
                          "&.Mui-focused": {
                            color: "grey",
                            fontWeight: "bold",
                          },
                        },
                      },

                    }}>
                      <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                      <OutlinedInput
                        id="confirmPassword"
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
                        label="Confirm Password"
                        onChange={handleConfirmPassword}
                        InputLabelProps={{
                          style: { color: 'grey' },
                        }}
                        
                      />
                    </FormControl>
                  </Grid>

                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3, mb: 2, bgcolor: '#00245A', color: 'white', mt: 3, mb: 2, pt: 1, pb: 1,
                    '&:hover': {
                      bgcolor: 'rgba(0, 36, 90, 0.8)',
                    },
                  }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="#" variant="body2" color={'#00245A'} sx={{
                      '&:hover': {
                        color: 'rgba(0, 36, 90, 0.8)',
                      },
                    }}>
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