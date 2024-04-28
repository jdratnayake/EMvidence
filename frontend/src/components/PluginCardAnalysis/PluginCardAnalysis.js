import { Card, CardContent, Checkbox, Grid, Typography } from "@mui/material";
import React from "react";
import { Box } from "@mui/system";

function PluginCardAnalysis({
  id,
  name,
  description,
  isChecked,
  modifyChecked,
  handleClicked,
  firstName,
  lastName,
  imageUrl,
}) {
  const handleChange = () => {
    modifyChecked(id);
  };

  const handleClick = () => {
    handleClicked(id, name, description, firstName, lastName, imageUrl);
  };

  return (
    <>
      <Box
        sx={{
          minWidth: 200,
          maxWidth: 200,
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          borderRadius: "6px",
          "&:hover": {
            boxShadow: "0px 0px 10px rgba(0,36,90, 1)",
          },
        }}
      >
        <Checkbox
          checked={isChecked}
          onChange={handleChange}
          inputProps={{ "aria-label": "controlled" }}
          sx={{
            marginLeft: "80%",
            marginBottom: "-5%",
            "& .MuiSvgIcon-root": {
              fill: "#00245A",
            },
          }}
        />
        <Card sx={{ height: 200 }} onClick={handleClick}>
          <CardContent>
            <Grid container alignItems="center" justifyContent="center">
              <img
                src={imageUrl}
                alt="Logo"
                style={{
                  width: "70px",
                  height: "70px",
                  alignContent: "center",
                  borderRadius: "50%",
                }}
              />
            </Grid>

            <Typography
              sx={{ fontSize: 16 }}
              color="text.primary"
              gutterBottom
              align="center"
              marginTop={2}
            >
              {name}
            </Typography>

            {/* <Typography color="text.secondary" marginTop={2} align="center">
              1.5k
            </Typography> */}
          </CardContent>{" "}
        </Card>
      </Box>
    </>
  );
}

export default PluginCardAnalysis;
