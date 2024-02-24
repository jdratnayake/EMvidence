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
  border: "2px solid #000",
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

function ActivateModal({ open, userId, onClose }) {
  const users = [
    { name: "User 1", status: "Inactive", user_id: "1" },
    { name: "User 2", status: "Active", user_id: "2" },
    { name: "User 3", status: "Active", user_id: "3" },
  ];

  function getUserName(userId) {
    for (let i = 0; i < users.length; i++) {
      if (users[i].user_id == userId) {
        return users[i].name;
      }
    }
    return null;
  }

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
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to activate {getUserName(userId)} ?
          </Typography>
          <ButtonBox>
            <DeactivateCancelButton
              variant="contained"
              color="grey"
              onClick={handleCancel}
            >
              Cancel
            </DeactivateCancelButton>
            <DeactivateButton variant="contained" color="success">
              Activate
            </DeactivateButton>
          </ButtonBox>
        </Box>
      </Modal>
    </>
  );
}

export default ActivateModal;
