const express = require("express");
const UserController = require('.')

const userRouter = express.Router();

userRouter.get("/", (req, res, next) => {
  res.send("hello world");
});

console.log("userRouter", userRouter);

module.exports = userRouter;
