import express from "express";
import { usersRouter } from "./users.js";

const PORT = 3000;

const server = express();
server.use(express.json());
server.use(express.urlencoded());
server.use("/users", usersRouter);

server.post("/json-test", (req, res) => {
  res.send(req.body);
});

server.listen(PORT, () => {
  console.log("Started listening on port", PORT);
});
