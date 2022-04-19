import { Box } from "@mui/material";
import { Container } from "@mui/material";
import React from "react";
import bg from "../../assets/logos/Banner1.jpg";

const Banner = () => {
  return (
    <Container disableGutters={true} maxWidth={false} sx={{ mt: "80px" }}>
      <Box
        sx={{
          backgroundImage: `url(${bg})`,
          backgroundSize: { md: "contain", sm: "cover", xs: "contain" },
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          height: { md: "90vh", sm: "60vh", xs: "400px" },
        }}
      ></Box>
    </Container>
  );
};

export default Banner;
