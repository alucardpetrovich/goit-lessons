import * as http from "http";
import { Server } from "socket.io";

const server = http.createServer(() => {});
const io = new Server(server, {
  path: "/chat",
});

io.on("connection", (socket) => {
  console.log("Client connected");

  // 1. joinChat
  // 2. sendMessage
  socket.on("joinChat", (data) => {
    const { userId, chatId } = data;
    const roomName = String(chatId);

    socket.join(roomName);
    io
      .to(roomName)
      .emit("newMessage", { chatId, message: `User '${userId}' joined chat` });
  });

  socket.on("sendMessage", (data) => {
    const { userId, chatId, message } = data;
    const roomName = String(chatId);

    io
      .to(roomName)
      .emit("newMessage", { chatId, message: `${userId}: ${message}`, userId });
  });

  socket.on("disconnect", (reason) => {
    console.log("client disconnected. Reason:", reason);
  });
});

server.listen(3000, () => {
  console.log("server started on port 3000");
});
