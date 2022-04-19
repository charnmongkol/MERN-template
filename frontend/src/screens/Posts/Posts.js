import React, { useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../redux/actions/postsActions";
import ResponsiveAppBar from "../../components/Header/AppBar";
import Loading from "../../components/Loading";
import { Container } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Tours from "../../components/TourCard/Tours";

const Footer = lazy(() => import("../../components/Footer/Footer"));

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Posts = () => {
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useNavigate();

  const allPosts = useSelector((state) => state?.allPosts);
  const { loading, allposts } = allPosts;

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  return (
    <Container maxWidth="lg">
      <ResponsiveAppBar />
      {loading && (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              height: "100vh",
              width: "100%",
            }}
          ></Box>
          <Loading />
          <Box />
        </>
      )}

      <Box height="100px"></Box>
      <Box
        sx={{ typography: "h1", fontSize: "3rem", textAlign: "center", my: 5 }}
      >
        โปรแกรมทัวร์
      </Box>

      <Box>
        <Tours alltours={allposts} />
      </Box>

      <Suspense fallback={<div>Loading...</div>}>
        <Footer />
      </Suspense>
    </Container>
  );
};

export default Posts;
