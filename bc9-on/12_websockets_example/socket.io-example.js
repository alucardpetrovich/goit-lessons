const socketIO = require("socket.io");
const http = require("http");

const io = socketIO({
  path: "/test",
  serveClient: false,
});
const server = http.createServer();

io.attach(server, {
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false,
});
server.listen(3000, () => {
  console.log("server started");
});

io.on("connection", (socket) => {
  console.log("new client connected");

  socket.on("sendMessage", (data) => {
    const { chatId, userId, message } = data;
    const room = `g-${chatId}`;

    io.to(room).emit("message", {
      message: `User ${userId}: ${message}`,
      chatId,
      userId,
    });
  });

  socket.on("joinChat", (data) => {
    const { chatId, userId } = data;
    const room = `g-${chatId}`;

    socket.join(room);
    io.to(room).emit("message", {
      message: `System: user ${userId} connected to chat`,
      chatId,
    });
  });
});
