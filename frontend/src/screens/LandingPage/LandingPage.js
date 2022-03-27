import React from "react";

import Banner from "../../components/Banner/Banner";
import AllPost from "../../components/AllPosts/AllPost";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import FloatingBox from "../../components/FloatingBox/FloatingBox";

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
      <FloatingBox />
    </>
  );
};

export default LandingPage;
