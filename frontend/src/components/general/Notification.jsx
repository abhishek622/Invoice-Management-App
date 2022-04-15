import { Alert, Snackbar } from "@mui/material";
import React, { useContext } from "react";
import { TableContext } from "../../helpers/context";

function Notification() {
  const [state, dispatch] = useContext(TableContext);

  const handleClose = () => {
    dispatch({ type: "SET_ALERT", payload: false });
  };

  return (
    <Snackbar
      open={state.alert}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        onClose={handleClose}
        severity="success"
        sx={{ width: "100%" }}
        variant="filled"
      >
        {state.response}
      </Alert>
    </Snackbar>
  );
}

export default Notification;
