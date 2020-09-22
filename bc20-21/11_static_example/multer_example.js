const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const { promises: fsPromises } = require("fs");
const express = require("express");
const multer = require("multer");
const Jimp = require("jimp");

const storage = multer.diskStorage({
  destination: "draft",
  filename: (req, file, cb) => {
    const { ext } = path.parse(file.originalname);
    cb(null, Date.now() + ext);
  },
});
const upload = multer({ storage });

const app = express();

app.post(
  "/create-avatar",
  upload.single("avatar"),
  compressImage,
  (req, res, next) => {
    // 1. username
    // 2. avatar
    console.log(req.file);

    return res.status(200).send();
  }
);

async function compressImage(req, res, next) {
  const { file } = req;

  const lenna = await Jimp.read(file.path);
  await lenna.quality(1).write(path.join(__dirname, "static", file.filename));

  await fsPromises.unlink(file.path);

  next();
}

app.listen(process.env.PORT, () => {
  console.log("Started listening on port", process.env.PORT);
});
