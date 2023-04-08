const express = require("express");
const multer = require("multer");
const uuid = require("uuid");
const path = require("path");

const storage = multer.diskStorage({
  destination: "static",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, uuid.v4() + ext);
  },
});
const upload = multer({ storage });

const app = express();

app.post("/avatar", upload.single("avatar"), (req, res, next) => {
  res.send();
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server started listening on port", PORT);
});
