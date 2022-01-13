import React from "react";
import "./LandingPage.css";
import { Container, Row } from "react-bootstrap";
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
      <Row className="text-center my-4">
        <h1>Best Value Trips</h1>
      </Row>
      <AllPost />
    </Container>
  );
};

export default LandingPage;
