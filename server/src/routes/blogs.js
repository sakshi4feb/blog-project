const { Router } = require("express");
const blogRouter = Router();
const dev = require("../config");
const upload = require("../middlewares/fileUpload");
const { isLoggedIn } = require("../middlewares/auth");

const {
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogs");

blogRouter.route("/").get(getAllBlogs).post(upload.single("image"), createBlog);
blogRouter.route("/:id").put(updateBlog).delete(deleteBlog);

blogRouter.use("*", (req, res, next) => {
  res.send("route not found.");
});
module.exports = blogRouter;
