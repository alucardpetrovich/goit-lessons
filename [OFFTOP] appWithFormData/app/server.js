const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

const config = require("./config");
const authRouter = require("./auth/auth.router");

async function main() {
  const app = express();

  initMiddlewares(app);
  initRoutes(app);

  await mongoose.connect(config.mongodb_url);

  app.listen(config.port, () => {
    console.log("Server listening on port", config.port);
  });
}

function initMiddlewares(app) {
  app.use(bodyParser());
}

function initRoutes(app) {
  app.use("/auth", authRouter);

  app.use((err, req, res, next) => {
    delete err.stack;
    next(err);
  });
}

main();
