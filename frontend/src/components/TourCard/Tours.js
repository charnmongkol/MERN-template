import React, { lazy, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
// import TourCard from "./TourCard";
const TourCard = lazy(() => import("./TourCard"));

const Tours = ({ alltours }) => {
  const [data, setData] = useState("");
  const [sortType, setSortType] = useState("country");

  console.log("data", alltours);

  useEffect(() => {
    const sortArray = (type) => {
      const types = {
        country: "country",
        tourName: "tourName",
        startAt: "startAt",
        endAt: "endAt",
      };
      const sortProperty = types[type];
      const sorted = [...alltours].sort(
        (a, b) => a[sortProperty] - b[sortProperty]
      );
      console.log(sorted);
      setData(sorted);
    };

    sortArray(sortType);
  }, [sortType]);

  const byCountry = (a, b) => {
    if (a.country[0] < b.country[0]) {
      return 1;
    } else if (b.country[0] < a.country[0]) {
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
      {alltours &&
        alltours
          .sort(byStartDate)
          .sort(byCountry)
          .map((tour, index) => <TourCard data={tour} key={index} />)}
    </Grid>
  );
};

export default Tours;
