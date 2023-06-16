const express = require("express");
const { getConfig } = require("./config");
const mongoose = require("mongoose");
const morgan = require("morgan");
const { usersController } = require("./modules/users/users.controller");

exports.UsersServer = class {
  #server;
  #config;

  async start() {
    this.#initServer();
    this.#initConfig();
    await this.#initDatabase();
    this.#initMiddlewares();
    this.#initRoutes();
    this.#initErrorHandling();
    this.#startListening();
  }

  #initServer() {
    this.#server = express();
  }

  #initConfig() {
    this.#config = getConfig();
  }

  async #initDatabase() {
    try {
      await mongoose.connect(this.#config.db.url);
    } catch (err) {
      console.log("Error during database connection", err);
      process.exit(1);
    }
  }

  #initMiddlewares() {
    this.#server.use(express.json({ limit: "5mb" }));
    this.#server.use(morgan("common"));
  }

  #initRoutes() {
    this.#server.use("/api/users", usersController);
  }

  #initErrorHandling() {
    this.#server.use((err, req, res, next) => {
      const statusCode = err.status || 500;
      if (statusCode === 500) {
        console.log(err);
      }

      res.status(statusCode).send({
        status: statusCode,
        message: err.message,
      });
    });
  }

  #startListening() {
    this.#server.listen(this.#config.port, () => {
      console.log("Server started listening on port", this.#config.port);
    });
  }
};