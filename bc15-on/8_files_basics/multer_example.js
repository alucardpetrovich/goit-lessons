const express = require("express");
const multer = require("multer");
const path = require("path");
const uuid = require("uuid");
const sharp = require("sharp");

const fs = require("fs").promises;

const draftsDir = path.join(__dirname, "draft");
const uploadsDir = path.join(__dirname, "uploads");
const storage = multer.diskStorage({
  destination: draftsDir,
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${uuid.v1()}${ext}`);
  },
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

const app = express();
app.use("/files", express.static(uploadsDir));

app.post("/upload", upload.single("file"), compressImage, (req, res, next) => {
  res.status(200).send();
});

async function compressImage(req, res, next) {
  // 1. compressed images - uploads, original - draft +
  // 2. compress image from draft with Jimp +
  // 3. save compressed image to uploads folder +
  // 4. delete original image from draft +
  // 5. change destination & path props of req.file +
  // 6. call next +
  const newDestination = uploadsDir;
  const newPath = path.join(newDestination, req.file.filename);

  // const originalFile = await Jimp.read(req.file.path);
  // await originalFile.resize(250, 250).quality(70).writeAsync(newPath);

  await sharp(req.file.path).resize(250).jpeg({ quality: 70 }).toFile(newPath);

  await fs.unlink(req.file.path);

  req.file.destination = newDestination;
  req.file.path = newPath;

  next();
}

app.listen(3000, () => {
  console.log("Server started listening");
});
