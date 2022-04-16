import { Grid } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import TourCard from "./TourCard";

const Tours = ({ alltours, country, sort }) => {
  // console.log("all", alltours, country, sort);
  // console.log("filter", country);
  // useEffect(() => {
  //   country &&
  //     setFilterTours(
  //       alltours.filter((item) =>
  //         Object.entries(country).every(([key, value]) =>
  //           item[key].include(value)
  //         )
  //       )
  //     );
  // }, [country, sort]);
  // useEffect(() => {
  //   if (sort === "newest") {
  //     setFilterTours((prev) =>
  //       [...prev].sort((a, b) => a.createdAt - b.createdAt)
  //     );
  //   } else if (sort === "asc") {
  //     setFilterTours((prev) => [...prev].sort((a, b) => a.startAt - b.startAt));
  //   } else if (sort === "desc") {
  //     setFilterTours((prev) => [...prev].sort((a, b) => b.startAt - a.startAt));
  //   }
  // }, [sort]);
  return (
    <Grid container spacing={4}>
      {alltours &&
        alltours.map((tour, index) => <TourCard data={tour} key={index} />)}
      {/* {alltours &&
        alltours
          .filter((i) => i.category === country)
          .map((tour, index) => <TourCard data={tour} key={index} />)} */}
    </Grid>
  );
};

export default Tours;
