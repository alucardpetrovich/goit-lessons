require("./config");
const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const { authRouter } = require("./auth/auth.router");

module.exports = class AuthServer {
  constructor() {
    this.app = null;
  }

  async start() {
    this.initServer();
    await this.initDatabaseConnection();
    this.initMiddlewares();
    this.initRoutes();
    this.initErrorHandling();
    this.startListening();
  }

  initServer() {
    this.app = express();
  }

  async initDatabaseConnection() {
    mongoose.set("useCreateIndex", true);
    try {
      await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
      });

      console.log("Connected to database");
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
  }

  initMiddlewares() {
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(cors({ origin: "http://localhost:3000" }));
  }

  initRoutes() {
    this.app.use("/auth", authRouter);
  }

  initErrorHandling() {
    this.app.use((err, req, res, next) => {
      const statusCode = err.status || 500;
      return res.status(statusCode).send(err.message);
    });
  }

  startListening() {
    const { PORT } = process.env;

    this.app.listen(PORT, () => {
      console.log("Server started listening on port", PORT);
    });
  }
};
