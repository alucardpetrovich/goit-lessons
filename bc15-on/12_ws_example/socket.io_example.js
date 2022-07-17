const http = require("http");
const { Server } = require("socket.io");

const httpServer = http.createServer(() => {});

const io = new Server(httpServer, {
  path: "/chat",
  pingInterval: 30000,
  pingTimeout: 10000,
});

io.on("connect", (socket) => {
  console.log("Client connected");
  socket.on("joinChat", (data) => {
    // { userId, chatId }
    const { userId, chatId } = data;
    const roomName = `${chatId}`;

    socket.join(roomName);
    io.to(roomName).emit("chatMessage", {
      type: "System",
      message: `User '${userId}' has joined chat`,
      chatId,
    });
  });

  socket.on('sendMessage', (data) => {
    // { userId, chatId, message }
    const { userId, chatId, message } = data;
    const roomName = `${chatId}`;

    io.to(roomName).emit("chatMessage", {
      type: "User",
      message: `${userId}: ${message}`,
      chatId,
    });
  });
});

httpServer.listen(3000, () => {
  console.log("server started on port 3000");
});
