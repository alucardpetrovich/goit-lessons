const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const express = require("express");
const mongoose = require("mongoose");
const socketIO = require("socket.io");
const http = require("http");
const jwt = require("jsonwebtoken");
const userRouter = require("./users/user.router");
const filmRouter = require("./films/films.router");
const authRouter = require("./auth/auth.router");

// 1. create server
// 2. init global middlewares
// 3. init routes
// 4. init db
// 5. start listening

module.exports = class UserServer {
  constructor() {
    this.server = null;
    this.httpServer = null;
    this.io = null;
    this.socketsByIds = {};
  }

  async start() {
    this.initServer();
    this.initMiddlewares();
    this.initRoutes();
    this.initWsHandlers();
    await this.initDatabase();
    return this.startListening();
  }

  initServer() {
    this.server = express();
    this.httpServer = http.createServer(this.server);
    this.io = socketIO(this.httpServer);
  }

  initMiddlewares() {
    this.server.use(express.urlencoded());
    this.server.use(express.json());
    this.server.use(express.static(path.join(__dirname, "static")));
  }

  initRoutes() {
    this.server.use("/auth", authRouter);
    this.server.use("/users", userRouter);
    this.server.use("/films", filmRouter);
  }

  initWsHandlers() {
    this.io.on("connection", (socket) => {
      console.log("connection received");
      socket.on("join", (token) => {
        console.log("token :>> ", token);

        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        this.socketsByIds[id] = socket;
      });
      socket.on("chat message", (data) => {
        if (data.to) {
          const socketRecepient = this.socketsByIds[data.to];
          if (!socketRecepient) {
            return socket.emit("errorMessage", {
              message: "user does not exist or does not connected to server",
            });
          }
          return socketRecepient.emit("chat message", data.message);
        }
        this.io.emit("chat message", data.message);
      });
    });
  }

  async initDatabase() {
    await mongoose.connect(process.env.MONGODB_URL);
  }

  startListening() {
    const PORT = process.env.PORT;

    return this.httpServer.listen(PORT, () => {
      console.log("Server listening on port", PORT);
    });
  }
};
