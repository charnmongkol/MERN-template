import Button from "@mui/material/Button";
import { makeStyles } from "@mui/material";
import React from "react";

const ButtonGenerator = (props) => {
  const { text, size, color, variant, onClick, ...other } = props;
  return (
    <Button
      variant={variant || "contained"}
      size={size || "medium"}
      color={color || "primary"}
      onClick={onClick}
      {...other}
    >
      {text}
    </Button>
  );
};

export default ButtonGenerator;
