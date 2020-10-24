const express = require("express");
const multer = require("multer");
const imagemin = require("imagemin");
const imageminJpegtran = require("imagemin-jpegtran");
const imageminPngquant = require("imagemin-pngquant");
const path = require("path");
const { promises: fsPromises } = require("fs");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "tmp"),
  filename: (req, file, cb) => {
    const { originalname } = file;
    const { ext } = path.parse(originalname);

    return cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage });

// upload.array("gallery", 5);
// upload.fields([
//   { name: "avatar", maxCount: 1 },
//   { name: "gallery", maxCount: 5 },
// ]);

const server = express();

server.use(express.static("uploads"));

server.post(
  "/sign-up",
  upload.single("avatar"),
  compressImages,
  (req, res, next) => {
    console.log("req.file", req.file);
    console.log("req.files", req.files);
    console.log("req.body", req.body);

    res.send({ localPath: req.file.path });
  }
);

async function compressImages(req, res, next) {
  const normalizedPath = normalizeImageminPath(req.file.path);
  const COMPRESSED_IMAGES_DIR = normalizeImageminPath(
    path.join(__dirname, "uploads")
  );

  await imagemin([normalizedPath], {
    destination: COMPRESSED_IMAGES_DIR,
    plugins: [
      imageminJpegtran(),
      imageminPngquant({
        quality: [0.6, 0.8],
      }),
    ],
  });

  await fsPromises.unlink(req.file.path);

  req.file.destination = COMPRESSED_IMAGES_DIR;
  req.file.path = path.join(COMPRESSED_IMAGES_DIR, req.file.filename);

  next();
}

function normalizeImageminPath(path) {
  return path.replace(/\\/g, "/");
}

if (require.main === module) {
  server.listen(8080, () => {
    console.log("Server started listening");
  });
} else {
  module.exports.server = server;
}
