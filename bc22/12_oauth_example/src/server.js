const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const { authRouter } = require("./auth/auth.router");
const { usersRouter } = require("./users/users.router");
const {
  initGoogleOauthStrategy,
} = require("./auth/strategies/google.strategy");
const { UserModel } = require("./users/user.model");

module.exports = class AuthServer {
  constructor() {
    this.app = null;
  }

  async start() {
    this.initServer();
    await this.initDatabase();
    this.initMiddlewares();
    this.initRoutes();
    this.initErrorHandling();
    this.startListening();
  }

  initServer() {
    this.app = express();
  }

  async initDatabase() {
    try {
      mongoose.set("useCreateIndex", true);
      await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
      });
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
  }

  async initMiddlewares() {
    this.app.use(express.json());
    this.app.use(cookieParser());
    passport.serializeUser((user, done) => {
      done(null, user._id);
    });
    passport.deserializeUser(async (id, done) => {
      const user = await UserModel.findById(id);
      if (!user) {
        done(new Error("User not authorized"));
      }

      done(null, user);
    });
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    initGoogleOauthStrategy();
  }

  initRoutes() {
    this.app.use("/auth", authRouter);
    this.app.use("/users", usersRouter);
  }

  initErrorHandling() {
    this.app.use((err, req, res, next) => {
      const statusCode = err.status || 500;

      // DO NOT DO THIS !!!!!!!!
      // res.status(statusCode).send(err);
      // err = { message, name, stack }

      res.status(statusCode).send({
        status: statusCode,
        message: err.message,
      });
    });
  }

  startListening() {
    this.app.listen(process.env.PORT, () => {
      console.log("Server started listening on port", process.env.PORT);
    });
  }
};
