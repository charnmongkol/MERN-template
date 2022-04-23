import React from "react";
import LogoNoBg from "../../assets/logos/Logo Navy Blue PNG.png";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import FaxRoundedIcon from "@mui/icons-material/FaxRounded";
import PhoneAndroidRoundedIcon from "@mui/icons-material/PhoneAndroidRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";

const ItemLine = styled(Button)`
  background-color: #06c755;
  color: #ffffff;
  &:hover,
  &:active,
  &:visited,
  &:link,
  &:focus {
    background-color: #06c755;
    color: #ffffff;
  }
`;

const Footer = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{ height: "30%", pb: { xs: "120px", md: 5 }, pt: { md: 5, sm: 5 } }}
    >
      <Grid container spacing={2} sx={{ alignItems: "center" }}>
        <Grid item xs={12} md={3}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "flex-start",
              gap: 4,
            }}
          >
            <Box>
              <img
                src={LogoNoBg}
                width="100%"
                height="150"
                alt="Top of the world"
              />
            </Box>
            <Box sx={{ width: "100%" }}>
              <ItemLine
                variant="contained"
                href="https://lin.ee/m6OepL7"
                target="_blank"
                sx={{ width: "100%" }}
              >
                Add Line
              </ItemLine>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={9}>
          <Box sx={{ textAlign: "left" }}>
            <Typography variant="h4" gutterBottom sx={{ color: "#002855" }}>
              Top of the world Co.,Ltd. TAT : 11/10733
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              TAT : 11/10733
            </Typography>
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
            <Box component="div">
              <List disablePadding>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <LocalPhoneRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Tel: 02-019-8044" />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <FaxRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Fax: 02-019-8045" />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <PhoneAndroidRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Mobile: 098-9905524" />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <EmailRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Email: contact.topworld@gmail.com" />
                </ListItem>
              </List>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Footer;
