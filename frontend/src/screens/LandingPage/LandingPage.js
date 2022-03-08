import React from "react";
import "./LandingPage.css";

import Banner from "../../components/Banner/Banner";
import AllPost from "../../components/AllPosts/AllPost";
import { Container } from "@mui/material";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

const LandingPage = () => {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   const userInfo = localStorage.getItem("userInfo");

  //   if (userInfo) {
  //     navigate("/myposts");
  //   }
  // }, [navigate]);
  return (
    <>
      <Banner />
      <Container maxWidth="xl">
        <Box paddingY={3} sx={{ textAlign: "center" }}>
          <Typography variant="h2">โปรแกรมทัวร์ของเรา</Typography>
        </Box>
        <AllPost />
      </Container>
    </>
  );
};

export default LandingPage;
