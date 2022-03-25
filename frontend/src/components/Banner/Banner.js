import { Box } from "@mui/material";
import { Container } from "@mui/material";
import React from "react";
import bg from "../../assets/images/manuel-cosentino-n--CMLApjfI-unsplash.jpg";

const Banner = () => {
  return (
    <Container disableGutters={true} maxWidth={false} sx={{ mt: "64px" }}>
      <Box
        sx={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          height: "93vh",
        }}
      ></Box>
    </Container>
  );
};

export default Banner;
