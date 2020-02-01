const express = require("express");
const { port } = require("./config");
const questionRouter = require("./question/question.router");

class QuestionServer {
  constructor() {
    this.server = null;
    this.routes = [];
  }

  start() {
    this.initServer();
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

  serverListen() {
    this.server.listen(port, () => {
      console.log("Server started listening on port", port);
    });
  }
}

new QuestionServer().start();
