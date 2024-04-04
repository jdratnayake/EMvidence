import React, { cloneElement } from "react";
import { Typography, CardContent, Card } from "@mui/material";
import "./DashboardCard.css";
import { borderRadius, Box, Container, minWidth, styled } from "@mui/system";


function DashboardCard({ icon, title, count }) {
  const gray_for_number = "black";
  const summary_icon_size = "40px";
  const card_component_properties = {
    width: "100%",
    height: "150px",
    borderRadius: "10px",
    minWidth:"250px"
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
          <div className="card-content-container" style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
            <div className="icon_and_title" style={{ display: "flex", justifyContent: "center" }}>
              <div className="icon">
                {cloneElement(icon, { style: { fontSize: summary_icon_size } })}
              </div>
              <div className="title" style={{ marginTop: "5px", marginLeft: "6px" }}>
                <Typography variant="h5" component="div">
                  {title}
                </Typography>
              </div>
            </div>

            <div className="count"  style={{ display: "flex", justifyContent: "center", paddingTop: "8px"}} >
              <Typography
                variant="h4"
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
