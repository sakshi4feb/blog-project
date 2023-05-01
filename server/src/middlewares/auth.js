const jwt = require("jsonwebtoken");
const dev = require("../config");
const { verifyJsonWebToken } = require("../utils/token");
const createError = require("http-errors");
const User = require("../models/users");

const isLoggedIn = (req, res, next) => {
  try {
    if (!req.headers.cookie) throw createError(404, "no cookie found");
    const token = req.headers.cookie.split("=")[1];
    if (!token) throw createError(404, "no token found");
    const decoded = verifyJsonWebToken(
      res,
      token,
      String(dev.app.jwtAuthorizationKey)
    );
    if (!decoded) throw createError(403, "Invalid Token");
    req.id = decoded.id;
    next();
  } catch (error) {
    next(error);
  }
};

const isLoggedOut = (req, res, next) => {
  try {
    if (req.headers.cookie) throw createError(401, "Please log in!");
    next();
  } catch (error) {
    next(error);
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const id = req.id;
    if (id) {
      const user = await User.findById(id);
      if (!user) throw createError(404, "No user found with this id!");
      if (!user.is_admin) throw createError(401, "User is not an admin!");
      next();
    } else {
      throw createError(400, "Please login!");
    }
  } catch (error) {
    next(error);
  }
};
module.exports = { isLoggedIn, isLoggedOut, isAdmin };
