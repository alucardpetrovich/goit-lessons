import express, { NextFunction, Request, Response } from "express";
import multer from "multer";
import { extname, join } from "path";
import * as uuid from "uuid";
import Jimp from "jimp";
import { promises as FsPromises } from "fs";

// 1. save unprocessed images in draft folder
// 2. resize img with jimp
// 3. save resized img in static folder
// 4. change path and destination in req.file
// 5. delete img from draft folder
// 6. pass execution to next middleware with next();

const STATIC_FOLDER_DEST = "static";

const storage = multer.diskStorage({
  destination: "draft",
  filename: (req, file, cb) => {
    const ext = extname(file.originalname);
    cb(null, uuid.v4() + ext);
  },
});
const upload = multer({ storage });

const app = express();

app.use("/static", express.static(STATIC_FOLDER_DEST));

app.put(
  "/upload-avatar",
  upload.single("avatar"),
  compressImage,
  (req, res, next) => {
    res.send("file received");
  }
);

async function compressImage(req: Request, res: Response, next: NextFunction) {
  const file = req.file as Express.Multer.File;
  const { path, filename } = file;

  const compressedFilePath = join(STATIC_FOLDER_DEST, filename);

  const img = await Jimp.read(path);
  await img.resize(255, 255).quality(60).writeAsync(compressedFilePath);

  file.destination = STATIC_FOLDER_DEST;
  file.path = compressedFilePath;

  await FsPromises.unlink(path);

  next();
}

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
