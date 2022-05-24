const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, ".env") });

const { PORT } = process.env;

const app = express();

app.get("/hello", (req, res, next) => {
  console.log("hello");
  res.send("world");
});

app.listen(PORT, () => {
  console.log("Server started listening on port", PORT);
});
