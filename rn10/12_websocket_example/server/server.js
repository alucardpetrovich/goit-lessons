import http from "http";
import SocketIO from "socket.io";
import { JoinChatHandler } from "./handlers/joinChat";
import { SendMessageHandler } from "./handlers/sendMessage";

console.log(process.env);

export class WsServer {
  constructor() {
    this.server = null;
    this.io = null;
  }

  start() {
    this.initServer();
    this.initHandlers();
    this.startListening();
  }

  initServer() {
    this.server = http.createServer();
    this.io = SocketIO(this.server, {
      path: "/test",
      serveClient: false,

      pingInterval: 10000,
      pingTimeout: 5000,
      cookie: false,
    });
  }

  initHandlers() {
    this.io.on("connect", (socket) => {
      console.log("user connected to server");

      new JoinChatHandler(this.io, socket);
      new SendMessageHandler(this.io, socket);
    });
  }

  startListening() {
    const { PORT } = process.env;
    this.server.listen(PORT, () => {
      console.log("Server started listening on port", PORT);
    });
  }
}
