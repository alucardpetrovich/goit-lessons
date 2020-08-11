const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname, "../.env") });

const express = require("express");
const mongoose = require("mongoose");
const { authRouter } = require("./auth/auth.router");

exports.AuthServer = class {
  constructor() {
    this.app = null;
  }

  async start() {
    this.initApp();
    await this.initDdConnection();
    this.initMiddlwares();
    this.initRoutes();
    this.initErrorHandler();
    this.startListening();
  }

  initApp() {
    this.app = express();
  }

  async initDdConnection() {
    await mongoose.connect(process.env.MONGODB_URL);
  }

  initMiddlwares() {
    this.app.use(express.json());
  }

  initRoutes() {
    this.app.use("/api/auth", authRouter);
  }

  initErrorHandler() {
    this.app.use((err, req, res, next) => {
      const statusCode = err.status || 500;
      return res.status(statusCode).send(err.message);
    });
  }

  startListening() {
    this.app.listen(3000, () => {
      console.log("Server started listening connections");
    });
  }
};
