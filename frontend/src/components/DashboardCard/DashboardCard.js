import React, { cloneElement } from "react";
import { Typography, CardContent, Card } from "@mui/material";
import "./DashboardCard.css";

function DashboardCard({ icon, title, count }) {
  const gray_for_number = "#D4D4D4";
  const summary_icon_size = "40px";
  const card_component_properties = {
    width: "250px",
    height: "200px",
    borderRadius: "16px",
  };

  return (
    <span className="dashboard-card">
      <Card sx={card_component_properties}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <div className="card-content-container">
            <div className="icon">
              {cloneElement(icon, { style: { fontSize: summary_icon_size } })}
            </div>
            <div className="title">
              <Typography variant="h5" component="div">
                {title}
              </Typography>
            </div>
            <div className="count">
              <Typography
                variant="h6"
                component="div"
                style={{ color: gray_for_number }}
              >
                {count}
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>
    </span>
  );
}

export default DashboardCard;
