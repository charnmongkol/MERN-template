import React from "react";
import moment from "moment";
import DateRangeRoundedIcon from "@mui/icons-material/DateRangeRounded";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";

const PeriodBox = ({ code }) => {
  const [period, setPeriod] = useState([]);
  useEffect(() => {
    if (code) {
      const fetching = async () => {
        const { data } = await axios.get(`api/posts/tours/${code}`);
        setPeriod(data);
      };
      fetching();
    }
  }, [code]);
  // console.log(period);
  const byStartDate = (a, b) => {
    return new Date(a.startAt).valueOf() - new Date(b.startAt).valueOf();
  };
  return (
    <Box
      sx={{
        px: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        height: "17%",
        overflow: "auto",
      }}
    >
      {period &&
        period.sort(byStartDate).map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <DateRangeRoundedIcon />
            <Typography component="p" variant="body2" marginLeft={0.5}>
              {moment(item.startAt).format("LL")} -{" "}
              {moment(item.endAt).format("LL")}
            </Typography>
          </Box>
        ))}
    </Box>
  );
};

export default PeriodBox;
