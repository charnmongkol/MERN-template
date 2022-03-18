import { Grid } from "@mui/material";
import { Paper } from "@mui/material";
import { Container } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

import Post from "../../components/Post/Post";
import Sidebar from "../../components/Sidebar/Sidebar";

const SinglePost = () => {
  return (
    <Container maxWidth="xl">
      <Paper elevation={0} sx={{ mt: "100px", p: 1 }}>
        <Grid container rowSpacing={2}>
          <Grid item md={12} xs={12} lg={9}>
            <Post />
          </Grid>
          <Grid item md={12} xs={12} lg={3}>
            <Sidebar />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default SinglePost;
