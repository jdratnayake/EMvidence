import { AppBar, CssBaseline, Toolbar, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState, useEffect } from "react";
import "./EmFilesPage.css";
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from "../../components/NavBar";
import { Grid, Card, CardContent } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import Divider from '@mui/material/Divider';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const baseURL1 = 'http://127.0.0.1:8000/api/em_data_records';
const baseURL2 = 'http://127.0.0.1:8000/api/delete_file';
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
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
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

function createData(name, calories, fat) {
  return { name, calories, fat };
}


function EmFilesPage() {
  const [data, setData] = useState([]);


  useEffect(() => {
    fetch(baseURL1)
      .then((res) => res.json())
      .then((res) => setData(res))
      // .then(res => console.log(res.data.emDataRecords))
      .catch(res => console.log(res));
  }, []);



  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const navigateToUploadForm = () => {
    navigate('/file_upload');
  };
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function deleteRecord(id) {
    console.log(id);
    axios.post(baseURL2, {
      file_id: id,
    })
      .then((response) => {
        console.log(response.status);
        if (response.status == 200) {
          alert('File is successfully deleted.');
          window.location.reload();
        } else {
          alert('Error occurs when file deleting.');
          window.location.reload();
        }

      });
  };
  const customStyles = {
    backgroundColor: '#525252',
    color: 'white',
  };
  function bytesToSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

    if (bytes === 0) return '0 Byte';

    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));

    return Math.round(100 * (bytes / Math.pow(1024, i))) / 100 + ' ' + sizes[i];
  }

  const files = [
    { id: 1, name: 'File 1', url: 'https://example.com/file1.pdf' },
    { id: 2, name: 'File 2', url: 'https://example.com/file2.docx' },
    // Add more files as needed
  ];
  return (
    <>
      <CssBaseline />
      <NavBar />
      <main>

        <div className="maindiv" style={{ marginTop: '20px' }}>
          <Container  >
            <Typography variant="h2" color="textPrimary" align="center" gutterBottom>
              File Manage
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button variant="contained" onClick={navigateToUploadForm} style={customStyles}>
                upload
              </Button>
            </Stack>
            {/* <Grid container spacing={2} style={{ marginTop: '20px' }}>
              {data.map((file) => (
                <Grid item key={file.file_id} xs={10} sm={5} md={5} lg={5}>
                  <Card>
                    <CardContent>
                      <InsertDriveFileIcon fontSize="large" color="primary"/>
                      <Typography variant="h7" component="div">
                        {file.file_name}
                      </Typography>

                      
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid> */}
            <TableContainer component={Paper} style={{ marginTop: '10px' }}>
              <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row" >

                      <Typography variant="h6" color="textPrimary" >
                        File Name
                      </Typography>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Typography variant="h6" color="textPrimary" >
                        Size
                      </Typography>

                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Typography variant="h6" color="textPrimary" >
                        Created Date
                      </Typography>

                    </TableCell>
                    <TableCell>
                      <Typography variant="h6" color="textPrimary" >
                        Action
                      </Typography>

                    </TableCell>
                    <TableCell>
                
                    </TableCell>
                  </TableRow>
                  {(rowsPerPage > 0
                    ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : data
                  ).map((data) => (
                    <TableRow key={data.file_id} hover={true}>

                      <TableCell component="th" scope="row">
                        <Stack
                          direction="row"
                          spacing={2}
                        >

                          <InsertDriveFileIcon fontSize="medium" color="primary" />
                          <Typography variant="h7" >
                            {data.file_name}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell >
                        {bytesToSize(data.file_size)}
                      </TableCell>
                      <TableCell >
                        {data.created_time}
                      </TableCell>
                      <TableCell>
                        <Button variant="outlined" color="error" onClick={() => {
                          const confirmBox = window.confirm(
                            "Do you really want to delete this file?"
                          )
                          if (confirmBox === true) {
                            deleteRecord(data.file_id)
                          }

                        }}>
                          Delete
                        </Button>
                      </TableCell>
                      <TableCell>
                        <IconButton aria-label="MoreVertIcon"  >
                          <MoreVertIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[10]}
                      colSpan={3}
                      count={data.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                        inputProps: {
                          'aria-label': 'rows per page',
                        },
                        native: true,
                      }}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActions}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </Container>
        </div>
      </main>
    </>

  );
}

export default EmFilesPage;
