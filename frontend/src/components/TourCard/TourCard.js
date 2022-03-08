import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React from "react";
import styled from "@emotion/styled";
import moment from "moment";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Link } from "react-router-dom";

const Image = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
`;

const TourCard = ({ data }) => {
  return (
    <Grid item xs={12} md={6} lg={4} key={data._id}>
      <Link to={`/posts/${data._id}`}>
        <Paper elevation={3} style={{ borderRadius: 10 }}>
          <Image src={data.featuredImage} alt={data.title} />
          <Box sx={{ px: 2, pt: 2 }}>
            <Typography component="h2" variant="h6">
              {data.title}
            </Typography>
          </Box>
          <Box sx={{ px: 2, display: "flex", alignItems: "center" }}>
            <AccessTimeIcon />
            <Typography component="p" variant="body2" marginLeft={0.5}>
              {moment(data.startAt).format("YYYY-MM-DD")} -{" "}
              {moment(data.endAt).format("YYYY-MM-DD")}
            </Typography>
          </Box>
          <Box
            sx={{ px: 2, display: "flex", alignItems: "center" }}
            marginTop={3}
            paddingBottom={2}
          >
            <Button
              variant="contained"
              color="primary"
              style={{ borderRadius: "16px" }}
            >
              <img
                src={`https://countryflagsapi.com/svg/${data.category}`}
                width="20px"
                style={{ marginRight: "4px" }}
              />
              {data.category}
            </Button>
          </Box>
        </Paper>
      </Link>
    </Grid>
  );
};

export default TourCard;
