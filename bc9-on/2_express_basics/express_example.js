const express = require("express");

const app = express();

app.use(express.json());

app.get(
  "/hello/:whom",
  (req, res, next) => {
    // const err = new Error("client error");
    // err.status = 400;
    next();
  },
  (req, res, next) => {
    // res.send({ hello: "world" });
    console.log("req.body", req.body);
    req.smth = "hello world";

    console.log("first middleware");
    next();
  },
  (req, res, next) => {
    console.log("req.query", req.query);

    console.log("second middleware");
    console.log("req.smth", req.smth);
    res.send({ hello: req.params.whom });
  }
);

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).send(err.message);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server started listening on port", PORT);
});
