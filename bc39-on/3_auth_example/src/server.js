const express = require("express");
const { getConfig } = require("./config");
const mongoose = require("mongoose");
const morgan = require("morgan");
const { authController } = require("./modules/auth/auth.controller");
const { connectToRedis } = require("./shared/redis-client");

exports.AuthServer = class {
  #app;
  #config;

  async start() {
    this.#initServer();
    this.#initConfig();
    await this.#initDatabases();
    this.#initMiddlewares();
    this.#initRoutes();
    this.#initErrorHandling();
    this.#startListening();
  }

  async startForTest() {
    this.#initServer();
    this.#initConfig();
    await this.#initDatabases();
    this.#initMiddlewares();
    this.#initRoutes();
    this.#initErrorHandling();
  }

  getApp() {
    return this.#app;
  }

  #initServer() {
    this.#app = express();
  }

  #initConfig() {
    this.#config = getConfig();
  }

  async #initDatabases() {
    try {
      await mongoose.connect(this.#config.db.url);
      await connectToRedis();
    } catch (err) {
      console.log("Error during database connection", err);
      process.exit(1);
    }
  }

  #initMiddlewares() {
    this.#app.use(express.json({ limit: "5mb" }));
    this.#app.use(morgan("common"));
  }

  #initRoutes() {
    this.#app.use("/api/auth", authController);
  }

  #initErrorHandling() {
    this.#app.use((err, req, res, next) => {
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
    this.#app.listen(this.#config.port, () => {
      console.log("Server started listening on port", this.#config.port);
    });
  }
};
