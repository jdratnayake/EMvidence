import { Button, Modal, Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  backgroundColor: "#FFFFFF",
  boxShadow: 24,
  p: 4,
};

const ButtonBox = styled(Box)(() => ({
  marginTop: "3%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const DeactivateButton = styled(Button)(() => ({
  margin: "10px",
}));

const DeactivateCancelButton = styled(Button)(() => ({
  margin: "10px",
}));

function ActivateModal({
  open,
  name,
  onClose,
  handleBanStatusChange,
  activateButtonName = "Activate",
}) {
  const handleCancel = () => {
    onClose();
  };

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{...style, borderRadius: "4px"}}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {name}
          </Typography>
          <ButtonBox>
            <DeactivateCancelButton
              variant="contained"
              color="grey"
              onClick={handleCancel}
            >
              Cancel
            </DeactivateCancelButton>
            <DeactivateButton
              variant="contained"
              color="success"
              onClick={handleBanStatusChange}
            >
              {activateButtonName}
            </DeactivateButton>
          </ButtonBox>
        </Box>
      </Modal>
    </>
  );
}

export default ActivateModal;
