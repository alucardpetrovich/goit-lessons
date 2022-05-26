const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  pingInterval: 60000,
  pingTimeout: 10000,
});

io.on("connection", (socket) => {
  console.log("a user connected");
  // joinChat - { chatId, userId }
  // sendMessage - { chatId, userId, message }
  socket.on("joinChat", (data) => {
    // 1. add user to chat room
    // 2. send system message to chat that user has joined a chat
    const { chatId, userId } = data;

    const roomName = String(chatId);
    socket.join(roomName);

    io.to(roomName).emit("newMessage", {
      type: "system",
      userId: null,
      chatId,
      message: `User '${userId}' has joined a chat`,
    });
  });

  socket.on("sendMessage", (data) => {
    // 1. send system message to chat that user has joined a chat
    const { chatId, userId, message } = data;

    const roomName = String(chatId);
    io.to(roomName).emit("newMessage", {
      type: "user",
      userId,
      chatId,
      message: `${userId}: ${message}`,
    });
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
