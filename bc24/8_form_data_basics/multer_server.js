// 1. Send req from client with text fields and files
// 2. Server receive req and saves files in memory
// 3. create entities in DB
// 4. send client successful response
import express from "express";
import multer from "multer";
import path from "path";

const PORT = 3000;

const app = express();
const storage = multer.diskStorage({
  destination: "upload",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});
const upload = multer({ storage });

app.use("/static", express.static("upload"));

app.post("/sign-up", upload.single("avatar"), (req, res) => {
  console.log("req.file", req.file);
  console.log("req.body", req.body);

  res.send({
    id: Date.now(),
    ...req.body,
    avatarUrl: `http://localhost:3000/static/${req.file.filename}`,
  });
});

app.listen(PORT, () => {
  console.log("Server started listening on port", PORT);
});
