import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import React from "react";

const Loading = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress color="secondary" />
    </Box>
  );
};

export default Loading;
