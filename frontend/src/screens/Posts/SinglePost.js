import React from "react";

import Post from "../../components/Post/Post";
import Sidebar from "../../components/Sidebar/Sidebar";

const SinglePost = () => {
  return (
    <div className="container d-flex mt-5">
      <Post />
      <Sidebar />
    </div>
  );
};

export default SinglePost;
