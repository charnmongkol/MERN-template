import React, { Suspense, lazy } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./components/layout";
import Agents from "./screens/Admin/Agents";
import Tours from "./screens/Admin/Tours";
const CreatePost = lazy(() => import("./screens/CreatePost/CreatePost"));

const EditPost = lazy(() => import("./screens/EditPost/EditPost"));
const LandingPage = lazy(() => import("./screens/LandingPage/LandingPage"));
const MyPostsPage = lazy(() => import("./screens/MyPosts/MyPosts"));
const NotFound = lazy(() => import("./screens/NotFound/NotFound"));
const Posts = lazy(() => import("./screens/Posts/Posts"));
const SinglePost = lazy(() => import("./screens/Posts/SinglePost"));
const ProfilePage = lazy(() => import("./screens/ProfilePage/ProfilePage"));
const Bill = lazy(() => import("./screens/Bills/Bill"));
const Registration = lazy(() => import("./screens/Auth/Registration"));
const CreatePostByCode = lazy(() =>
  import("./screens/CreatePost/CreatePostByCode")
);
const MyPofile = lazy(() => import("./screens/Agent/Dashboard/MyPofile"));
const MyBills = lazy(() => import("./screens/Agent/Dashboard/MyBills"));
const Login = lazy(() => import("./screens/Auth/Login"));
const AllAgents = lazy(() => import("./screens/AllAgents/AllAgents"));

const theme = createTheme({
  palette: {
    primary: {
      main: "#002855",
      light: "#335377",
      dark: "#001c3b",
    },
    info: {
      main: "#0F52BA",
      light: "#3f74c7",
      dark: "#0a3982",
    },
  },
  typography: {
    fontFamily: "Prompt",
    fontWeightRegular: "",
  },
});
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/admin/profile" element={<ProfilePage />} />
            <Route path="/admin/myposts" element={<Tours />} />
            <Route path="/admin/createpost" element={<CreatePost />} />
            <Route
              path="/admin/createpostbycode"
              element={<CreatePostByCode />}
            />
            <Route path="/admin/editpost/:id" element={<EditPost />} />
            <Route path="/admin/all-users" element={<Agents />} />
            <Route path="/admin/allbills" element={<Bill />} />

            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/:id" element={<SinglePost />} />

            <Route path="/agents" element={<AllAgents />} />

            <Route path="*" element={<NotFound />} />

            <Route path="/agent/dashboard/profile" element={<MyPofile />} />
            <Route path="/agent/dashboard" element={<MyBills />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
