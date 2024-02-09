import React, { useState } from "react";
import NavBarAdmin from "../../components/NavBarAdmin";
import { Box, Container, styled } from "@mui/system";
import {
  Button,
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

const columns = [
  { id: "name", label: "Name", midWidth: 100 },
  { id: "status", label: "Status", midWidth: 150 },
  { id: "actions", label: "Actions", midWidth: 300 },
];

const ContainerBox = styled(Box)(() => ({
  backgroundColor: "#EAECF0",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignContent: "center",
  alignItems: "center",
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
  marginLeft: "2vw",
}));

const SearchBox = styled(Box)(() => ({
  margin: "3% 3% 3% 3%",
  padding: "5% 2% 3% 2%",
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

// const SearchField = styled(TextField)(() => ({
//   color: 'var(--text-color, #00245A)',
//   border: '2px solid #00245A', // Set border color and thickness
//   borderRadius: '4px', // Add optional rounded corners
//   '& .MuiOutlinedInput-root': { // Target outlined variant properties
//     '& fieldset': {
//       borderColor: '#00245A', // Ensure consistency across variants
//     },
//   },
// }));

function UserManagePage() {
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
    { name: "Doe, John", status: "Active", userId: "1" },
    { name: "Doe, John", status: "Active", userId: "2" },
    { name: "Doe, John", status: "Active", userId: "3" },
  ];

  return (
    <>
      <ContainerBox>
        <NavBarAdmin page={"Users"} />
        <Container maxWidth="lg">
          <Box>
            <HeadingBox>
              <Typography variant="h4" gutterBottom>
                Users
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
              <Box>
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
                              <span style={{ marginLeft: "10px" }}>
                                {"\u00A0"}
                              </span>
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
                                  return (
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
              </Box>
            </ContentBox>
          </Box>
        </Container>
      </ContainerBox>
    </>
  );
}

export default UserManagePage;
