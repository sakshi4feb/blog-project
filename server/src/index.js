const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const blogRouter = require("./routes/blogs");
const usersRouter = require("./routes/users");
// const adminRouter = require("./routes/admin");
const dev = require("./config");
const connectDB = require("./config/db");

const app = express();

const PORT = dev.app.serverPort || 3006;
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/public", express.static("public"));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/blogs", blogRouter);
app.use("/api/users", usersRouter);
// app.use("/api/admin", adminRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Testing Successful!" });
});

app.use((req, res, next) => {
  next(createError(404, "Route not found!"));
});

//next
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ error: { status: err.status, message: err.message } });
});

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await connectDB();
});
