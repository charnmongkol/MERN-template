import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const GoBack = () => {
  const navigate = useNavigate();

  const returnPage = () => {
    navigate(-1);
  };
  return (
    <Button variant="warning" onClick={returnPage}>
      back
    </Button>
  );
};

export default GoBack;
