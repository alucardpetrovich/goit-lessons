const express = require("express");

const server = express();

server.use("/", (req, res, next) => {
  console.log("world");
  next();
});

server.get(
  "/",
  (req, res, next) => {
    // console.dir(res);
    // res.end({ hello: "hello" });
    // res.send({ hello: "hello" });
    // res.send("Hello");
    // next();
    next(new Error("message"));
  },
  (req, res, next) => {
    res.send("hello");
  }
);

server.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).send(err.message);
});

server.listen(3000, () => {
  console.log("Server started");
});
