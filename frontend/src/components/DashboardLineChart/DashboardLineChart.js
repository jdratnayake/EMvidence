import React from "react";
import { Typography, useTheme, useMediaQuery } from "@mui/material";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

import "./DashboardLineChart.css";

Chart.register(CategoryScale);

function DashboardLineChart({ title, labels, data }) {
  // const chart_size = { width: "100%", minWidth: "450px", maxWidth: "800px" , marginTop: "20px", padding: "10px"};
  const theme = useTheme();
  const lessThanSm = useMediaQuery(theme.breakpoints.down("sm"));
  const lessThanMd = useMediaQuery(theme.breakpoints.down("md"));

  const plugin_data = {
    labels: labels,
    datasets: [
      {
        label: "My First Dataset",
        data: data,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div
      className="dashboard-line-chart"
      style={{ marginTop: "20px", width: "100%", height: "100%" }}
    >
      <div
        className="chart1"
        style={{ backgroundColor: "white", borderRadius: "10px" }}
      >
        <div
          className="title"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px",
          }}
        >
          <Typography variant="h5" component="div">
            {title}
          </Typography>
        </div>
        <div
          className="diagram"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px",
          }}
        >
          <Line
            data={plugin_data}
            style={{ width: "100%", height: "100%" }}
            options={options}
          />
        </div>
      </div>
    </div>
  );
}

export default DashboardLineChart;
