const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const express = require("express");
const { usersRouter } = require("./users/users.router");

exports.CRUDServer = class CRUDServer {
  constructor() {
    this.app = null;
  }

  start() {
    this.initServer();
    this.initMiddlewares();
    // this.initDbConnection();
    this.initRoutes();
    this.initErrorHandling();
    this.startListening();
  }

  initServer() {
    this.app = express();
  }

  initMiddlewares() {
    this.app.use(express.json());
  }

  initRoutes() {
    this.app.use("/users", usersRouter);
  }

  initErrorHandling() {
    this.app.use((err, req, res, next) => {
      const status = err.status || 500;

      return res.status(status).send(err.message);
    });
  }

  startListening() {
    this.app.listen(process.env.PORT, () => {
      console.log("Started listening on port", process.env.PORT);
    });
  }
};
