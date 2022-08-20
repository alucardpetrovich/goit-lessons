import * as express from "express";
import * as cors from "cors";
import * as morgan from "morgan";
import * as mongoose from "mongoose";
import { HttpError } from "http-errors";
import { conf } from "./config";
import { usersRouter } from "./resources/users/users.controller";

const app = express();

export class UsersServer {
  private app = express();
  private config = conf;

  public async start() {
    await this.initDatabase();
    this.initMiddlewares();
    this.initRoutes();
    this.initErrorHandling();
    this.startListening();
  }

  private async initDatabase() {
    try {
      await mongoose.connect(this.config.dbUrl);

      console.log("Successfully connected to Database");
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
  }

  private initMiddlewares() {
    this.app.use(express.json());
    this.app.use(cors({ origin: this.config.allowedOrigin }));
    this.app.use(morgan("combined"));
  }

  private initRoutes() {
    this.app.use("/api/v1/users", usersRouter);
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
      console.log("Server started on port", this.config.port);
    });
  }
}
