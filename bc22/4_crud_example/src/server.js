const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const express = require("express");
const { usersRouter } = require("./users/users.router");

class CrudServer {
  constructor() {
    this.app = null;
  }

  start() {
    this.initServer();
    // this.initDatabase();
    this.initMiddlewares();
    this.initRouters();
    this.initErrorHandling();
    this.startListening();
  }

  initServer() {
    this.app = express();
  }

  initMiddlewares() {
    this.app.use(express.json());
  }

  initRouters() {
    this.app.use('/users', usersRouter);
  }

  initErrorHandling() {
    this.app.use((err, req, res, next) => {
      const statusCode = err.status || 500;
      return res.status(statusCode).send(err.message);
    });
  }

  startListening() {
    this.app.listen(process.env.PORT, () => {
      console.log("Server started listening on port", process.env.PORT);
    });
  }
}

exports.CrudServer = CrudServer;
exports.crudServer = new CrudServer();
