import React from "react";
import LogoNoBg from "../../assets/logos/Logo Navy Blue PNG.png";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const Footer = () => {
  return (
    <Container maxWidth="lg" sx={{ height: "30%", py: { xs: "100px", md: 5 } }}>
      <Grid container spacing={2} sx={{ alignItems: "center" }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ textAlign: "center" }}>
            <img
              src={LogoNoBg}
              width="200"
              height="150"
              alt="Top of the world"
            />
            <Typography
              variant="h5"
              gutterBottom
              component="div"
              sx={{ my: 2 }}
            >
              118 PSB Building 6th Floor, Vibhavadi Rangsit Rd, Chom Phon,
              Chatuchak, Bangkok 10900
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}></Grid>
      </Grid>
    </Container>
  );
};

export default Footer;
