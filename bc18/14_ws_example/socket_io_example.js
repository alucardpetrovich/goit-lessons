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

io.on("connection", (socket) => {
  console.log("Client successfully connected");

  socket.on("joinChat", (data) => {
    try {
      validateJoinChat(data);

      const { chatId } = data;
      socket.join(chatId);

      socket.emit("joinChat", {
        status: 200,
        statusText: "Successfully connected to chat",
      });
      io.to(chatId).emit("newUser", { message: "New user joined chat" });
    } catch (err) {
      socket.emit("exception", {
        status: err.status,
        message: err.message,
        eventName: "joinChat",
      });
    }
  });

  socket.on("sendMessage", (data) => {
    try {
      validateSendMessage(data);

      const { chatId, message } = data;

      socket.emit("sendMessage", {
        status: 200,
        statusText: "Successfully send message to chat",
      });
      io.to(chatId).emit("newMessage", { message });
    } catch (err) {
      socket.emit("exception", {
        status: err.status,
        message: err.message,
        eventName: "joinChat",
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(3000, () => {
  console.log("Server started");
});

function validateJoinChat(data) {
  const joinChatSchema = Joi.object({
    chatId: Joi.string().required(),
  });

  const result = joinChatSchema.validate(data);
  if (result.error) {
    throw new ValidationError(result.error);
  }
}

function validateSendMessage(data) {
  const sendMessageSchema = Joi.object({
    chatId: Joi.string().required(),
    message: Joi.string().required(),
  });

  const result = sendMessageSchema.validate(data);
  if (result.error) {
    throw new ValidationError(result.error);
  }
}

class ValidationError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.status = 400;
  }
}
