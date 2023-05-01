import React, { useState } from "react";
import { toast } from "react-toastify";
import { registerUser } from "../services/UserServices";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newUser = new FormData();
      newUser.append("name", name);
      newUser.append("email", email);
      newUser.append("password", password);
      newUser.append("phone", phone);
      newUser.append("image", image);

      const response = await registerUser(newUser);
      toast(response.message);
    } catch (error) {
      toast.error(error.response.data.error.message);
    }
  };

  return (
    <div>
      <h1>Register User</h1>
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
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={name}
            onChange={handleNameChange}
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            required
            value={email}
            onChange={handleEmailChange}
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="text"
            id="password"
            name="password"
            required
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            required
            value={phone}
            onChange={handlePhoneChange}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
