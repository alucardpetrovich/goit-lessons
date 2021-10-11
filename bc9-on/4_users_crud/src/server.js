const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const morgan = require("morgan");
const { getConfig } = require("./config");
const { usersController } = require("./users/users.controller");

exports.UsersServer = class {
  async start() {
    this.initServer();
    this.initConfig();
    // this.initDatabase();
    this.initMiddlewares();
    this.initRoutes();
    this.initErrorHandling();
    this.startListening();
  }

  initServer() {
    this.server = express();
  }

  initConfig() {
    dotenv.config({ path: path.join(__dirname, "../.env") });
  }

  initMiddlewares() {
    this.server.use(express.json());
    this.server.use(morgan("tiny"));
  }

  initRoutes() {
    this.server.use("/users", usersController);
  }

  initErrorHandling() {
    this.server.use((err, req, res, next) => {
      const statusCode = err.status || 500;
      return res.status(statusCode).send({
        name: err.name,
        status: statusCode,
        message: err.message,
      });
    });
  }

  startListening() {
    const { api } = getConfig();

    this.server.listen(api.port, () => {
      console.log("Started listening on port", api.port);
    });
  }
};
