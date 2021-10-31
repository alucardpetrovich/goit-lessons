const express = require("express");
const multer = require("multer");
const path = require("path");
const Jimp = require("jimp");
const { BadRequest } = require("http-errors");
const FsPromises = require("fs").promises;

const STATIC_DIR = path.join(__dirname, "uploads");
const DRAFT_DIR = path.join(__dirname, "drafts");

const storage = multer.diskStorage({
  destination: DRAFT_DIR,
  filename: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new BadRequest("Only images allowed"));
    }

    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});
const upload = multer({ storage });

const app = express();
app.use("/static", express.static(STATIC_DIR));

app.post(
  "/upload-avatar",
  upload.single("avatar"),
  compressImage,
  (req, res, next) => {
    console.log("req.file", req.file);
    console.log("req.files", req.files);
    console.log("req.body", req.body);

    res.status(204).send();
  }
);

async function compressImage(req, res, next) {
  const draftFilePath = req.file.path;

  const file = await Jimp.read(draftFilePath);
  const compressedPath = path.join(STATIC_DIR, req.file.filename);

  await file.quality(60).writeAsync(compressedPath);

  await FsPromises.unlink(draftFilePath);

  req.file.destination = STATIC_DIR;
  req.file.path = compressedPath;

  next();
}

app.listen(3000, () => {
  console.log("Server started");
});
