const io = require("socket.io");
const Joi = require("joi");
const http = require("http");
const { ValidationError } = require("./errorConstructors");
const PORT = 3000;

const httpServer = http.createServer();

const wsServer = io(httpServer, {
  path: "/ws",
  pingInterval: 10000,
  pingTimeout: 5000
});

wsServer.on("connect", socket => {
  console.log("Connection established");

  socket.on(
    "joinChat",
    errorWrapper.bind(null, socket, "joinChatResponse", joinChatHandler)
  );
  socket.on(
    "sendMessage",
    errorWrapper.bind(null, socket, "sendMessageResponse", sendMessageHandler)
  );
});

httpServer.listen(PORT, () => {
  console.log("Server started listening on port", PORT);
});

function joinChatHandler(socket, data) {
  console.log(data);
  console.log(typeof data);
  // console.log("data", data);
  // 1. chatId = 1, userId = 2
  // 2. add user to room with chatId name
  // 3. send response with success status
  // 4. send joined message to all chat members

  const { chatId, userId } = validateJoinChatParams(data);

  socket.join(chatId);

  socket.emit("joinChatResponse", {
    message: "Successfully connected to chat with id " + chatId
  });

  wsServer.to(chatId).emit("newUser", {
    chatId,
    message: `User with id ${userId} connected to chat`
  });
}

function sendMessageHandler(socket, data) {
  // 1. chatId, userId, message
  // 2. send message to chat
  const { chatId, message, userId } = validateSendMessageParams(data);

  wsServer.to(chatId).emit("newMessage", {
    chatId,
    userId,
    message
  });
}

function validateJoinChatParams(data) {
  const joinChatRules = Joi.object().keys({
    chatId: Joi.string().required(),
    userId: Joi.string().required()
  });

  const result = Joi.validate(data, joinChatRules);
  console.log(result);

  if (result.error) {
    throw new ValidationError(result.error.message);
  }

  return data;
}

function validateSendMessageParams(data) {
  const joinChatRules = Joi.object().keys({
    chatId: Joi.string().required(),
    userId: Joi.string().required(),
    message: Joi.string().required()
  });

  const result = Joi.validate(data, joinChatRules);

  if (result.error) {
    throw new ValidationError(result.error.message);
  }

  return data;
}

function errorWrapper(socket, responseEventName, handler, data) {
  try {
    handler(socket, data);
  } catch (err) {
    socket.emit(responseEventName, {
      error: true,
      name: err.name,
      message: err.message,
      status: err.status
    });
  }
}
