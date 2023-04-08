const multer = require("multer");
const path = require("path");
const uuid = require("uuid");

const storage = multer.diskStorage({
  destination: "static",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, uuid.v4() + ext);
  },
});
exports.upload = multer({ storage });
