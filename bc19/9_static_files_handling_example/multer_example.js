const express = require("express");
const multer = require("multer");
const path = require("path");
const { promises: fsPromises } = require("fs");
const imagemin = require("imagemin");
const imageminJpegtran = require("imagemin-jpegtran");
const imageminPngquant = require("imagemin-pngquant");

// 1. multer saves files to ./tmp folder
// 2. imagemin optimizes pic and saved it to ./upload

const storage = multer.diskStorage({
  destination: "./tmp",
  filename: (req, file, callback) => {
    const { ext } = path.parse(file.originalname);
    return callback(null, Date.now() + ext);
  },
});
const upload = multer({ storage });

const PORT = 3010;
const app = express();

app.use("/files", express.static("./upload"));

app.post(
  "/sign-up",
  upload.single("avatar"),
  compressImage,
  (req, res, next) => {
    console.log("req.body", req.body);
    console.log("req.file", req.file);
    console.log("req.files", req.files);

    return res.status(200).send();
    // return res.status(201).send({
    //   id,
    //   username,
    //   avatarLink,
    // });
  }
);

async function compressImage(req, res, next) {
  const { path: filePath, destination: multerDest, filename } = req.file;
  const DESTINATION_PATH = "./upload";

  const files = await imagemin([`${multerDest}/${filename}`], {
    destination: "./upload",
    plugins: [
      imageminJpegtran(),
      imageminPngquant({
        quality: [0.6, 0.8],
      }),
    ],
  });

  await fsPromises.unlink(filePath);

  req.file.destination = DESTINATION_PATH;
  req.file.path = path.join(DESTINATION_PATH, filename);

  next();
}

app.listen(PORT, () => {
  console.log("Server started listening on port", PORT);
});
