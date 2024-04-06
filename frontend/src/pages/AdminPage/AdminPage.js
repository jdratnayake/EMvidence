import React from "react";
import DashboardCard from "../../components/DashboardCard/DashboardCard";
import DashboardLineChart from "../../components/DashboardLineChart/DashboardLineChart";
import { CssBaseline, useTheme, useMediaQuery } from "@mui/material";
import ExtensionIcon from "@mui/icons-material/Extension";
import PersonIcon from "@mui/icons-material/Person";
import { borderRadius, Box, Container, styled } from "@mui/system";


import "./AdminPage.css";

function AdminPage() {
  const theme = useTheme();
  const lessThanSm = useMediaQuery(theme.breakpoints.down("sm"));
  const lessThanMd = useMediaQuery(theme.breakpoints.down("md"));
  const lessThanLg = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    // <span className="admin-page" style={{ marginTop: "-40px" }}>
      <div className="container" style={{ marginTop: "50px" }}>

        <Box className="summaries"

          //{lessThanSm ? 0 : {lessThanMd ? 18 : 14}}
          sx={{
            display: "flex",
            flexDirection: lessThanMd ? "column" : "row",
            justifyContent: "center",
            mt: lessThanMd ? 5 : 0,

          }}
        >
          <div className="summary1">
            <DashboardCard
              icon={<ExtensionIcon sx={{ color: "green" }} />}
              title="Active Plugins"
              count="100"
            />
          </div>
          <span style={{ marginLeft: "50px" }}>{"\u00A0"}</span>
          <div className="summary2">
            <DashboardCard
              icon={<ExtensionIcon sx={{ color: "red" }} />}
              title="Inactive Plugins"
              count="20"
            />
          </div>
          <span style={{ marginLeft: "50px" }}>{"\u00A0"}</span>
          <div className="summary3">
            <DashboardCard
              icon={<PersonIcon sx={{ color: "#00245A" }} />}
              title="Total Users"
              count="251"
            />
          </div>
        </Box>

        <Box className="summaries"

          //{lessThanSm ? 0 : {lessThanMd ? 18 : 14}}
          sx={{
            display: "flex",
            flexDirection: lessThanMd ? "column" : "row",
            justifyContent: "center",
            alignItems: "center",
            mt: lessThanMd ? 5 : 5,

          }}
        >
          
            <DashboardLineChart
              title="Plugin Growth"
              labels={[
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
              ]}
              data={[65, 59, 80, 81, 56, 55, 40]}
            />
            <span style={{ marginLeft: lessThanLg ? "10px" : "50px" }}>{"\u00A0"}</span>
            <span style={{ marginTop: lessThanMd ? 2 : 0 }}>{"\u00A0"}</span>
            <DashboardLineChart
              title="User Growth"
              labels={[
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
              ]}
              data={[65, 59, 80, 81, 56, 55, 40]}
            />
         
        </Box>
      </div>

    // </span>
  );
}

export default AdminPage;
