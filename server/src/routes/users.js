const { Router } = require("express");
const usersRouter = Router();
const dev = require("../config");
const upload = require("../middlewares/fileUpload");
const { isLoggedIn } = require("../middlewares/auth");

const {
  //   deleteUser,
  loginUser,
  //   updateUser,
  registerUser,
  verifyEmail,
  findUser,
  userProfile,
  logoutUser,
  getRefreshToken,
  //   forgetPassword,
  //   resetPassword,
} = require("../controllers/users");

usersRouter.post("/loginuser", loginUser);
usersRouter.post("/register", upload.single("image"), registerUser);
usersRouter.post("/activate", verifyEmail);
usersRouter.post("/logout", isLoggedIn, logoutUser);
usersRouter.get("/profile/:id", isLoggedIn, userProfile);
usersRouter.get("/refresh-token", isLoggedIn, getRefreshToken);
//   .delete(isLoggedIn, deleteUser)
//   .put(isLoggedIn, formidable(), updateUser);
// usersRouter.post("/forget-password", isLoggedOut, forgetPassword);
// usersRouter.post("/reset-password", isLoggedOut, resetPassword);

module.exports = usersRouter;
