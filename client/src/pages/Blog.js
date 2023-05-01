import React from "react";

const Blog = (props) => {
  const { title, image, description } = props.blog;
  const imageUrl = "http://localhost:8080/" + image;
  return (
    <div>
      <img src={imageUrl} alt={title}></img>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
};

export default Blog;
