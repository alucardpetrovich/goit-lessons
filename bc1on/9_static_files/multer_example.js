const express = require("express");
const multer = require("multer");
const path = require("path");
const { promises: fsPromises } = require("fs");
const imagemin = require("imagemin");
const imageminJpegtran = require("imagemin-jpegtran");
const imageminPngquant = require("imagemin-pngquant");

const DRAFT_FILES_PATH = path.join(__dirname, "draft");
const STATIC_FILES_PATH = path.join(__dirname, "static");

const storage = multer.diskStorage({
  destination: DRAFT_FILES_PATH,
  filename: (req, file, cb) => {
    const { ext } = path.parse(file.originalname);
    cb(null, Date.now() + ext);
  },
});
const upload = multer({ storage });

const app = express();
app.use("/static", express.static(STATIC_FILES_PATH));

app.post(
  "/upload-avatar",
  upload.single("avatar"),
  compressAvatar,
  (req, res, next) => {
    console.log("req.file", req.file);
    console.log("req.body", req.body);

    res.send();
  }
);

app.listen(3000, () => {
  console.log("Server started listening on port", 3000);
});

async function compressAvatar(req, res, next) {
  // 1. multer saves image to /draft folder +
  // 2. compress image with imagemin and save in /static folder +
  // 3. set new destination & path in req.file +
  // 4. remove uncompressed multer file +
  // 5. call next +
  const { destination, filename, path: filePath } = req.file;
  const oldPath = filePath;

  await imagemin([`${destination}/${filename}`], {
    destination: STATIC_FILES_PATH,
    plugins: [
      imageminJpegtran(),
      imageminPngquant({
        quality: [0.6, 0.8],
      }),
    ],
  });

  req.file.destination = STATIC_FILES_PATH;
  req.file.path = path.join(STATIC_FILES_PATH, filename);

  await fsPromises.unlink(oldPath);

  next();
}
