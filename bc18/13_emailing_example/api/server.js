import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.join(__dirname, "../.env") });
import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import morgan from "morgan";
import { authRouter } from "./auth/auth.router";

export default class AuthServer {
  constructor() {
    this.app = null;
    this.server = null;
  }

  async start() {
    this.initServer();
    this.initMiddleware();

    await this.initDatabase();
    this.initRoutes();
    this.initErrorHandler();
    this.startListening();
  }

  initServer() {
    this.app = express();
  }

  initMiddleware() {
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(
      morgan(":method :url :status :res[content-length] - :response-time ms")
    );
  }

  async initDatabase() {
    mongoose.set("useCreateIndex", true);
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    });
  }

  initRoutes() {
    this.app.use("/auth", authRouter);
  }

  initErrorHandler() {
    this.app.use((err, req, res, next) => {
      console.log(err);
      const statusCode = err.status || 500;
      return res.status(statusCode).send(err.message);
    });
  }

  startListening() {
    const PORT = process.env.PORT || "3000";
    this.server = this.app.listen(PORT, () => {
      console.log("Server started listening on port", PORT);
    });
  }
}
