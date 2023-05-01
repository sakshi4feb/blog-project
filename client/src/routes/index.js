import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Blogs from "../pages/Blogs";
import Navbar from "../layout/Navbar";
import CreateBlog from "../pages/CreateBlog";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Activate from "../pages/Activate";
import Profile from "../pages/Profile";
import { useSelector } from "react-redux";

const Index = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <BrowserRouter>
      {console.log(isLoggedIn)}
      <ToastContainer />
      <header>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/api/users/activate/:token" element={<Activate />} />
          {isLoggedIn && (
            <>
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/create-blog" element={<CreateBlog />} />
              <Route path="/profile" element={<Profile />} />
            </>
          )}
          {!isLoggedIn && (
            <>
              <Route path="/login" element={<Login />} />
            </>
          )}
          {/* <Route path="*" element={<Home />} /> */}
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default Index;
