const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { authRouter } = require("./auth/auth.router");
const { usersRouter } = require("./users/user.router");

module.exports = class AuthServer {
  async start() {
    this.initServer();
    await this.initDbConnection();
    this.initMiddlewares();
    this.initRoutes();
    this.initErrorHandling();
    this.startListening();
  }

  async startForTest() {
    this.initServer();
    await this.initDbConnection();
    this.initMiddlewares();
    this.initRoutes();
    this.initErrorHandling();

    return this;
  }

  initServer() {
    this.app = express();
  }

  async initDbConnection() {
    mongoose.set("useCreateIndex", true);
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    });
  }

  initMiddlewares() {
    this.app.use(express.json());
    this.app.use(cookieParser());
  }

  initRoutes() {
    this.app.use("/auth", authRouter);
    this.app.use("/users", usersRouter);
  }

  initErrorHandling() {
    this.app.use((err, req, res, next) => {
      console.log(err);
      const statusCode = err.status || 500;
      res.status(statusCode).send(err.message);
    });
  }

  startListening() {
    const { PORT } = process.env;

    this.app.listen(PORT, () => {
      console.log("Started listening on port", PORT);
    });
  }
};
