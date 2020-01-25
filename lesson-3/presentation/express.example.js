const express = require("express");

const app = express();

app.get(
  "/hello",
  (req, res, next) => {
    // const err = new Error("fsdfsad");
    // err.status = 403;
    req.user = { name: "Hello" };
    next();
    // return res.send({ hello: "world" });
  },
  (req, res, next) => {
    console.log("handler 2");
    res.send(req.user);
    return;
  },
  () => {
    console.log("handler 3");
  },
  (err, req, res, next) => {
    console.log("error handled");
    delete err.stack;
    next(err);
  }
);

app.listen(3000, () => {
  console.log("Server started listening");
});
