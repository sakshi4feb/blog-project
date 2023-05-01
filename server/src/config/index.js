require("dotenv").config();

const dev = {
  app: {
    serverPort: process.env.SERVER_PORT || 3006,
    jwtSecretKey: process.env.JWT_SECRET_KEY || "ANJNUBHDJUHDN",
    jwtAuthorizationKey: process.env.JWT_AUTHORIZATION_KEY,
    smtpUsername: process.env.SMTP_USER,
    smtpPassword: process.env.SMTP_PASSWORD,
    clientUrl: process.env.CLIENT_URL,
  },
  db: {
    url: process.env.DB_URL || "mongodb://127.0.0.1:27017/blog-db",
  },
};

module.exports = dev;
