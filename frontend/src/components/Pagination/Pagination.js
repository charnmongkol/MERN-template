import React from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { Link } from "react-router-dom";

const Paginate = () => {
  return (
    <Pagination
      page={1}
      count={10}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem component={Link} to={`/posts?page=${1}`} {...item} />
      )}
    />
  );
};

export default Paginate;
