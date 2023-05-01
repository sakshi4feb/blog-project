const jwt = require("jsonwebtoken");
const fs = require("fs");
const createError = require("http-errors");
const User = require("../models/users");
const dev = require("../config");
const {
  genPassword,
  sendEmailWithNodeMailer,
  compPassword,
} = require("../utils/helper");
const { createJsonWebToken, verifyJsonWebToken } = require("../utils/token");
const { successResponse } = require("../utils/responseHandler");
const { default: mongoose } = require("mongoose");

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;
    const image = req.file;
    if (!name || !email || !password || !phone)
      throw createError(400, "Please fill all the fields!");

    if (password.length < 6)
      throw createError(400, "Password should be atleast 6 characters!");

    if (image && image.size > Math.pow(1024, 2))
      throw createError(400, "Maximum size for image should be 1mb!");

    const isExists = await User.findOne({ email });
    if (isExists)
      throw createError(
        400,
        `User already exists with email ${email}. Please sign in.`
      );

    const hashedPassword = await genPassword(password);

    let token;
    if (image) {
      token = createJsonWebToken(
        { ...req.body, password: hashedPassword, image: image.path },
        String(dev.app.jwtSecretKey),
        "10m"
      );
    } else {
      token = createJsonWebToken(
        { ...req.body, password: hashedPassword },
        String(dev.app.jwtSecretKey),
        "10m"
      );
    }

    const emailData = {
      email,
      subject: "Account Activation Email",
      html: `
      <h2> Hello ${name} . </h2>
      <p> Please click here to <a href="${dev.app.clientUrl}/api/users/activate/${token}" target=_blank">activate your account</a></p>
      `, // html body
    };
    sendEmailWithNodeMailer(emailData);
    successResponse(res, 201, `Verification email has been sent to ${email}.`, {
      token,
    });
  } catch (error) {
    next(error);
  }
};
const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token) throw createError(404, "Token not found");

    const decoded = verifyJsonWebToken(
      res,
      token,
      String(dev.app.jwtSecretKey)
    );
    const existingUser = await User.findOne({ email: decoded.email });
    if (existingUser)
      throw createError(409, "This account is already activated!");

    const newUser = new User({ ...decoded });

    const user = await newUser.save();
    if (!user) throw createError(400, "User is not created.");
    return successResponse(res, 201, "User is created. Ready to sign in.");
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      throw createError(400, "email or password is missing!");

    if (password.length < 6)
      throw createError(400, "Password should be minimum 6 characters");

    const user = await User.findOne({ email });
    if (!user)
      throw createError(
        400,
        `User does not exist with email ${email}. Please register.`
      );

    if (user.is_banned)
      throw createError(403, "user is banned.Please contactauthority.");

    const isPasswordMatched = await compPassword(password, user.password);

    if (!isPasswordMatched)
      throw createError(401, "email or password did not match");

    const token = createJsonWebToken(
      { id: user._id },
      String(dev.app.jwtAuthorizationKey),
      "15m"
    );
    if (req.cookies[`${user._id}`]) {
      req.cookies[`${user._id}`] = "";
    }
    res.cookie(String(user._id), token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 60 * 14),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return successResponse(res, 200, "login successful!", {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        image: user.image,
        isAdmin: user.is_admin,
      },
      token: token,
    });
  } catch (error) {
    next(error);
  }
};

const userProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const user = await User.findById(id);
    if (!user) throw createError(404, "User is not found.");
    return successResponse(res, 200, "User was returned successfully!", {
      user,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      next(createError(400, "Invalid ID"));
      return;
    }
    next(error);
  }
};

const logoutUser = async (req, res, next) => {
  console.log("hi");
  try {
    // console.log("hi");
    // console.log(req.headers.cookie);
    if (!req.headers.cookie) throw createError(404, "no cookie found");
    const token = req.headers.cookie.split("=")[1];
    if (!token) throw createError(404, "no token found");
    const decoded = verifyJsonWebToken(
      res,
      token,
      String(dev.app.jwtAuthorizationKey)
    );
    if (!decoded) throw createError(403, "Invalid Token");
    if (req.cookies[`${decoded.id}`]) {
      req.cookies[`${decoded.id}`] = "";
    }
    res.clearCookie(`${decoded.id}`);
    return successResponse(res, 200, "User was logged out!");
  } catch (error) {
    next(error);
  }
};

const getRefreshToken = async (req, res, next) => {
  try {
    if (!req.headers.cookie) throw createError(404, "no cookie found");
    const oldToken = req.headers.cookie.split("=")[1];
    if (!oldToken) throw createError(404, "no token found");
    const decoded = verifyJsonWebToken(
      res,
      oldToken,
      String(dev.app.jwtAuthorizationKey)
    );
    // const decoded = jwt.verify(oldToken, String(dev.app.jwtAuthorizationKey));
    if (!decoded) throw createError(403, "Invalid Token....");

    const token = createJsonWebToken(
      { id: decoded.id },
      String(dev.app.jwtAuthorizationKey),
      "15m"
    );
    if (req.cookies[`${decoded.id}`]) {
      req.cookies[`${decoded.id}`] = "";
    }
    res.cookie(String(decoded.id), token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 60 * 2),
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    return successResponse(res, 200, "Refresh token was returned!", { token });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  registerUser,
  verifyEmail,
  loginUser,
  userProfile,
  logoutUser,
  getRefreshToken,
};
