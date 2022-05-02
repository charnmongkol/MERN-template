import React, { lazy, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import styled from "@emotion/styled";
// import TourCard from "./TourCard";
const TourCard = lazy(() => import("./TourCard"));

const SearchBox = styled(Box)`
  margin: auto;
  background-color: #c8e4fb;
  border-radius: 4px;
`;

const Tours = ({ alltours }) => {
  const [query, setQuery] = useState("");
  const searching = (data) => {
    return data.filter(
      (ele, ind) =>
        ind === alltours.findIndex((elem) => elem.tourCode === ele.tourCode) &&
        (ele.country[0].toLowerCase().includes(query) ||
          ele.tourName.toLowerCase().includes(query))
    );

    // ind === alltours.findIndex((elem) => elem.tourCode === ele.tourCode) ||
    // return data.filter((item) => item.startAt.toLowerCase().includes(query));
    // return data.filter((item) =>
    //   keys.some((key) => item[key].toLowerCase().includes(query))
    // );
  };

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if (alltours) {
      setPosts(alltours);
    }
  }, [alltours]);

  const byCountry = (a, b) => {
    if (a.country[0] > b.country[0]) {
      return 1;
    } else if (b.country[0] > a.country[0]) {
      return -1;
    } else {
      return 0;
    }
  };
  const byName = (a, b) => {
    if (a.tourName > b.tourName) {
      return 1;
    } else if (b.tourName > a.tourName) {
      return -1;
    } else {
      return 0;
    }
  };
  const byStartDate = (a, b) => {
    return new Date(a.startAt).valueOf() - new Date(b.startAt).valueOf();
  };
  return (
    <Grid container spacing={4}>
      <Grid
        item
        xs={12}
        md={12}
        lg={12}
        justifyContent="center"
        marginBottom={3}
      >
        <SearchBox sx={{ width: { md: "50%", sm: "100%" } }}>
          <TextField
            id="outlined-basic"
            label="ค้นหา"
            variant="outlined"
            fullWidth
            onChange={(e) => setQuery(e.target.value.toLocaleLowerCase())}
          />
        </SearchBox>
      </Grid>
      {posts &&
        searching(posts)
          .sort(byName)
          .sort(byStartDate)
          .sort(byCountry)
          .map((tour, index) => (
            <React.Fragment key={index}>
              <TourCard data={tour} index={index} />
            </React.Fragment>
          ))}
    </Grid>
  );
};

export default Tours;
