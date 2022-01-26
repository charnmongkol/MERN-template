import React from "react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AiTwotoneHome } from "react-icons/ai";
import { FaUserCog } from "react-icons/fa";
import { BsFileEarmarkPost, BsFillCartFill } from "react-icons/bs";
import "./SidebarAdmin.css";

const sidebarNavItems = [
  {
    display: "โปรแกรมทัวร์",
    icon: <BsFileEarmarkPost></BsFileEarmarkPost>,
    to: "/myposts",
    cName: "nav-text",
    section: "started",
  },
  {
    display: "เอเจนซี่",
    icon: <FaUserCog></FaUserCog>,
    to: "/all-users",
    cName: "nav-text",
    section: "calendar",
  },
  {
    display: "คำสั่งจอง",
    icon: <BsFillCartFill></BsFillCartFill>,
    to: "/myorders",
    cName: "nav-text",
    section: "user",
  },
];

const SidebarAdmin = () => {
  const location = useLocation();

  return (
    <div className="col-xs-12 col-md-3 sidebarAdmin">
      <div className="sidebar__menu">
        <ul className="side-menu-items mb-0 ps-0 w-100">
          {sidebarNavItems.map((item, index) => {
            return (
              <li
                key={index}
                className={
                  location.pathname === item.to
                    ? `${item.cName} active`
                    : item.cName
                }
              >
                <Link to={item.to} className="d-flex gap-2 align-items-center">
                  {item.icon}
                  <span>{item.display}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SidebarAdmin;
