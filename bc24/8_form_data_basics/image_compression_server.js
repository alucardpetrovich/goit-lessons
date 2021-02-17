import express from "express";
import multer from "multer";
import path from "path";
import Jimp from "jimp";
import fs from "fs";
import { getPaths } from "./utils.js";

// 1. Multer saves file into /draft folder
// 2. Use Jimp for image compression and save image in /static file

const PORT = 3000;
const { __dirname } = getPaths(import.meta.url);
const DRAFT_DIR = path.join(__dirname, "draft");
const COMPRESSED_DIR = path.join(__dirname, "static");

// cwd/pwd vs __dirname

const app = express();
const storage = multer.diskStorage({
  destination: DRAFT_DIR,
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});
const upload = multer({ storage });

app.use("/static", express.static(COMPRESSED_DIR));

app.post("/sign-up", upload.single("avatar"), compressAvatar, (req, res) => {
  console.log("req.file", req.file);
  console.log("req.body", req.body);

  res.send({
    id: Date.now(),
    ...req.body,
    avatarUrl: `http://localhost:3000/static/${req.file.filename}`,
  });
});

async function compressAvatar(req, res, next) {
  try {
    // 1. compress image with jimp +
    // 2. save compressed image +
    // 3. delete origin image +
    // 4. update destination & path in req.file
    const { path: filePath, filename } = req.file;
    const image = await Jimp.read(filePath);

    const compressedImagePath = path.join(COMPRESSED_DIR, filename);

    await image.resize(200, 200).quality(70).writeAsync(compressedImagePath);

    await fs.promises.unlink(filePath);

    req.file.destination = COMPRESSED_DIR;
    req.file.path = compressedImagePath;

    next();
  } catch (err) {
    next(err);
  }
}

app.listen(PORT, () => {
  console.log("Server started listening on port", PORT);
});
