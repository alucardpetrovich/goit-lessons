const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const { getConnection } = require("./db-connection");
const { getConfig } = require("./config");
const { authController } = require("./auth/auth.controller");
const { usersController } = require("./users/users.controller");

exports.AuthServer = class {
  async start() {
    this.initServer();
    this.initConfig();
    await this.initDatabase();
    this.initMiddlewares();
    this.initRoutes();
    this.initErrorHandling();
    this.startListening();
  }

  initServer() {
    this.app = express();
  }

  initConfig() {
    dotenv.config({ path: path.join(__dirname, "../.env") });
  }

  async initDatabase() {
    const connection = await getConnection();
    try {
      await connection.authenticate();
      console.log("Successfully connected to DB");
    } catch (err) {
      console.log("Database connection error", err);
      process.exit(1);
    }
  }

  initMiddlewares() {
    this.app.use(express.json());
    this.app.use(morgan("common"));
  }

  initRoutes() {
    this.app.use("/auth", authController);
    this.app.use("/users", usersController);
  }

  initErrorHandling() {
    this.app.use((err, req, res, next) => {
      const statusCode = err.status || 500;
      res.status(statusCode).send(err.message);
    });
  }

  startListening() {
    const { api } = getConfig();
    this.app.listen(api.port, () => {
      console.log("Started listening on port", api.port);
    });
  }
};
