import React from "react";

import TextField from "@mui/material/TextField";

function TextBox({
  marginValue = "normal",
  requiredStatus = true,
  fullWidthStatus = true,
  idValue,
  labelValue,
  typeName = "text",
  nameValue,
  autoCompleteValue,
  autoFocusStatus = false,
  errorStatus = false,
  helperTextValue = "",
}) {
  return (
    <span className="text-field">
      <TextField
        margin={marginValue}
        required={requiredStatus}
        fullWidth={fullWidthStatus}
        id={idValue}
        label={labelValue}
        type={typeName}
        name={nameValue}
        autoComplete={autoCompleteValue}
        autoFocus={autoFocusStatus}
        error={errorStatus}
        helperText={helperTextValue}
        sx={{
          // "&:hover": {
          //   "&& fieldset": {
          //     border: "2px solid gray",
          //   },
          // },
          "& .MuiInputLabel-outlined": {
            color: "grey", // Initial color
            "&.Mui-focused": {
                color: "#00245A", // Color when focused
            },
        },
          color:"#00245A",
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
        }}
      />
    </span>
  );
}

export default TextBox;
