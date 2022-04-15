import { TextField } from "@mui/material";
import React from "react";

function CustomTextField(props) {
  const { name, label, value, onChange, ...rest } = props;
  return (
    <TextField
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      variant="filled"
      size="small"
      {...rest}
      InputProps={{ disableUnderline: true }}
    />
  );
}

export default CustomTextField;
