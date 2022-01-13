import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import "./bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import reportWebVitals from "./reportWebVitals";
import MyNotesPage from "./screens/MyNotes/MyNotes";
import MyPostsPage from "./screens/MyPosts/MyPosts";
import LandingPage from "./screens/LandingPage/LandingPage";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import store from "./store";
import CreatePost from "./screens/CreatePost/CreatePost";
import EditPost from "./screens/EditPost/EditPost";
import Layout from "./components/layout";
import ProfilePage from "./screens/ProfilePage/ProfilePage";
import Posts from "./screens/Posts/Posts";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Header />
      <Routes path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/mynotes" element={<MyNotesPage />} />
        <Route path="/myposts" element={<MyPostsPage />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/editpost/:id" element={<EditPost />} />
        <Route path="/posts" element={<Posts />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
