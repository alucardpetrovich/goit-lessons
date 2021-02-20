import http from "http";
import SocketIO from "socket.io";

const server = http.createServer();

const io = SocketIO(server, {
  path: "/test",
  pingInterval: 10000,
  pingTimeout: 5000,

  serveClient: false,
  cookie: false,
});

io.on("connection", (socket) => {
  console.log("New client successfully connected");
  socket.emit("connection-successful", Date.now().toString());

  // socket.on("test", (data) => {
  //   console.log("data", data);
  // });

  socket.on("joinChat", (data) => {
    const { userId, chatId } = data;
    const roomId = `${chatId}`;

    socket.join(roomId);
    io.to(roomId).emit("message", {
      chatId,
      message: `User ${userId} connected to chat`,
    });
  });

  socket.on("sendMessage", (data) => {
    const { userId, chatId, message } = data;
    const roomId = `${chatId}`;

    io.to(roomId).emit("message", {
      chatId,
      userId,
      message: `${userId}: ${message}`,
    });
  });

  socket.on("disconnect", () => {
    console.log("client disconnected");
  });
});

server.listen(3000);
