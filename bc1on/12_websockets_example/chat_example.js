const http = require("http");
const socketIO = require("socket.io");

const server = http.createServer();

const io = socketIO(server, {
  path: "/test",
  pingTimeout: 5000,
  pingInterval: 10000,
});

io.on("connection", (socket) => {
  console.log("new connection received");

  socket.on("joinChat", (data) => {
    console.log("joinChat message", data);
    const { userId, chatId } = data;
    const roomName = `${chatId}`;

    socket.join(roomName);
    io.to(roomName).emit("newMessage", {
      userId,
      chatId,
      message: `System: User ${userId} has joined chat`,
    });
  });

  socket.on("sendMessage", (data) => {
    console.log("sendMessage message", data);
    const { userId, chatId, message } = data;
    const roomName = `${chatId}`;

    io.to(roomName).emit("newMessage", {
      userId,
      chatId,
      message: `User${userId}: ${message}`,
    });
  });
});

server.listen(3000, () => {
  console.log("Server started listening on port", 3000);
});
