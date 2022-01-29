const express = require("express");
const PORT = 3000;

const app = express();

app.use(express.json());

app.get(
  "/hello",
  (req, res, next) => {
    // res.send("hello world");
    console.log("hello");
    next(new Error("something wrong"));
  },
  (req, res, next) => {
    res.send("hello world");
  }
);

app.post("/hello", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

app.use((err, req, res, next) => {
  delete err.stack;
  next(err);
});

app.listen(PORT, () => {
  console.log("Server started listening on port", PORT);
});
