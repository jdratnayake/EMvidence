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
      />
    </span>
  );
}

export default TextBox;
