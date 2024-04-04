import React, { useState } from "react";
import { borderRadius, Box, Container, styled } from "@mui/system";
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
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import CircleIcon from "@mui/icons-material/Circle";

const columns = [
  { id: "plugin", label: "Plugin Name", midWidth: 150 },
  { id: "status", label: "Status", midWidth: 150 },
  { id: "actions", label: "Actions", midWidth: 300 },
];

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
  marginBottom: "3%",
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

const SearchButton = styled(Button)(() => ({
  backgroundColor: "#00245A",
  height: "60px",
  borderRadius: "0",
}));

const SearchField = styled(TextField)(() => ({
  border: "2px solid #00245A",
  // MUI element css change
  "& label.Mui-focused": {
    color: "transparent",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "transparent",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "transparent",
    },
    "&:hover fieldset": {
      borderColor: "transparent",
    },
    "&.Mui-focused fieldset": {
      borderColor: "transparent",
    },
  },
  width: "40vw",
}));

const TableHeadRow = styled(TableRow)(() => ({
  "& th": {
    color: "rgba(96, 96, 96)",
    backgroundColor: "#FCFCFD",
  },
}));

const TableCellBlue = styled(TableCell)(() => ({
  color: "#00245A",
}));

function PluginManagePage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const rows = [
    { id: 1, plugin: "Firmware Version Detection", status: "Inactive", actions: "1" },
    { id: 2, plugin: "Firmware Version Detection", status: "Active", actions: "2" },
    { id: 3, plugin: "Firmware Version Detection", status: "Active", actions: "3" },
  ];

  function getStatusByActions(actionsValue) {
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].actions === actionsValue) {
        return rows[i].status;
      }
    }
    return null;
  }

  function getActions(value) {
    return (
      <TableCell align="center">
        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
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
            {/* <VisibilityIcon sx={{ ml: -1, mr: 1 }} /> */}
            Test
          </Button>
          <span style={{ marginLeft: "10px" }}>{"\u00A0"}</span>

          {getStatusByActions(value) === "Active" ? (
            <Button
              variant="outlined"
              color="error"
              onClick={() => { }}
            >
              {/* <DeleteIcon sx={{ ml: -1, mr: 1 }} /> */}
              Deactivate
            </Button>
          ) : (
            <Button
              variant="outlined"
              sx={{
                color: "green", cursor: "pointer", borderColor: "rgba(0, 128, 0, 0.4)", pl: 3, pr: 3,
                '&:hover': {
                  borderColor: "green",
                },
              }}
              onClick={() => { }}
            >
              {/* <DeleteIcon sx={{ ml: -1, mr: 1 }} /> */}
              Activate
            </Button>
          )}
        </Box>
      </TableCell>
    );
  }

  function getStatus(value) {
    if (value === "Active") {
      return (
        <TableCell align="">
          <Chip
            sx={{ background: "#ECFDF3", color: "#037847", mt: "10px", ml: "4px" }}
            label={
              <>
                {value}
              </>
            }
          />
        </TableCell>
      );
    } else {
      return (
        <TableCell>
          <Chip
            sx={{ background: "#FFF2F2", color: "red", mt: "10px" }}
            label={
              <>
                {value}
              </>
            }
          />
        </TableCell>
      );
    }
  }
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

  return (
    <>
      <ContainerBox>
        <HeadingBox>
          <Typography variant="h4" gutterBottom sx={{mb:-1}}>
            Plugins
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

                    <TableCell >
                      <Typography variant="h6" color="textPrimary" >
                        Plugin Name
                      </Typography>
                    </TableCell>
                    <TableCell align="">
                      <Typography variant="h6" color="textPrimary" >
                        Status
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h6" color="textPrimary" >
                        Action
                      </Typography>
                    </TableCell>

                  </TableHead>
                  <TableBody>
                    {rows
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tableIndex={-1}
                            key={row.code}
                          >
                            {columns.map((column) => {
                              const value = row[column.id];
                              console.log(column.id);
                              return column.id === "status" ? (
                                getStatus(value)
                              ) : column.id === "actions" ? (
                                getActions(value)
                              ) : (
                                <TableCell key={column.id}>
                                  {value}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </TableBox>
        </ContentBox>
      </ContainerBox>
    </>
  );
}

export default PluginManagePage;
