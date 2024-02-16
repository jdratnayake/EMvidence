import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import Copyright from "../../components/Copyright/Copyright";
import RecentInvestigationCard from "../../components/RecentInvestigationCard/RecentInvestigationCard";
import DashboardLineChart from "../../components/DashboardLineChart/DashboardLineChart";
import {
  CssBaseline,
  Typography,
  Button,
  Modal,
  Box,
  Grid,
  TextField,
  InputAdornment,
} from "@mui/material";
import ExtensionIcon from "@mui/icons-material/Extension";
import PersonIcon from "@mui/icons-material/Person";

import "./InvestigationPage.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "1000px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "20px",
};

function InvestigationPage() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const button_component_properties = {
    width: "300px",
    height: "40px",
    backgroundColor: "#00245A",
    color: "white",
  };

  return (
    <span className="dashboard-admin">
      <CssBaseline />
      <NavBar page={"analysis"} />
      <div className="container">
        <div className="title">
          <Typography variant="h4" component="div">
            Investigations
          </Typography>
        </div>
        <div className="create-investigation">
          <Button
            variant="contained"
            color="primary"
            style={button_component_properties}
            onClick={handleOpen}
          >
            Create Investigation
          </Button>
        </div>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Grid container spacing={2} align="left">
              <Grid item xs={12}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Create Investigation
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  id="fullWidth"
                  onChange={() => {}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  maxRows={4}
                  label="Description"
                  id="fullWidth"
                  onChange={() => {}}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography align="right">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{
                      marginTop: "10px",
                      width: "200px",
                      backgroundColor: "#00245A",
                      color: "white",
                      marginLeft: "0px",
                      marginBottom: "20px",
                    }}
                  >
                    Upload
                  </Button>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Modal>

        <div className="summaries">
          <div className="summary-title">
            <Typography variant="h6" component="div">
              Recently Accessed:
            </Typography>
          </div>
          <div className="cards">
            <div className="summary1">
              <RecentInvestigationCard title="Investigation - A" />
            </div>
            <div className="summary2">
              <RecentInvestigationCard title="Investigation - B" />
            </div>
            <div className="summary3">
              <RecentInvestigationCard title="Investigation - C" />
            </div>
          </div>
        </div>

        <div className="table-title">
          <Typography variant="h6" component="div">
            Investigation List
          </Typography>
        </div>

        <div className="table">table</div>
      </div>
      <Copyright />
    </span>
  );
}

export default InvestigationPage;
