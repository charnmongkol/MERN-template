import { Box } from "@mui/material";
import { Container } from "@mui/material";
import React from "react";
import bg from "../../assets/logos/Banner1.jpeg";

const Banner = () => {
  return (
    <Container disableGutters={true} maxWidth={false} sx={{ mt: "80px" }}>
      <Box
        sx={{
          backgroundImage: `url(${bg})`,
          backgroundSize: { md: "cover", xs: "contain" },
          backgroundRepeat: "no-repeat",
          height: { md: "90vh", xs: "212px" },
        }}
      ></Box>
    </Container>
  );
};

export default Banner;
