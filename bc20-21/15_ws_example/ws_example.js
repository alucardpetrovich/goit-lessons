const server = require("http").createServer();

const io = require("socket.io")(server, {
  path: "/test",
  serveClient: false,
  // below are engine.IO options
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false,
});

io.on("connection", (socket) => {
  console.log("connection established");

  socket.on("joinChat", (message) => {
    // message = { userId, chatId }
    const roomName = `${message.chatId}`;

    socket.join(roomName);

    io.to(roomName).emit("newMessage", {
      message: `User ${message.userId} connected to chat`,
    });
  });

  socket.on("chatMessage", (message) => {
    // message - { userId, chatId, message }
    const roomName = `${message.chatId}`;

    console.log(roomName);

    io.to(roomName).emit("newMessage", message);
  });
});

server.listen(3000);
