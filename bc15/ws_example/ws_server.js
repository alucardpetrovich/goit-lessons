const http = require("http");
const socketIo = require("socket.io");
const WsValidator = require("./validator");

const httpServer = http.createServer();

const io = socketIo(httpServer, {
  pingInterval: 10000,
  pingTimeout: 15000
});

io.on("connection", socket => {
  console.log("client connected");
  socket.on("joinChat", joinChat.bind(null, socket));
  socket.on("sendMessage", sendMessage.bind(null, socket));
});

async function joinChat(socket, data) {
  try {
    console.log("joinChat data", data);
    const { chatId } = await WsValidator.validateJoinChat(data);

    socket.join(chatId);

    socket.emit("joinChat", {
      message: `Succesfully connected to chat ${chatId}`,
      status: 200
    });
  } catch (err) {
    socket.emit("customError", {
      message: err.message,
      status: err.status || 500
    });
  }
}

async function sendMessage(socket, data) {
  try {
    const { chatId, message } = await WsValidator.validateSendMessage(data);

    io.to(chatId).emit("newMessage", {
      message
    });
  } catch (err) {
    socket.emit("customError", {
      message: err.message,
      status: err.status || 500
    });
  }
}

httpServer.listen(3000, () => {
  console.log("Server started listening");
});
