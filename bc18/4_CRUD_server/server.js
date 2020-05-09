const express = require("express");
const usersRouter = require("./user.router");

const PORT = 3000;

const server = express();

server.use(express.json());
server.use("/users", usersRouter);

server.use((err, req, res, next) => {
  return res.status(err.status).send(err.message);
});

server.listen(PORT, () => {
  console.log("Server started listening on port", PORT);
});
