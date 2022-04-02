const dotenv = require("dotenv");
const path = require("path");
const uuid = require("uuid");
dotenv.config({ path: path.resolve(__dirname, ".env") });
const fs = require('fs');

const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

const upload = multer({
  storage: multer.diskStorage({
    destination: "static",
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      return cb(null, `${uuid.v4()}${ext}`);
    },
  }),
});

const app = express();

app.post("/upload", upload.single("avatar"), async (req, res, next) => {
  const fileUpload = await cloudinary.uploader.upload(req.file.path, {
    access_mode: "public",
  });
  await fs.promises.unlink(req.file.path);

  res.send();
});

app.listen(process.env.PORT, () => {
  console.log("Server started listening on port", process.env.PORT);
});
