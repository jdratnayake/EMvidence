import React, { useState } from "react";
import NavBarAdmin from "../../components/NavBarAdmin/NavBarAdmin";
import { Box, Container, styled } from "@mui/system";
import {
  Button,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { useTheme, } from "@mui/material/styles";
import TableFooter from "@mui/material/TableFooter";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import CircleIcon from "@mui/icons-material/Circle";
import { useMediaQuery } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Stack from "@mui/material/Stack";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import DeactivateModal from "../../components/DeactivateModal/DeactivateModal";
import ActivateModal from "../../components/ActivateModal/ActivateModal";

const sxStyle = {
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
  marginBottom: "0",
}));

const ContentBox = styled(Box)(() => ({
  backgroundColor: "#FFFFFF",
  borderRadius: "24px",
  width: "80vw",
  marginLeft: "0",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

const SearchBox = styled(Box)(() => ({
  margin: "0% 0% 3% 0%",
  padding: "3% 0% 0% 0%",
}));

const TableBox = styled(Box)(() => ({
  width: "100%",
}));


function UserManagePage() {
 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isActivateModalOpen, setIsActivateModalOpen] = useState(false);
  const [deactivateUserId, setDeactivateUserId] = useState(null);
  const [activateUserId, setActivateUserId] = useState(null);
  const [searchText, setSearchText] = useState("");

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };
  const handleClose = () => setIsModalOpen(false);
  const handleActivateClose = () => setIsActivateModalOpen(false);


  const handleClicked = (userId) => {
    setDeactivateUserId(userId);
    setIsModalOpen(true);
    console.log(userId);
  };

  const handleActivateClicked = (userId) => {
    setActivateUserId(userId);
    setIsActivateModalOpen(true);

  };


  const rows = [
    { id: 1, name: "User 1", status: "Inactive", actions: "1" },
    { id: 2, name: "User 2", status: "Active", actions: "2" },
    { id: 3, name: "User 3", status: "Active", actions: "3" },
  ];

  function getStatusByActions(actionsValue) {
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].actions === actionsValue) {
        return rows[i].status;
      }
    }
    return null;
  }


  function TablePaginationActions(props) {
    const theme = useTheme();

    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }

  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };

  return (
    <>
      <DeactivateModal open={isModalOpen} userId={deactivateUserId} onClose={handleClose} />
      <ActivateModal open={isActivateModalOpen} userId={activateUserId} onClose={handleActivateClose} />
      <ContainerBox>
        <HeadingBox>
          <Typography variant="h4" gutterBottom>
            Users
          </Typography>
        </HeadingBox>
        <Grid container alignItems="center" justifyContent="center" sx={{ mb: 4 }}>
          <TextField
            id="search"
            label={searchText === "" ? "Search" : ""}
            sx={{ ...sxStyle }}
            InputLabelProps={{
              shrink: false,
            }}
            value={searchText}
            onChange={handleSearch}
            variant="outlined"
            style={{ width: "500px", marginTop: "40px", backgroundColor: "white", borderRadius: 4 }}
            InputProps={{
              endAdornment: <SearchIcon sx={{ fontSize: 30 }} />,
            }}
          />
        </Grid>
        <ContentBox>
          <TableBox>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: "440" }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>

                      <TableCell >
                        <Typography variant="h6" color="textPrimary" >
                          Name
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="h6" color="textPrimary" >
                          Status
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="h6" color="textPrimary" >
                          Action
                        </Typography>
                      </TableCell>


                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow hover={true}>
                      <TableCell >
                        User 1
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          sx={{ background: "#ECFDF3", color: "#037847", mt: "10px" }}
                          label={"Active"}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                          <Button
                            variant="outlined"
                            sx={{
                              color: "#00245A", cursor: "pointer", borderColor: "rgba(0, 36, 90, 0.4)",
                              '&:hover': {
                                borderColor: "#00245A",
                              },
                            }}
                            onClick={() => { }}
                          >
                            <ModeEditIcon sx={{ ml: -1, mr: 1 }} />
                            Edit
                          </Button>
                          <span style={{ marginLeft: "10px" }}>{"\u00A0"}</span>
                          <Button
                            variant="outlined"
                            sx={{
                              color: "#00245A", cursor: "pointer", borderColor: "rgba(0, 36, 90, 0.4)",
                              '&:hover': {
                                borderColor: "#00245A", // Change to the desired hover color
                              },
                            }}
                            onClick={() => { }}
                          >
                            <VisibilityIcon sx={{ ml: -1, mr: 1 }} />
                            View
                          </Button>
                          <span style={{ marginLeft: "10px" }}>{"\u00A0"}</span>

                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => { handleClicked(1) }}
                          >
                            {/* <DeleteIcon sx={{ ml: -1, mr: 1 }} /> */}
                            Deactivate
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                    <TableRow hover={true}>
                      <TableCell >
                        User 2
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          sx={{ background: "#ECFDF3", color: "#037847", mt: "10px" }}
                          label={"Active"}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                          <Button
                            variant="outlined"
                            sx={{
                              color: "#00245A", cursor: "pointer", borderColor: "rgba(0, 36, 90, 0.4)",
                              '&:hover': {
                                borderColor: "#00245A",
                              },
                            }}
                            onClick={() => { }}
                          >
                            <ModeEditIcon sx={{ ml: -1, mr: 1 }} />
                            Edit
                          </Button>
                          <span style={{ marginLeft: "10px" }}>{"\u00A0"}</span>
                          <Button
                            variant="outlined"
                            sx={{
                              color: "#00245A", cursor: "pointer", borderColor: "rgba(0, 36, 90, 0.4)",
                              '&:hover': {
                                borderColor: "#00245A", // Change to the desired hover color
                              },
                            }}
                            onClick={() => { }}
                          >
                            <VisibilityIcon sx={{ ml: -1, mr: 1 }} />
                            View
                          </Button>
                          <span style={{ marginLeft: "10px" }}>{"\u00A0"}</span>

                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => { handleClicked(2) }}
                          >
                            {/* <DeleteIcon sx={{ ml: -1, mr: 1 }} /> */}
                            Deactivate
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                    <TableRow hover={true}>
                      <TableCell >
                        User 3
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          sx={{ background: "#FFF2F2", color: "red", mt: "10px" }}
                          label={"Inactive"}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                          <Button
                            variant="outlined"
                            sx={{
                              color: "#00245A", cursor: "pointer", borderColor: "rgba(0, 36, 90, 0.4)",
                              '&:hover': {
                                borderColor: "#00245A",
                              },
                            }}
                            onClick={() => { }}
                          >
                            <ModeEditIcon sx={{ ml: -1, mr: 1 }} />
                            Edit
                          </Button>
                          <span style={{ marginLeft: "10px" }}>{"\u00A0"}</span>
                          <Button
                            variant="outlined"
                            sx={{
                              color: "#00245A", cursor: "pointer", borderColor: "rgba(0, 36, 90, 0.4)",
                              '&:hover': {
                                borderColor: "#00245A", // Change to the desired hover color
                              },
                            }}
                            onClick={() => { }}
                          >
                            <VisibilityIcon sx={{ ml: -1, mr: 1 }} />
                            View
                          </Button>
                          <span style={{ marginLeft: "10px" }}>{"\u00A0"}</span>

                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => { handleClicked(3) }}
                          >
                            {/* <DeleteIcon sx={{ ml: -1, mr: 1 }} /> */}
                            Deactivate
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                    <TableRow hover={true}>
                      <TableCell >
                        User 4
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          sx={{ background: "#FFF2F2", color: "red", mt: "10px" }}
                          label={"Inactive"}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                          <Button
                            variant="outlined"
                            sx={{
                              color: "#00245A", cursor: "pointer", borderColor: "rgba(0, 36, 90, 0.4)",
                              '&:hover': {
                                borderColor: "#00245A",
                              },
                            }}
                            onClick={() => { }}
                          >
                            <ModeEditIcon sx={{ ml: -1, mr: 1 }} />
                            Edit
                          </Button>
                          <span style={{ marginLeft: "10px" }}>{"\u00A0"}</span>
                          <Button
                            variant="outlined"
                            sx={{
                              color: "#00245A", cursor: "pointer", borderColor: "rgba(0, 36, 90, 0.4)",
                              '&:hover': {
                                borderColor: "#00245A", // Change to the desired hover color
                              },
                            }}
                            onClick={() => { }}
                          >
                            <VisibilityIcon sx={{ ml: -1, mr: 1 }} />
                            View
                          </Button>
                          <span style={{ marginLeft: "10px" }}>{"\u00A0"}</span>

                          <Button
                            variant="outlined"
                            sx={{
                              color: "green", cursor: "pointer", borderColor: "rgba(0, 128, 0, 0.4)", pl: 3, pr: 3,
                              '&:hover': {
                                borderColor: "green",
                              },
                            }}
                            onClick={() => handleActivateClicked(4)}
                          >
                            {/* <DeleteIcon sx={{ ml: -1, mr: 1 }} /> */}
                            Activate
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </TableBox>
        </ContentBox>
      </ContainerBox>
    </>
  );
}

export default UserManagePage;
