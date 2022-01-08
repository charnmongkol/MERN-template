import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <React.Fragment>
      <Outlet></Outlet>
    </React.Fragment>
  );
};

export default Layout;
