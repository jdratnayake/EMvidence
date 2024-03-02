import { Button, IconButton, TextField, Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import React from "react";
import image from "./../../resources/profile.jpg";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

const ContainerBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "0 0 3% 0",
}));

const HeadingBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "3%",
  marginBottom: "3%",
}));

const ContentBox = styled(Box)(() => ({
  backgroundColor: "#FFFFFF",
  borderRadius: "24px",
  width: "80vw",
  marginLeft: "0",
  display: "flex",
  flexDirection: "row",
  justifyContent: "left",
  alignItems: "flex-start",
  height: "90vh",
}));

const LeftBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "left",
  alignItems: "flex-start",
  margin: "2% 5% 2% 2%",
}));

const RightBox = styled(Box)(() => ({
  width: "60%",
}));

const FieldBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  marginTop: "7%",
}));

const TextBox = styled(Box)(() => ({
  margin: "0% 7% 0 7%",
}));

const DividerLine = styled(Box)(() => ({
  position: "relative",
  height: "77.5vh",
  borderLeft: "2px solid #D4D4D4",
  marginTop: "5%",
  marginBottom: "5%",
}));

const ImageBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  position: "relative",
  display: "inline-block",
  width: "fit-content",
  marginTop: "10%",
}));

const UploadButton = styled(IconButton)(() => ({
  background: "grey",
  height: "40px",
  width: "40px",
  position: "absolute",
  bottom: "3%",
  left: "50%",
  transform: "translateX(-50%)",
}));

const InputField = styled(TextField)(() => ({
  margin: "3% 3% 3% 3%",
}));

const ButtonBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
}));

const SaveButton = styled(Button)(() => ({
  backgroundColor: "#00245A",
  color: "#ffffff",
  "&:hover": {
    backgroundColor: "rgba(82, 82, 82, 0.8)", // Adjust the opacity as needed
  },
  margin: "2%",
}));

const ResetButton = styled(Button)(() => ({
  color: "#00245A",
  margin: "1%",
}));

function EditProfilePage() {
  return (
    <>
      <ContainerBox>
        <HeadingBox>
          <Typography variant="h4" gutterBottom>
            Profile page
          </Typography>
        </HeadingBox>
        <ContentBox>
          <LeftBox>
            <TextBox>
              <Typography variant="h6" gutterBottom>
                Basic Information
              </Typography>
            </TextBox>
            <ImageBox>
              <img
                src={image}
                alt="profile pic"
                width="200vw"
                height="200vh"
                style={{ borderRadius: "50%" }}
              />
              <UploadButton aria-label="upload">
                <CameraAltIcon />
              </UploadButton>
            </ImageBox>
          </LeftBox>
          <DividerLine />
          <RightBox>
            <FieldBox>
              <InputField
                required
                id="outlined-required"
                label="First Name"
                defaultValue="Dinil"
                fullWidth
              />

              <InputField
                required
                id="outlined-required"
                label="Last Name"
                defaultValue="Ratnayake"
                fullWidth
              />

              <InputField
                required
                id="outlined-required"
                label="Password"
                type="password"
                defaultValue="Password123"
                fullWidth
              />

              <InputField
                required
                id="outlined-required"
                label="Phone Number"
                defaultValue="+94 70 414 5651"
                fullWidth
              />
            </FieldBox>
            <ButtonBox>
              <ResetButton variant="text" size="medium">
                Reset
              </ResetButton>
              <SaveButton variant="contained" size="medium">
                Save
              </SaveButton>
            </ButtonBox>
          </RightBox>
        </ContentBox>
      </ContainerBox>
    </>
  );
}

export default EditProfilePage;
