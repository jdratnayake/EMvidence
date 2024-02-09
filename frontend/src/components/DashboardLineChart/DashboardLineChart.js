import React from "react";
import { Typography } from "@mui/material";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

import "./DashboardLineChart.css";

Chart.register(CategoryScale);

function DashboardLineChart({ title, labels, data }) {
  const chart_size = { width: "450px" };

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

  return (
    <span className="dashboard-line-chart">
      <div className="chart1">
        <div className="title">
          <Typography variant="h5" component="div">
            {title}
          </Typography>
        </div>
        <div className="diagram" style={chart_size}>
          <Line data={plugin_data} />
        </div>
      </div>
    </span>
  );
}

export default DashboardLineChart;
