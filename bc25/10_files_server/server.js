const express = require("express");
const multer = require("multer");
const { extname, join } = require("path");
const FsPromises = require("fs").promises;
const Jimp = require("jimp");

const STATIC_FILES_DIR = join(__dirname, "static");
const ORIGINAL_FILES_DIR = join(__dirname, "tmp-images");

const diskStorage = multer.diskStorage({
  destination: ORIGINAL_FILES_DIR,
  filename: (req, file, cb) => {
    const ext = extname(file.originalname);
    const fileName = Date.now() + ext;
    cb(null, fileName);
  },
});
const upload = multer({ storage: diskStorage });

const app = express();
app.use("/static", express.static(STATIC_FILES_DIR));

app.post("/upload", upload.single("file"), (req, res, next) => {
  console.log("req.file", req.file);
  console.log("req.files", req.files);
  console.log("req.body", req.body);

  res.send();
});

app.post(
  "/upload-compressed",
  upload.single("file"),
  compressImage,
  (req, res) => {
    // 1. receive image and save to tmp-images folder +
    // 2. compress image with jimp +
    // 3. save compressed image to static folder +
    // 4. change req.file/req.files data to point to compressed image +
    // 5. delete unoptimized image from tmp-images folder +

    console.log("req.file", req.file);
    res.send();
  }
);

async function compressImage(req, res, next) {
  const file = req.file;
  if (!file) {
    return next(new Error("No file detected"));
  }
  const originalFilePath = req.file.path;

  try {
    const image = await Jimp.read(file.path);

    const filePath = join(STATIC_FILES_DIR, file.filename);
    await image.resize(256, 256).quality(60).write(filePath);

    req.file.destination = req.file.destination.replace(
      ORIGINAL_FILES_DIR,
      STATIC_FILES_DIR
    );
    req.file.path = req.file.path.replace(ORIGINAL_FILES_DIR, STATIC_FILES_DIR);

    await FsPromises.unlink(originalFilePath);
    next();
  } catch (err) {
    next(err);
    await FsPromises.unlink(originalFilePath);
  }
}

app.listen(3000, () => {
  console.log("Server started listening");
});
