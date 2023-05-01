const Blog = require("../models/blogs");
const slugify = require("slugify");
const createError = require("http-errors");

const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({});
    successResponse(res, 200, "All blogs returned!", blogs);
  } catch (error) {
    next(error);
  }
};

const getSingleBlog = async (req, res, next) => {
  try {
    successResponse(res, 200, "Blog is returned!", []);
  } catch (error) {
    next(error);
  }
};

const createBlog = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const image = req.file;
    if (!title || !description)
      throw createError(400, "Title or Description is missing!");

    if (title.length < 3)
      throw createError(400, "Tile should be atleast 3 characters!");

    if (image && image.size > Math.pow(1024, 2))
      throw createError(400, "Maximum size for image should be 1mb!");

    const blog = await Blog.findOne({ title });
    if (blog)
      throw createError(
        400,
        `Blog already exists with title ${title}. Please change the title.`
      );

    const newBlog = new Blog({
      title: title,
      slug: slugify(title),
      description: description,
      image: req.file.path,
    });
    const blogData = await newBlog.save();
    if (!blogData) throw createError(400, "Blog was not created!");
    successResponse(res, 201, "Blog was created successfully!", blogData);
  } catch (error) {
    next(error);
  }
};

const deleteBlog = async (req, res, next) => {
  try {
    successResponse(res, 200, "Blog was deleted successfully!", []);
  } catch (error) {
    next(error);
  }
};

const updateBlog = async (req, res, next) => {
  try {
    successResponse(res, 200, "Blog was updated successfully!", []);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBlogs,
  getSingleBlog,
  createBlog,
  deleteBlog,
  updateBlog,
};
