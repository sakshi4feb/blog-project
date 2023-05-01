const { Schema, model } = require("mongoose");

const blogSchema = new Schema(
  {
    title: {
      type: String,
      minlength: [3, "name should be min 3 characters"],
      required: [true, "Title is mandatory"],
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: [true, "Description is mandatory"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Image is mandatory"],
      trim: true,
    },
  },
  { timestamps: true }
);

const Blog = model("blog", blogSchema);
module.exports = Blog;
