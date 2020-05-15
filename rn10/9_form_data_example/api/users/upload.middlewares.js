import multer from "multer";
import path from "path";
import imagemin from "imagemin";
import { promises as fsPromises } from "fs";
import imageminJpegtran from "imagemin-jpegtran";
import imageminPngquant from "imagemin-pngquant";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.UNCOMPRESSED_IMAGES_FOLDER);
  },
  filename: function (req, file, cb) {
    const { ext } = path.parse(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});

export async function compressImage(req, res, next) {
  const { path: uncompressedFilePath, filename } = req.file || {};
  if (!uncompressedFilePath) {
    next();
  }

  const COMPRESSING_DESTINATION = process.env.COMPRESSED_IMAGES_FOLDER;

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

export const upload = multer({ storage });
