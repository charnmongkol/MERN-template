import React from "react";
import LogoNoBg from "../../assets/logos/Logo Navy Blue PNG.png";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Footer = () => {
  return (
    <Container maxWidth="lg" sx={{ height: "30%", py: { xs: "100px", md: 5 } }}>
      <Grid container spacing={2} sx={{ alignItems: "center" }}>
        <Grid item xs={12} md={10}>
          <Box
            sx={{
              textAlign: "center",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 4,
            }}
          >
            <img
              src={LogoNoBg}
              width="200"
              height="150"
              alt="Top of the world"
            />
            <Box sx={{ textAlign: "left" }}>
              <Typography variant="h5" sx={{ color: "#335377" }}>
                ติดต่อเรา
              </Typography>
              <Typography
                variant="subtitle1"
                gutterBottom
                component="div"
                sx={{ my: 2 }}
              >
                118 PSB Building 6th Floor, Vibhavadi Rangsit Rd, Chom Phon,
                Chatuchak, Bangkok 10900
              </Typography>
              <Typography variant="subtitle1" sx={{ color: "#335377" }}>
                เวลาทำการ
              </Typography>
              <Typography variant="subtitle2" component="div" sx={{ my: 2 }}>
                วันจันทร์ - ศุกร์: 9:00 - 18:00
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={2}></Grid>
      </Grid>
    </Container>
  );
};

export default Footer;
