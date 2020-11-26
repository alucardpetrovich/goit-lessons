const http = require("http");
const socketIO = require("socket.io");

const server = http.createServer();

// 1. 1s - Server 1 Ping
// 2. 4s - Client 1 Pong
// 3. connection still open
// 4. 11s - Server 2 Ping
// 5. 16s - connection was closed by server because of timeout
// 6. 20s - Client 2 Pong

const io = socketIO(server, {
  path: "/test",
  pingInterval: 10000,
  pingTimeout: 5000,
});

io.on("connection", (socket) => {
  console.log("new connection received");
  socket.emit("hello", { hello: "world" });

  socket.on("hello", (data) => {
    console.log("data", data);
  });
});

server.listen(3000, () => {
  console.log("Server started listening on port", 3000);
});
