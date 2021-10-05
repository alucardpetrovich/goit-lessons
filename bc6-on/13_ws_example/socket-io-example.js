const socketIO = require("socket.io");
const http = require("http");

const io = socketIO({
  serveClient: false,
});

const server = http.createServer();

io.attach(server, {
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false,
});

server.listen(3000);

io.on("connect", (socket) => {
  console.log("connected");
  socket.on("joinChat", (data) => {
    const { userId, chatId } = data;
    const roomName = `${chatId}`;

    socket.join(roomName);
    io.to(roomName).emit("message", {
      message: `User '${userId}' joined to chat`,
      chatId,
    });
  });

  socket.on("sendMessage", (data) => {
    const { userId, chatId, text } = data;
    const roomName = `${chatId}`;

    io.to(roomName).emit("message", {
      message: `${userId}: ${text}`,
      chatId,
    });
  });
});
