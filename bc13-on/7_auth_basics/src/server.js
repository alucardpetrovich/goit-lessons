const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const morgan = require("morgan");
const mongoose = require("mongoose");
const http = require("http");
const { getConfig } = require("./config");
const { authRouter } = require("./resources/auth/auth.controller");
const { usersRouter } = require("./resources/users/users.controller");

class AuthServer {
  #app;
  #config;
  #server;

  async start(isTest = false) {
    this.#initServer();
    this.#initConfig();
    await this.#initDatabase();
    this.#initMiddlewares();
    this.#initRoutes();
    this.#initErrorHandling();
    if (!isTest) {
      this.#startListening();
    }
  }

  close() {
    this.#server.close();
  }

  getApp() {
    return this.#app;
  }

  #initServer() {
    this.#app = express();
    this.#server = http.createServer(this.#app);
  }

  #initConfig() {
    const envPath = path.join(__dirname, "../.env");
    dotenv.config({ path: envPath });
    this.#config = getConfig();
  }

  async #initDatabase() {
    try {
      await mongoose.connect(this.#config.database.url);
      console.log("Successfully connected to DB");
    } catch (err) {
      console.log("Database connection error", err);
      process.exit(1);
    }
  }

  #initMiddlewares() {
    this.#app.use(express.json());
    this.#app.use(morgan("combined"));
  }

  #initRoutes() {
    this.#app.use("/api/v1/auth", authRouter);
    this.#app.use("/api/v1/users", usersRouter);
  }

  #initErrorHandling() {
    this.#app.use((err, req, res, next) => {
      const statusCode = err.status || 500;

      if (statusCode >= 500) {
        console.log(err);
      }

      res.status(statusCode).send(err.message);
    });
  }

  #startListening() {
    this.#app.listen(this.#config.port, () => {
      console.log("Server started listening on port", this.#config.port);
    });
  }
}

module.exports.AuthServer = AuthServer;
