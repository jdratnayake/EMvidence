import { CssBaseline, Typography } from "@mui/material";
import { Container, width } from "@mui/system";
import React, { useState, useEffect } from "react";
import "./PluginsPage.css";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Resumable from "resumablejs";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../../components/NavBar/NavBar";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import logo from "../PluginsPage/p4.png";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function PluginsPage() {
  const containerStyle = {
    backgroundColor: "white", // Set your desired color here
    // You can also add other styles as needed
    padding: "20px",
    borderRadius: "8px",
    marginTop: "10px",
  };
  const [searchText, setSearchText] = useState("");

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const card1 = (
    <React.Fragment>
      <CardContent>
        <Grid container alignItems="center" justifyContent="center">
          <img
            src={logo}
            alt="Logo"
            style={{
              width: "70px",
              height: "70px",
              alignContent: "center",
              borderRadius: "50%",
            }}
          />
        </Grid>

        <Typography
          sx={{ fontSize: 16 }}
          color="text.primary"
          gutterBottom
          align="center"
          marginTop={2}
        >
          Apple iphone X
        </Typography>

        <Typography color="text.secondary" marginTop={2} align="center">
          1.5k
        </Typography>
      </CardContent>
      {/* <CardActions>
                <Grid container alignItems="center" justifyContent="center">
                    <Button size="medium">use</Button>
                </Grid>

            </CardActions> */}
    </React.Fragment>
  );

  const card2 = (
    <React.Fragment>
      <CardContent>
        <Grid container alignItems="center" justifyContent="center">
          <img
            src={logo}
            alt="Logo"
            style={{
              width: "70px",
              height: "70px",
              alignContent: "center",
              borderRadius: "50%",
            }}
          />
        </Grid>

        <Typography
          sx={{ fontSize: 16 }}
          color="text.primary"
          gutterBottom
          align="center"
          marginTop={2}
        >
          Apple iphone X
        </Typography>

        <Typography color="text.secondary" marginTop={2} align="center">
          1.5k
        </Typography>
        <Typography color="text.secondary" marginTop={2} align="center">
          Maintained by Sherlock Holmes
        </Typography>
        <Typography color="text.secondary" marginTop={2} align="left">
          In computing, a plug-in (or plugin, add-in, addin, add-on, or addon)
          is a software component that adds a specific feature to an existing
          computer program. When a program supports plug-ins, it enables
          customization.
        </Typography>
      </CardContent>
      <CardActions>
        <Grid container alignItems="center" justifyContent="center">
          <Button size="medium">use</Button>
        </Grid>
      </CardActions>
    </React.Fragment>
  );

  return (
    <>
      <CssBaseline />
      <NavBar />
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
        >
          <DialogContent>
            <Card variant="outlined">{card2} </Card>
          </DialogContent>
        </Dialog>
      </div>

      <Container style={containerStyle}>
        <Typography
          variant="h4"
          color="textPrimary"
          align="center"
          marginTop={3}
        >
          EM Plugins
        </Typography>

        <Grid container alignItems="center" justifyContent="center">
          <TextField
            id="search"
            label={searchText === "" ? "Search" : ""}
            InputLabelProps={{
              shrink: false,
            }}
            value={searchText}
            onChange={handleSearch}
            variant="outlined"
            style={{ width: "600px", marginTop: "40px" }}
            InputProps={{
              endAdornment: <SearchIcon />,
            }}
          />
        </Grid>
        <Grid
          container
          spacing={0}
          alignItems="center"
          justifyContent="center"
          marginTop={4}
        >
          <Grid xs={5} sm={5} md={2} marginTop={8} m={2}>
            <Box
              sx={{
                minWidth: 200,
                maxWidth: 200,
                boxShadow: 4,
                borderRadius: "6px",
                "&:hover": {
                  boxShadow: "0px 0px 10px rgba(0,36,90, 1)",
                },
              }}
            >
              <Card variant="outlined" onClick={handleClickOpen}>
                {card1}{" "}
              </Card>
            </Box>
          </Grid>
          <Grid xs={5} sm={5} md={2} marginTop={8} m={2}>
            <Box
              sx={{
                minWidth: 200,
                maxWidth: 200,
                boxShadow: 4,
                borderRadius: "6px",
                "&:hover": {
                  boxShadow: "0px 0px 10px rgba(0,36,90, 1)",
                },
              }}
            >
              <Card variant="outlined" onClick={handleClickOpen}>
                {card1}{" "}
              </Card>
            </Box>
          </Grid>
          <Grid xs={5} sm={5} md={2} marginTop={8} m={2}>
            <Box
              sx={{
                minWidth: 200,
                maxWidth: 200,
                boxShadow: 4,
                borderRadius: "6px",
                "&:hover": {
                  boxShadow: "0px 0px 10px rgba(0,36,90, 1)",
                },
              }}
            >
              <Card variant="outlined" onClick={handleClickOpen}>
                {card1}{" "}
              </Card>
            </Box>
          </Grid>
          <Grid xs={5} sm={5} md={2} marginTop={8} m={2}>
            <Box
              sx={{
                minWidth: 200,
                maxWidth: 200,
                boxShadow: 4,
                borderRadius: "6px",
                "&:hover": {
                  boxShadow: "0px 0px 10px rgba(0,36,90, 1)",
                },
              }}
            >
              <Card variant="outlined" onClick={handleClickOpen}>
                {card1}{" "}
              </Card>
            </Box>
          </Grid>
          <Grid xs={5} sm={5} md={2} marginTop={8} m={2}>
            <Box
              sx={{
                minWidth: 200,
                maxWidth: 200,
                boxShadow: 4,
                borderRadius: "6px",
                "&:hover": {
                  boxShadow: "0px 0px 10px rgba(0,36,90, 1)",
                },
              }}
            >
              <Card variant="outlined" onClick={handleClickOpen}>
                {card1}{" "}
              </Card>
            </Box>
          </Grid>
          <Grid xs={5} sm={5} md={2} marginTop={8} m={2}>
            <Box
              sx={{
                minWidth: 200,
                maxWidth: 200,
                boxShadow: 4,
                borderRadius: "6px",
                "&:hover": {
                  boxShadow: "0px 0px 10px rgba(0,36,90, 1)",
                },
              }}
            >
              <Card variant="outlined" onClick={handleClickOpen}>
                {card1}{" "}
              </Card>
            </Box>
          </Grid>
          <Grid xs={5} sm={5} md={2} marginTop={8} m={2}>
            <Box
              sx={{
                minWidth: 200,
                maxWidth: 200,
                boxShadow: 4,
                borderRadius: "6px",
                "&:hover": {
                  boxShadow: "0px 0px 10px rgba(0,36,90, 1)",
                },
              }}
            >
              <Card variant="outlined" onClick={handleClickOpen}>
                {card1}{" "}
              </Card>
            </Box>
          </Grid>
          <Grid xs={5} sm={5} md={2} marginTop={8} m={2}>
            <Box
              sx={{
                minWidth: 200,
                maxWidth: 200,
                boxShadow: 4,
                borderRadius: "6px",
                "&:hover": {
                  boxShadow: "0px 0px 10px rgba(0,36,90, 1)",
                },
              }}
            >
              <Card variant="outlined" onClick={handleClickOpen}>
                {card1}{" "}
              </Card>
            </Box>
          </Grid>
          <Grid xs={5} sm={5} md={2} marginTop={8} m={2}>
            <Box
              sx={{
                minWidth: 200,
                maxWidth: 200,
                boxShadow: 4,
                borderRadius: "6px",
                "&:hover": {
                  boxShadow: "0px 0px 10px rgba(0,36,90, 1)",
                },
              }}
            >
              <Card variant="outlined" onClick={handleClickOpen}>
                {card1}{" "}
              </Card>
            </Box>
          </Grid>
          <Grid xs={5} sm={5} md={2} marginTop={8} m={2}>
            <Box
              sx={{
                minWidth: 200,
                maxWidth: 200,
                boxShadow: 4,
                borderRadius: "6px",
                "&:hover": {
                  boxShadow: "0px 0px 10px rgba(0,36,90, 1)",
                },
              }}
            >
              <Card variant="outlined" onClick={handleClickOpen}>
                {card1}{" "}
              </Card>
            </Box>
          </Grid>
          <Grid xs={5} sm={5} md={2} marginTop={8} m={2}>
            <Box
              sx={{
                minWidth: 200,
                maxWidth: 200,
                boxShadow: 4,
                borderRadius: "6px",
                "&:hover": {
                  boxShadow: "0px 0px 10px rgba(0,36,90, 1)",
                },
              }}
            >
              <Card variant="outlined" onClick={handleClickOpen}>
                {card1}{" "}
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default PluginsPage;
