import React from "react";
import "./LandingPage.css";
import { Container } from "react-bootstrap";
import Banner from "../../components/Banner/Banner";
import AllPost from "../../components/AllPosts/AllPost";

const LandingPage = () => {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   const userInfo = localStorage.getItem("userInfo");

  //   if (userInfo) {
  //     navigate("/myposts");
  //   }
  // }, [navigate]);
  return (
    <Container fluid className="main">
      <Banner />
      <AllPost />
    </Container>
  );
};

export default LandingPage;
