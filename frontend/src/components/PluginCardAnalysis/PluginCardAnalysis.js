import { Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";
import plugin from "./../../resources/plugins.png";
import { Box } from "@mui/system";

function PluginCardAnalysis() {
  return (
    <>
      <Box
        sx={{
          minWidth: 200,
          maxWidth: 200,
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          borderRadius: "6px",
          "&:hover": {
            boxShadow: "0px 0px 10px rgba(0,36,90, 1)",
          },
        }}
      >
        <Card>
          <CardContent>
            <Grid container alignItems="center" justifyContent="center">
              <img
                src={plugin}
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
              Apple iphone X
            </Typography>

            <Typography color="text.secondary" marginTop={2} align="center">
              1.5k
            </Typography>
          </CardContent>{" "}
        </Card>
      </Box>
    </>
  );
}

export default PluginCardAnalysis;
