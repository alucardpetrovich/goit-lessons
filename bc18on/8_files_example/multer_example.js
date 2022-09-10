const express = require("express");
const multer = require("multer");
const { extname, join } = require("path");
const uuid = require("uuid");
const Jimp = require("jimp");
const fs = require("fs/promises");

const DRAFT_PATH = "draft";
const UPLOADS_PATH = "uploads";

const storage = multer.diskStorage({
  destination: DRAFT_PATH,
  filename: function (req, file, cb) {
    const ext = extname(file.originalname);
    return cb(null, uuid.v4() + ext);
  },
});
const upload = multer({ storage });

const app = express();

app.use("/files", express.static(UPLOADS_PATH));

app.post(
  "/upload",
  upload.single("avatar"),
  compressImage,
  (req, res, next) => {
    res.send("success");
  }
);

async function compressImage(req, res, next) {
  // 1. save files to draft folder
  // 2. compress file
  // 3. save compressed file to uploads folder
  // 4. change file.path & file.destination to target compressed version
  // 5. delete image from draft folder
  // 6. call next
  const draftPath = req.file.path;
  const file = await Jimp.read(draftPath);

  const newPath = join(UPLOADS_PATH, req.file.filename);
  await file.resize(256, 256).quality(60).writeAsync(newPath);

  req.file.path = newPath;
  req.file.destination = UPLOADS_PATH;

  await fs.unlink(draftPath);

  next();
}

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server started listening on port", PORT);
});
