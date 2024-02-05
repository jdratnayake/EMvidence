import React from "react";
import NavBar from "../../components/NavBar";
import Copyright from "../../components/Copyright/Copyright";
import DashboardCard from "../../components/DashboardCard/DashboardCard";
import DashboardLineChart from "../../components/DashboardLineChart/DashboardLineChart";
import { CssBaseline } from "@mui/material";
import ExtensionIcon from "@mui/icons-material/Extension";
import PersonIcon from "@mui/icons-material/Person";

import "./DashboardAdmin.css";

function DashboardAdmin() {
  return (
    <span className="dashboard-admin">
      <CssBaseline />
      <NavBar page={"analysis"} />
      <div className="container">
        <div className="summaries">
          <div className="summary1">
            <DashboardCard
              icon={<ExtensionIcon />}
              title="Active Plugins"
              count="100"
            />
          </div>
          <div className="summary2">
            <DashboardCard
              icon={<ExtensionIcon />}
              title="Inactive Plugins"
              count="20"
            />
          </div>
          <div className="summary3">
            <DashboardCard
              icon={<PersonIcon />}
              title="Total Users"
              count="251"
            />
          </div>
        </div>

        <div className="charts">
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
        </div>
      </div>
      <Copyright />
    </span>
  );
}

export default DashboardAdmin;
