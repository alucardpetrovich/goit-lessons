const express = require("express");
const multer = require("multer");
const mime = require("mime-types");
const uuid = require("uuid");
const Jimp = require("jimp");
const path = require("path");
const fs = require("fs").promises;

const upload = multer({
  storage: multer.diskStorage({
    filename: (req, file, cb) => {
      const extname = mime.extension(file.mimetype);
      const filename = uuid.v4() + "." + extname;
      cb(null, filename);
    },
    destination: "draft",
  }),
});

const PORT = 3000;

const server = express();

server.use("/files", express.static("static"));

server.post("/avatar", upload.single("avatar"), (req, res, next) => {
  // avatar, userId
  res.send();
});

server.post(
  "/upload-compressed",
  upload.single("file"),
  compressImage(),
  (req, res, next) => {
    res.send();
  }
);

function compressImage() {
  return async (req, res, next) => {
    // 1. get file from draft +
    // 2. compress image +
    // 3. save compressed image into static folder +
    // 4. modify info about saved file path +
    // 5. delete file from draft folder
    const DESTINATION = "static";

    const uncompressedFilePath = req.file.path;
    const file = await Jimp.read(uncompressedFilePath);
    const compressedFilePath = path.join(DESTINATION, req.file.filename);

    await file.resize(200, 200).writeAsync(compressedFilePath);

    req.file.path = compressedFilePath;
    req.file.destination = DESTINATION;

    await fs.unlink(uncompressedFilePath);

    next();
  };
}

server.listen(PORT, () => {
  console.log("Server started listening on port", PORT);
});
