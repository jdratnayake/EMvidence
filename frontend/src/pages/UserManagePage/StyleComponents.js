import { Box, Container, styled } from "@mui/system";

export const sxStyle = {
  "&:hover": {
    "&& fieldset": {
      border: "2px solid #00245A",
    },
  },
  "& .MuiInputLabel-outlined": {
    color: "grey", // Initial color
    "&.Mui-focused": {
      color: "#00245A", // Color when focused
    },
  },
  color: "#00245A",
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#00245A",
        borderWidth: "2px",
      },
    },
    "& .MuiInputLabel-outlined": {
      color: "#2e2e2e",
      fontWeight: "bold",
      "&.Mui-focused": {
        color: "secondary.main",
        fontWeight: "bold",
      },
    },
  },
};

export const ContainerBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "0 0 3% 0",
}));

export const HeadingBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "3%",
  marginBottom: "0",
}));

export const ContentBox = styled(Box)(() => ({
  backgroundColor: "#FFFFFF",
  borderRadius: "24px",
  width: "80vw",
  marginLeft: "0",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

export const SearchBox = styled(Box)(() => ({
  margin: "0% 0% 3% 0%",
  padding: "3% 0% 0% 0%",
}));

export const TableBox = styled(Box)(() => ({
  width: "100%",
}));
