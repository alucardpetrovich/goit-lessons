const dotenv = require("dotenv");
const path = require("path");
const express = require("express");
const multer = require("multer");
const uuid = require("uuid");

// const upload = multer({ dest: "static" });
const upload = multer({
  storage: multer.diskStorage({
    destination: "static",
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);

      return cb(null, `${uuid.v4()}${ext}`);
    },
  }),
});
dotenv.config({ path: path.resolve(__dirname, ".env") });

const app = express();

app.use("/static", express.static("static"));

app.post("/upload", upload.single("file"), (req, res, next) => {
  res.send();
});

app.listen(process.env.PORT, () => {
  console.log("Server started listening on port", process.env.PORT);
});
