const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const PORT = 3000;

const server = express();

var accessLogStream = fs.createWriteStream("access.log", {
  flags: "a",
});

// For All requests
server.use(express.json());
server.use(morgan("tiny", { stream: accessLogStream }));

server.use("/static", express.static("static"));

// FOR /users only
// server.use('/users', express.json());
// FOR POST's only
// server.post('/*', express.json());

server.get(
  "/users",
  (req, res, next) => {
    // res.send([{ id: 1, name: "user1" }]);
    console.log("first middleware");
    next(new Error("hello"));
    // next();
  },
  (req, res, next) => {
    console.log("second middleware");

    res.send([{ id: 1, name: "user1" }]);
  }
);

server.post("/users", (req, res) => {
  console.log(req.body);
  res.send();
});

server.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).send(err.message);
});

server.listen(PORT, () => {
  console.log("Server started listening on port", PORT);
});
