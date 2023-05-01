const jwt = require("jsonwebtoken");

const createJsonWebToken = (data, key, expiresIn) => {
  return jwt.sign({ ...data }, String(key), { expiresIn: "10m" });
};

const verifyJsonWebToken = (res, token, key) => {
  try {
    return jwt.verify(token, String(key));
  } catch (error) {
    return res.json({ error: error.message });
  }
};

module.exports = { createJsonWebToken, verifyJsonWebToken };
