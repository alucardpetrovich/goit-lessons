const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(() => {});
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.request.headers.cookie

  // joinChat { userId, chatId }
  // sendMessage { userId, chatId, message }

  socket.on("joinChat", (data) => {
    const { userId, chatId } = data;

    const roomName = `${chatId}`;

    socket.join(roomName);
    io.to(roomName).emit("newMessage", {
      chatId,
      type: "system",
      message: `User ${userId} has joined chat`,
    });
  });

  socket.on("sendMessage", (data) => {
    const { userId, chatId, message } = data;

    const roomName = `${chatId}`;

    if (!socket.rooms.has(roomName)) {
      return socket.emit("error", {
        chatId,
        message: "user is not in the room",
      });
    }

    io.to(roomName).emit("newMessage", {
      chatId,
      userId,
      type: "regular",
      message: `${userId}: ${message}`,
    });
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
