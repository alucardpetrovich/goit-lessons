const express = require("express");
const multer = require("multer");
const uuid = require("uuid");
const { extname } = require("path");
const Jimp = require("jimp");
const { promises: FsPromises } = require("fs");

const TMP_FILES_DIR_NAME = "draft";
const FILES_DIR_NAME = "static";

const upload = multer({
  storage: multer.diskStorage({
    destination: TMP_FILES_DIR_NAME,
    filename: (req, file, cb) => {
      const filename = uuid.v4() + extname(file.originalname);
      cb(null, filename);
    },
  }),
});

const app = express();
app.use("/static", express.static("static"));

app.post(
  "/avatars",
  upload.single("avatar"),
  compressImage,
  (req, res, next) => {
    console.log("req.file", req.file);
    console.log("req.body", req.body);
    res.send();
  }
);

async function compressImage(req, res, next) {
  const file = await Jimp.read(req.file.path);
  const filePath = req.file.path.replace(TMP_FILES_DIR_NAME, FILES_DIR_NAME);

  await file.resize(250, 500).quality(70).writeAsync(filePath);

  await FsPromises.unlink(req.file.path);

  req.file.destination = req.file.destination.replace(
    TMP_FILES_DIR_NAME,
    FILES_DIR_NAME
  );
  req.file.path = filePath;

  next();
}

app.listen(3000, () => {
  console.log("server started");
});
