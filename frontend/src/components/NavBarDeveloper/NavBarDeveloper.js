import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useUser } from "../../contexts/UserContext";
import logo from "../../resources/logo.png";

const pages = ["Upload Plugin", "Analysis", "Upload File", "Settings"];
const pageLinks = ["/plugin-upload-list", "/report", "/file-list", "/profile"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function NavBarDeveloper({ pageName }) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { removeUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAnchorElUser(null);
    removeUser();
    navigate("/login");
  };

  return (
    <AppBar
      position="sticky"
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
            style={{ width: "50px", height: "30px" }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "roboto",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "#000000",
              textDecoration: "none",
            }}
          >
            EMvidence
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={(event) => setAnchorElNav(event.currentTarget)}
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
              onClose={() => setAnchorElNav(null)}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => setAnchorElNav(null)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#000000",
              textDecoration: "none",
            }}
          >
            Emvidence
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", justifyContent: "center" },
            }}
          >
            {pages.map((page, i) => (
              <Button
                key={page}
                onClick={() => setAnchorElNav(null)}
                variant="plain"
                sx={{
                  borderRadius: "0",
                  my: 2,
                  color: "#000000",
                  display: "block",
                  borderBottom: page === pageName ? "2px solid black" : "none",
                }}
                component={Link}
                to={pageLinks[i]}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton
                onClick={(event) => setAnchorElUser(event.currentTarget)}
                sx={{ p: 0 }}
              >
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={() => setAnchorElUser(null)}
            >
              {settings.map((setting) =>
                setting === "Logout" ? (
                  <MenuItem key={setting} onClick={handleLogout}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ) : (
                  <MenuItem key={setting} onClick={() => setAnchorElUser(null)}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                )
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBarDeveloper;
