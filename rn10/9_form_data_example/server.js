const express = require("express");
const imagemin = require("imagemin");
const imageminJpegtran = require("imagemin-jpegtran");
const imageminPngquant = require("imagemin-pngquant");
const { promises: fsPromises } = require("fs");

/**
 * Initialize multer
 */
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "drafts");
  },
  filename: function (req, file, cb) {
    const { ext } = path.parse(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});
const upload = multer({ storage /*limits: { fileSize: 123000 } */ });

const PORT = 3000;

const server = express();

server.post(
  "/sign-up",
  upload.single("avatar"),
  compressImage,
  (req, res, next) => {
    console.log("req.body", req.body);
    console.log("req.file", req.file);

    return res.status(204).send();
  }
);

server.listen(PORT, () => {
  console.log("Server started listening on port", PORT);
});

async function compressImage(req, res, next) {
  const { path: uncompressedFilePath, filename } = req.file;
  const COMPRESSING_DESTINATION = "uploads";

  await imagemin([uncompressedFilePath], {
    destination: COMPRESSING_DESTINATION,
    plugins: [
      imageminJpegtran(),
      imageminPngquant({
        quality: [0.6, 0.8],
      }),
    ],
  });

  req.file.path = path.join(COMPRESSING_DESTINATION, filename);

  await fsPromises.unlink(uncompressedFilePath);

  next();
}
