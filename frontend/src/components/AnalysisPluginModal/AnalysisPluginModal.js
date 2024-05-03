import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogContent,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";

function AnalysisPluginModal({
  id,
  name,
  description,
  author = "Sherlock Holmes",
  iconPath,
  open,
  onClose,
  modifyChecked,
}) {
  const handleClicked = () => {
    modifyChecked(id);
    onClose();
  };

  return (
    <>
      <Dialog
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        open={open}
        onClose={onClose}
        fullWidth
      >
        <DialogContent>
          <Card variant="outlined">
            <CardContent>
              <Grid container alignItems="center" justifyContent="center">
                <img
                  src={iconPath}
                  alt="plugin"
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
              <Typography color="text.secondary" marginTop={2} align="center">
                Maintained by {author}
              </Typography>
              <Typography color="text.secondary" marginTop={2} align="center">
                {description}
              </Typography>
            </CardContent>
            {/* <CardActions>
              <Grid container alignItems="center" justifyContent="center">
                <Button
                  size="medium"
                  variant="outlined"
                  onClick={handleClicked}
                >
                  USE
                </Button>
              </Grid>
            </CardActions> */}
          </Card>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AnalysisPluginModal;
