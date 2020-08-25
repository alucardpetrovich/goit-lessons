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
  console.log("client connected to server");

  socket.emit("hello", { hello: "world" });

  socket.on("testMessage", (data) => {
    console.log("testMessage :>>", data);
    console.log(typeof data);

    socket.emit("testMessageResponse", { message: "I have heard you" });
  });
});

server.listen(3000);
