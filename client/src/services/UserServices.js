import axios from "axios";
axios.defaults.withCredentials = true;

const baseURL = "http://127.0.0.1:8080";

export const registerUser = async (newUser) => {
  const response = await axios.post(`${baseURL}/api/users/register`, newUser);
  return response.data;
};

export const activateUser = async (token) => {
  const response = await axios.post(`${baseURL}/api/users/activate`, token);
  return response.data;
};

export const loginUser = async (user) => {
  const response = await axios.post(`${baseURL}/api/users/loginuser`, user);
  return response.data;
};

export const logoutUser = async () => {
  const response = await axios.post(`${baseURL}/api/users/logout`);
  return response.data;
};

export const getRefreshToken = async () => {
  const response = await axios.get(`${baseURL}/api/users/refresh-token`);
  return response.data;
};

export const getUserProfile = async (id) => {
  const response = await axios.get(`${baseURL}/api/users/profile/${id}`);
  return response.data;
};
