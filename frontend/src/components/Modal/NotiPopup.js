import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

const NotiPopup = (props) => {
  const { popup, setPopup } = props;
  const history = useNavigate();
  const handleClose = () => {
    setPopup({ openPopup: false });
    history("/");
  };

  return (
    <Dialog open={popup.openPopup} maxWidth="xl">
      <DialogTitle>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Alert color={popup.title}>
            <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
              {popup.title}
            </Typography>
          </Alert>
          <Button color="error" onClick={handleClose}>
            x
          </Button>
        </div>
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ textAlign: "center" }}>{popup.children}</Box>
        {/* <Box sx={{ textAlign: "center", py: 3 }}>
          <Button href="/" color="primary" variant="contained">
            กลับหน้าหลัก
          </Button>
        </Box> */}
      </DialogContent>
    </Dialog>
  );
};

export default NotiPopup;
