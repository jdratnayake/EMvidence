import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import RuleIcon from '@mui/icons-material/Rule';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import logo from "../../resources/logo-blue-plain.png";
import { Link } from "react-router-dom";
import {
  FormControl,
  InputLabel,
  Select,
  Input,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const pages = ["About Us", "Contact Us"];

function NavBar(pageName) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const theme = useTheme();
  const lessThanSm = useMediaQuery(theme.breakpoints.down("sm"));
  const lessThanMd = useMediaQuery(theme.breakpoints.down("md"));
  // const borderBottom = "1px solid black";

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      elevation={1}
      sx={{
        backgroundColor: "#FFFFFF",
        color: "#000000",
        borderBottom: "1px solid var(--Border-primary, #E9E9E9)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img
            src={logo}
            alt="Logo"
            style={{ width: "30px", height: "20px", marginRight: 10, marginTop: "0px" }}
          />
          <Link to="/"
            style={{
              textDecoration: "none",
            }}>

            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#home"
              sx={{
                mr: 2, mt: "4px",
                display: { xs: "none", md: "flex" },
                fontFamily: "roboto",
                fontWeight: 700,
                letterSpacing: ".2rem",
                color: "#00245A",
                textDecoration: "none",
              }}
            >
              EMvidence
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="#000000"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" >{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "roboto",
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "#00245A",
              textDecoration: "none",
            }}
          >
            <Link to="/"
              style={{
                textDecoration: "none",
                color: "#00245A",
              }}>
              EMvidence
            </Link>
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", justifyContent: "center" },
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                variant="plain"
                sx={{
                  borderRadius: "5px",
                  my: 2,
                  color: "#000000",
                  display: "block",
                  borderBottom:
                    pageName.page == "analysis" && page == "Analysis"
                      ? "2px solid black"
                      : "none",
                }}
              >
                {page}
              </Button>

            ))}

          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              '& > Button': {
                marginRight: 2, // Adjust the value as needed
              }
            }}
          >
            <Tooltip title={lessThanMd ? "Login" : null}>
              <Button
              component={Link} to="/login"
                variant="outlined"
                style={{ color: "#00245A", }}
                sx={{
                  borderColor: "rgba(0, 36, 90, 0.4)",
                  '&:hover': {
                    borderColor: "#00245A", // Change to the desired hover color
                  },
                }}
              >

                {lessThanMd ? <LoginIcon /> : 'Login'}

              </Button>
            </Tooltip>

            <Tooltip title={lessThanMd ? "Sign Up" : null}>
              <Button
               component={Link} to="/register"
                variant="contained"
                sx={{
                  bgcolor: '#00245A', color: 'white', ml: 3,
                  '&:hover': {
                    backgroundColor: 'rgba(0, 36, 90, 0.8)', // Change to the desired hover color
                  },
                }}
              >
                {lessThanMd ? <PersonAddIcon /> : 'Sign Up'}
              </Button>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
