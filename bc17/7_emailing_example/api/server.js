const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./users/user.router");
const filmRouter = require("./films/films.router");
const authRouter = require("./auth/auth.router");

// 1. create server
// 2. init global middlewares
// 3. init routes
// 4. init db
// 5. start listening
mongoose.set("debug", true);

module.exports = class UserServer {
  constructor() {
    this.server = null;
  }

  async start() {
    this.initServer();
    this.initMiddlewares();
    this.initRoutes();
    await this.initDatabase();
    return this.startListening();
  }

  initServer() {
    this.server = express();
  }

  initMiddlewares() {
    this.server.use(express.urlencoded());
    this.server.use(express.json());
  }

  initRoutes() {
    this.server.use("/auth", authRouter);
    this.server.use("/users", userRouter);
    this.server.use("/films", filmRouter);
  }

  async initDatabase() {
    await mongoose.connect(process.env.MONGODB_URL);
  }

  startListening() {
    const PORT = process.env.PORT;

    return this.server.listen(PORT, () => {
      console.log("Server listening on port", PORT);
    });
  }
};
