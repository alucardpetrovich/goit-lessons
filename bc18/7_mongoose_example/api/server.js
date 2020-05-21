import express from "express";
import mongoose from "mongoose";
import usersRouter from "./users/user.router";

export default class Server {
  constructor() {
    this.app = null;
  }

  async start() {
    this.initServer();
    this.initMiddleware();
    await this.initDatabase();
    this.initRoutes();
    this.initErrorHandling();
    this.startListening();
  }

  initServer() {
    this.app = express();
  }

  initMiddleware() {
    this.app.use(express.json());
  }

  initRoutes() {
    this.app.use("/users", usersRouter);
  }

  async initDatabase() {
    mongoose.set("useCreateIndex", true);
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    });
  }

  initErrorHandling() {
    this.app.use((err, req, res, next) => {
      return res.status(err.status || 500).send(err.message);
    });
  }

  startListening() {
    const PORT = process.env.PORT;

    this.app.listen(PORT, () => {
      console.log("Server started listening on port", PORT);
    });
  }
};
