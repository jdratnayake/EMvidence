import React, { useState } from "react";
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const rows = [
    { plugin: "Firmware Version Detection", status: "Inactive", actions: "1" },
    { plugin: "Firmware Version Detection", status: "Active", actions: "2" },
    { plugin: "Firmware Version Detection", status: "Active", actions: "3" },
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
      <TableCell>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography
            variant="body2"
            sx={{ color: "#667085", cursor: "pointer" }}
            gutterBottom
          >
            Test
          </Typography>
          <span style={{ marginLeft: "10px" }}>{"\u00A0"}</span>

          {getStatusByActions(value) === "Active" ? (
            <Typography
              variant="body2"
              sx={{ color: "#F90000", cursor: "pointer" }}
              gutterBottom
            >
              Deactivate
            </Typography>
          ) : (
            <Typography
              variant="body2"
              sx={{ color: "#00245A", cursor: "pointer" }}
              gutterBottom
            >
              Activate
            </Typography>
          )}
        </Box>
      </TableCell>
    );
  }

  function getStatus(value) {
    if (value === "Active") {
      return (
        <TableCell>
          <Chip
            sx={{ background: "#ECFDF3", color: "#037847", mt: "10px" }}
            label={
              <>
                <CircleIcon sx={{ fontSize: 13, marginRight: 1 }} />
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
            sx={{ background: "#F2F4F7", color: "#364254", mt: "10px" }}
            label={
              <>
                <CircleIcon sx={{ fontSize: 13, marginRight: 1 }} />
                {value}
              </>
            }
          />
        </TableCell>
      );
    }
  }

  return (
    <>
      <ContainerBox>
        <HeadingBox>
          <Typography variant="h4" gutterBottom>
            Plugins
          </Typography>
        </HeadingBox>
        <ContentBox>
          <SearchBox>
            <SearchField
              id="outlined-basic"
              variant="outlined"
              placeholder="Search User"
            />
            <SearchButton variant="contained">
              <SearchIcon />
            </SearchButton>
          </SearchBox>
          <TableBox>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: "440" }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableHeadRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}{" "}
                          <span style={{ marginLeft: "10px" }}>{"\u00A0"}</span>
                          <ArrowDownwardIcon />
                        </TableCell>
                      ))}
                    </TableHeadRow>
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
                                <TableCellBlue key={column.id}>
                                  {value}
                                </TableCellBlue>
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