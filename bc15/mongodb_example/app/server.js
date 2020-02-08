const express = require("express");
const { port, mongodb_url } = require("./config");
const questionRouter = require("./question/question.router");
const mongoose = require("mongoose");

class QuestionServer {
  constructor() {
    this.server = null;
    this.routes = [];
  }

  async start() {
    this.initServer();
    await this.initDbConnection();
    this.initMiddlewares();
    this.initRoutes();
    this.serverListen();
  }

  initMiddlewares() {
    this.server.use(express.json());
  }

  initRoutes() {
    this.server.use("/questions", questionRouter);
    this.server.use((err, req, res, next) => {
      delete err.stack;
      next(err);
    });
  }

  initServer() {
    this.server = express();
  }

  async initDbConnection() {
    await mongoose.connect(mongodb_url);
  }

  serverListen() {
    this.server.listen(port, () => {
      console.log("Server started listening on port", port);
    });
  }
}

new QuestionServer().start();
