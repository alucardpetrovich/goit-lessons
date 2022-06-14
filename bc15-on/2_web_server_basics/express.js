const express = require("express");

const app = express();

app.use(express.json());

app.post(
  "/hello",
  (req, res, next) => {
    req.token = "iam_jwt_token";
    next();
  },
  (req, res, next) => {
    console.log("req.body", req.body);
    console.log("req.token", req.token);
    next(new Error("I was trying to say hello"));
  },
  (req, res) => {
    res.status(201).send({ hello: "hello world" });
  }
);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).send(err.message);
});

const PORT = 3005;
app.listen(PORT, () => {
  console.log("Server started listening on port", PORT);
});
