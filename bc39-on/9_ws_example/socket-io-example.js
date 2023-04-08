const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(() => {});
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("chatJoin", (data) => {
    const { userId, chatId } = data;
    const roomName = `${chatId}`;

    socket.join(roomName);
    io.to(roomName).emit("newMessage", {
      type: "system",
      message: `User ${userId} successfully joined chat`,
      chatId,
    });
  });

  socket.on("sendMessage", (data) => {
    const { userId, chatId, message } = data;
    const roomName = `${chatId}`;

    io.to(roomName).emit("newMessage", {
      type: "user",
      message: `User ${userId}: ${message}`,
      chatId,
      userId,
    });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
