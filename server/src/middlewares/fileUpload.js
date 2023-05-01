const multer = require("multer");
const path = require("path");
const FILE_SIZE = 1024 * 1024 * 2;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/blogs");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage, limits: { filesize: FILE_SIZE } });
module.exports = upload;
