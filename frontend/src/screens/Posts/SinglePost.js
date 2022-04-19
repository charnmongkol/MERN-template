import { Grid } from "@mui/material";
import { Paper } from "@mui/material";
import { Container } from "@mui/material";
import React, { lazy, Suspense } from "react";
import ResponsiveAppBar from "../../components/Header/AppBar";
const Post = lazy(() => import("../../components/Post/Post"));
const Sidebar = lazy(() => import("../../components/Sidebar/Sidebar"));
const Footer = lazy(() => import("../../components/Footer/Footer"));

const SinglePost = () => {
  return (
    <Container maxWidth="xl">
      <ResponsiveAppBar />
      <Paper elevation={0} sx={{ mt: "100px", p: 1 }}>
        <Grid container rowSpacing={2}>
          <Grid item md={12} xs={12} lg={12}>
            <Suspense fallback={<div>Loading...</div>}>
              <Post />
            </Suspense>
          </Grid>
        </Grid>
      </Paper>
      <Suspense fallback={<div>Loading...</div>}>
        <Footer />
      </Suspense>
    </Container>
  );
};

export default SinglePost;
