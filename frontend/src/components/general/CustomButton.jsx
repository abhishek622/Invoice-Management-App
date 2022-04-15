import { Button } from "@mui/material";
import React from "react";

function CustomButton(props) {
  const { text, ...others } = props;
  return (
    <Button
      variant="outlined"
      fullWidth
      size="small"
      {...others}
      sx={{
        fontWeight: "bold",
        "&:hover": {
          color: text === "delete" ? "#f5f5f5" : "#283d4a",
          backgroundColor:
            text === "cancel"
              ? "#f5f5f5"
              : text === "delete"
              ? "#e57373"
              : "#66bb6a",
          borderColor: text === "delete" ? "#e57373" : "#66bb6a",
        },
      }}
    >
      {text}
    </Button>
  );
}

export default CustomButton;
