import React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";

const ErrorMessage = ({ variant = "info", children }) => {
  const [open, setOpen] = useState(true);
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Collapse in={open}>
        <Alert
          severity={variant}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {children}
        </Alert>
      </Collapse>
    </Stack>
  );
};

export default ErrorMessage;
