import React, { useState } from "react";
import { toast } from "react-toastify";
import { createBlogRequest } from "../services/BlogServices";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newBlog = new FormData();
      newBlog.append("title", title);
      newBlog.append("description", description);
      newBlog.append("image", image);

      const response = await createBlogRequest(newBlog);

      toast(response.message);
    } catch (error) {
      toast(error.response.data.error.message);
    }
  };
  return (
    <div>
      <h1>Create a Blog</h1>
      {image && (
        <div>
          <img src={URL.createObjectURL(image)} alt="user" height="60rem" />
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="file"
            id="image"
            name="image"
            required
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            required
            value={title}
            onChange={handleTitleChange}
          />
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            name="description"
            id="description"
            required
            cols="30"
            rows="10"
            value={description}
            onChange={handleDescriptionChange}
          ></textarea>
        </div>
        <button type="submit">Create Blog</button>
      </form>
    </div>
  );
};

export default CreateBlog;
