import React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const Notification = (props) => {
  const { notify, setNotify } = props;
  return (
    <Snackbar
      spacing={2}
      sx={{ width: "100%" }}
      open={notify.isOpen}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <AlertTitle>{notify.type}</AlertTitle>
      <Alert
        severity={notify.type ? notify.type : "success"}
        variant="filled"
        onClose={() => {}}
      >
        {notify.messages}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
