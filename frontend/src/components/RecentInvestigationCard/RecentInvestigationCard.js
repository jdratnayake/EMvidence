import React, { cloneElement } from "react";
import { Typography, CardContent, Card, Button } from "@mui/material";
import "./RecentInvestigationCard.css";

function RecentInvestigationCard({ title }) {
  const gray_for_number = "#D4D4D4";
  const summary_icon_size = "40px";
  const button_component_properties = {
    width: "250px",
    height: "100px",
    borderRadius: "16px",
  };

  return (
    <span className="dashboard-card">
      <Button sx={button_component_properties} variant="outlined">
        {title}
      </Button>
    </span>
  );
}

export default RecentInvestigationCard;
