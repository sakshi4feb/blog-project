import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../services/UserServices";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/userSlice";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      await logoutUser();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <nav>
      <Link to="/">Home</Link>
      {isLoggedIn ? (
        <>
          <Link to="/profile">Profile</Link>
          <Link to="/logout" onClick={handleLogOut}>
            Logout
          </Link>
          <Link to="/blogs">Blogs</Link>
          <Link to="/create-blog">Create Blog</Link>
        </>
      ) : (
        <>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
