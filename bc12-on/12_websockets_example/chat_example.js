const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, {
  path: "/test",
});

io.on("connection", (socket) => {
  console.log("connection established");

  socket.on("joinChat", (data) => {
    // userId, chatId
    // 1. join user to chat
    // 2. send message that user has joined this chat
    const { chatId, userId } = data;
    const roomName = String(chatId);
    io.in(socket.id).socketsJoin(roomName);

    io.to(roomName).emit("chatMessage", {
      message: `User with id ${userId} has joined this chat`,
      type: "system",
      chatId,
    });
  });

  socket.on("sendMessage", (data) => {
    // userId, chatId, message
    const { userId, chatId, message } = data;
    const roomName = String(chatId);

    if (!socket.rooms.has(roomName)) {
      return socket.emit("error", { errMsg: "User is not in this chat" });
    }

    io.to(roomName).emit("chatMessage", {
      message: `${userId}: ${message}`,
      type: "user",
      chatId,
    });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const PORT = 3000;
httpServer.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
