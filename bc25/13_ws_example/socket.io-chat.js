const SocketIO = require("socket.io");
const Http = require("http");

const server = Http.createServer();

const MESSAGE_TYPES = {
  SYSTEM: "system",
  USER_MESSAGE: "user_message",
};

const io = SocketIO(server, {
  serveClient: false,
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false,
});

io.on("connection", (socket) => {
  console.log("client connected");

  socket.on("joinChat", (data) => {
    console.log("joinChat data", data);
    const { userId, chatId } = data;
    const roomName = `${chatId}`;

    socket.join(roomName);
    io.to(roomName).emit("message", {
      type: MESSAGE_TYPES.SYSTEM,
      text: `User '${userId}' has joined this chat`,
    });
  });

  socket.on("sendMessage", (data) => {
    console.log("sendMessage data", data);
    const { userId, chatId, text } = data;
    const roomName = `${chatId}`;

    io.to(roomName).emit("message", {
      type: MESSAGE_TYPES.USER_MESSAGE,
      userId,
      text: `'${userId}': ${text}`,
    });
  });
});

server.listen(3000, () => {
  console.log("Server started");
});
