import express from "express";
import cookieParser from "cookie-parser";
import { userRouter } from "./users/user.router";
import mongoose from "mongoose";

export class RegisterServer {
  constructor() {
    this.server = null;
  }

  async start() {
    this.initServer();
    this.initMiddlewares();
    await this.initDatabase();
    this.initRoutes();
    this.initErrorHandling();
    this.startListening();
  }

  initServer() {
    this.server = express();
  }

  initMiddlewares() {
    this.server.set("view engine", "hbs");
    this.server.use(express.static(process.env.STATIC_FILES_PATH));
    this.server.use(cookieParser());
  }

  initRoutes() {
    this.server.use("/users", userRouter);
  }

  async initDatabase() {
    try {
      await mongoose.connect(process.env.MONGODB_URL);
    } catch (err) {
      console.log("Failed to connect to database");
      process.exit(1);
    }
  }

  initErrorHandling() {
    this.server.use((err, req, res, next) => {
      const statusCode = err.status || 500;
      return res.status(statusCode).send(err.message);
    });
  }

  startListening() {
    const PORT = process.env.PORT;
    this.server.listen(PORT, () => {
      console.log("Server started listening on port", PORT);
    });
  }
}
