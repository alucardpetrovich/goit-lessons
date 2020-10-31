const server = require("http").createServer();

const io = require("socket.io")(server, {
  path: "/test",
  serveClient: false,
  // below are engine.IO options
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false,
});

io.on("connect", (socket) => {
  console.log("user connected");

  socket.on("joinChat", (data) => {
    const { userId, chatId } = data;
    const roomName = `${chatId}`;

    socket.join(roomName);
    io.to(roomName).emit("newMessage", {
      message: `${userId} has joined chat`,
    });
  });

  socket.on("sendMessage", (data) => {
    const { userId, chatId, message } = data;
    const roomName = `${chatId}`;

    io.to(roomName).emit("newMessage", {
      message: `${userId}: ${message}`,
    });
  });

  socket.on("disconnect", () => {
    console.log("disconnected");
  });
});

server.listen(3000);
