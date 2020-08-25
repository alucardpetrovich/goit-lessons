const Joi = require("@hapi/joi");
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
  socket.on("joinChat", (data) => {
    // 1. validate data +
    // 2. join socket to room +
    // 3. send message to room that user joined chat +
    const error = validateJoinChat(data);
    if (error) {
      return socket.emit("exception", {
        messageName: "joinChat",
        message: error,
        status: 400,
      });
    }

    const { chatId, userId } = data;

    socket.join(chatId);

    io.to(chatId).emit("chatMessage", {
      message: `User ${userId} connected to chat`,
    });
  });

  socket.on("sendMessage", (data) => {
    // 1. validate +
    // 2. send message to room

    const error = validateSendMessage(data);
    if (error) {
      return socket.emit("exception", {
        messageName: "joinChat",
        message: error,
        status: 400,
      });
    }

    const { chatId, userId, message } = data;

    io.to(chatId).emit("chatMessage", { message: `${userId}: ${message}` });
  });
});

server.listen(3000, () => {
  console.log("Started listening");
});

function validateJoinChat(data) {
  const joinChatSchema = Joi.object({
    chatId: Joi.number().required(),
    userId: Joi.number().required(),
  });

  const result = joinChatSchema.validate(data);

  if (result.error) {
    return result.error;
  }
}

function validateSendMessage(data) {
  const joinChatSchema = Joi.object({
    chatId: Joi.number().required(),
    userId: Joi.number().required(),
    message: Joi.string().required(),
  });

  const result = joinChatSchema.validate(data);

  if (result.error) {
    return result.error;
  }
}
