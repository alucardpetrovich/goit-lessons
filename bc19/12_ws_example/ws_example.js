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
  socket.on("test.example", (data) => {
    // console.log("test.example");
    console.log(data);

    socket.emit("test.response", { hello: "world" });
  });
  socket.on("test2", () => {
    console.log("test2");
  });
  //   console.log("connected to ws server");
});

server.listen(3000);
