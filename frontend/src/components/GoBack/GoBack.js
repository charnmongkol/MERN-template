import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const GoBack = () => {
  const navigate = useNavigate();

  const returnPage = () => {
    navigate(-1);
  };
  return (
    <Button variant="contained" color="info" onClick={returnPage}>
      กลับไปหน้าก่อน
    </Button>
  );
};

export default GoBack;
