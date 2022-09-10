import express from "express";
import mongoose from "mongoose";
import { HttpError } from "http-errors";
import { conf } from "./config";
import { authController } from "./resources/auth/auth.controller";

export class AuthServer {
  private app = express();
  private config = conf;

  async start() {
    await this.initDatabase();
    this.initMiddlewares();
    this.initRoutes();
    this.initErrorHandling();
    this.startListening();
  }

  async startForTests() {
    await this.initDatabase();
    this.initMiddlewares();
    this.initRoutes();
    this.initErrorHandling();
  }

  private async initDatabase() {
    try {
      await mongoose.connect(this.config.dbUrl);

      console.log("Successfully connected to DB");
    } catch (err) {
      console.log("Database error", err);
      process.exit(1);
    }
  }

  private initMiddlewares() {
    this.app.use(express.json());
  }

  private initRoutes() {
    this.app.use("/api/v1/auth", authController);
  }

  private initErrorHandling() {
    this.app.use(
      (
        err: HttpError,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        const statusCode = err.status || 500;
        res.status(statusCode).send(err.message);
      }
    );
  }

  private startListening() {
    this.app.listen(this.config.port, () => {
      console.log("Server started listening on port", this.config.port);
    });
  }
}
