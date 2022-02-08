import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const [cats, setCats] = useState([]);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  // console.log(userInfo);
  const params = useParams();
  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/posts/${params.id}`);
      // console.log(data);
      setCats(data.category);
    };

    fetching();
  });
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <div className="logo-sidebar my-3">
          <img src={userInfo.pic} class="img-fluid" alt={userInfo.name} />
        </div>
        <ul>
          <li>{userInfo.name}</li>
          <li>{userInfo.email}</li>
          <li>{userInfo.phoneNumber}</li>
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          <Link to={`/?cat=${cats}`} className="link">
            <li className="sidebarListItem">{cats}</li>
          </Link>
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <a href={userInfo.website}>{userInfo.website}</a>
          {/* <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i> */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
