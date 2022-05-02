import React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";
import Link from "@mui/material/Link";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import { lazy } from "react";

const PeriodBox = lazy(() => import("./PeriodBox"));

const Image = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
`;

const TourCard = ({ data, index }) => {
  return (
    <Grid item xs={12} md={6} lg={4} key={index}>
      <Paper
        elevation={10}
        sx={{ borderRadius: 10, height: "620px" }}
        key={data._id}
      >
        <Link href={`/posts/${data._id}`}>
          <Image src={data.featuredImage} alt={data.title} />
        </Link>
        <Link href={`/posts/${data._id}`} underline="none">
          <Box sx={{ px: 2, pt: 2, height: "60px" }}>
            <Typography component="h2" variant="h6">
              {data.tourName}
            </Typography>
          </Box>
        </Link>

        <Box
          sx={{ px: 2, display: "flex", alignItems: "center", gap: 1 }}
          marginTop={3}
          paddingBottom={2}
        >
          {data.country.map((item, idx) => (
            <Chip
              key={idx}
              avatar={
                <Avatar
                  alt={item}
                  src={`https://countryflagsapi.com/svg/${item}`}
                />
              }
              label={item}
              variant="outlined"
            />
          ))}
        </Box>

        <PeriodBox code={data.tourCode} />

        <Box
          sx={{
            px: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            gap: 1,
          }}
          marginTop={3}
          paddingBottom={2}
        >
          <Link
            color="error"
            href={data.pdfFile}
            target="_blank"
            download
            underline="none"
          >
            PDF file
          </Link>
          <Link
            color="info"
            href={data.wordFile}
            target="_blank"
            underline="none"
          >
            Word file
          </Link>
        </Box>
      </Paper>
    </Grid>
  );
};

export default TourCard;
