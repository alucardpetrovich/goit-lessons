const express = require("express");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log("hello world");
  next(new Error("hello"));
});

app.get("/hello", (req, res, next) => {
  res.send("world");
});

app.use((err, req, res, next) => {
  console.log(err);
  delete err.stack;
  res.status(500).send(err.message);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("server started listening on port", PORT);
});
