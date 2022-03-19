import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Layout from "./components/layout";
import AllUsers from "./screens/allUsers/AllUsers";
import CreatePost from "./screens/CreatePost/CreatePost";
import EditPost from "./screens/EditPost/EditPost";
import LandingPage from "./screens/LandingPage/LandingPage";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import MyPostsPage from "./screens/MyPosts/MyPosts";
import NotFound from "./screens/NotFound/NotFound";
import Posts from "./screens/Posts/Posts";
import SinglePost from "./screens/Posts/SinglePost";
import ProfilePage from "./screens/ProfilePage/ProfilePage";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import ResponsiveAppBar from "./components/Header/AppBar";
import CreatePost2 from "./screens/CreatePost/CreatePost2";
import Bill from "./screens/Bills/Bill";
import Registration from "./screens/Auth/Registration";

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
        <ResponsiveAppBar />
        <Routes path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/myposts" element={<MyPostsPage />} />
          <Route path="/createpost" element={<CreatePost2 />} />
          <Route path="/editpost/:id" element={<EditPost />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<SinglePost />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/mybills" element={<Bill />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
