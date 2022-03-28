import React from "react";

import Banner from "../../components/Banner/Banner";
import AllPost from "../../components/AllPosts/AllPost";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import FloatingBox from "../../components/FloatingBox/FloatingBox";
import ToursSlider from "../../components/ToursSlider/ToursSlider";

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
      <ToursSlider />
      <FloatingBox />
    </>
  );
};

export default LandingPage;
