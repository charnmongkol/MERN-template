import React, { useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../redux/actions/postsActions";
import moment from "moment";
import ResponsiveAppBar from "../../components/Header/AppBar";
import Loading from "../../components/Loading";

import { Container } from "@mui/material";

import { Paper } from "@mui/material";
import Paginate from "../../components/Pagination/Pagination";
import { useLocation, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import countries from "../../conf/countries.json";
import { Autocomplete } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import Tours from "../../components/TourCard/Tours";

const Footer = lazy(() => import("../../components/Footer/Footer"));

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Posts = () => {
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useNavigate();
  //going to read url
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");

  const allPosts = useSelector((state) => state?.allPosts);
  const { loading, allposts } = allPosts;

  const [country, setCountry] = useState(null);
  const [sort, setSort] = useState("newest");

  // console.log("va", country);
  const handleChange = (e, value) => {
    e.preventDefault();
    setCountry(value.label);
  };

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
      <Box sx={{ typography: "h1", fontSize: "3rem", textAlign: "center" }}>
        โปรแกรมทัวร์
      </Box>

      {/* <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
          <Paper elevation={3}>
            <Autocomplete
              id="country-select-demo"
              sx={{ width: 300 }}
              value={country}
              options={countries}
              onChange={handleChange}
              // isOptionEqualToValue={(option, value) => option === value}
              disablePortal
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  {...props}
                >
                  <img
                    loading="lazy"
                    width="20"
                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                    alt=""
                  />
                  {option.label} ({option.code})
                </Box>
              )}
              renderInput={(params) => (
                <TextField {...params} label="Choose a country" />
              )}
            />

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">เรียงลำดับ</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sort}
                label="Age"
                onChange={(e) => setSort(e.target.value)}
              >
                <MenuItem value="newest">ใหม่สุด</MenuItem>
                <MenuItem value="asc">asc</MenuItem>
                <MenuItem value="desc">desc</MenuItem>
              </Select>
            </FormControl>

            <Button variant="contained" color="primary">
              ค้นหา
            </Button>
          </Paper>
        </Box> */}

      <Box>
        <Tours alltours={allposts} country={country} sort={sort} />
      </Box>

      {/* <Box sx={{ my: 3, display: "flex", justifyContent: "center" }}>
        <Paper elevation={1} sx={{ p: 3 }}>
          <Paginate />
        </Paper>
      </Box> */}
      <Suspense fallback={<div>Loading...</div>}>
        <Footer />
      </Suspense>
    </Container>
  );
};

export default Posts;
