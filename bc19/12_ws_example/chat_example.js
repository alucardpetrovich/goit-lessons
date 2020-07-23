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
  // 1. joinChat
  // 2. sendMessage

  socket.on("joinChat", (data) => {
    // 1. join user to chat room
    // 2. send response
    const chatId = data.chatId;

    console.log("joinChat", data);

    socket.join(chatId);

    socket.emit("joinChatResponse", {
      message: `Successfully joined to ${chatId} chat`,
    });

    // socket.disconnect();
  });

  socket.on("sendMessage", (data) => {
    const { chatId, message } = data;

    io.to(chatId).emit("chatMessage", { message });
  });
});

server.listen(3000);
