const express = require("express");
const PORT = 3001;

const server = express();

server.use(express.json());
server.use(express.urlencoded());
server.use(express.static("static"));

server.get("/users", authMiddleware, successMiddleware, errMiddleware);

server.listen(PORT, () => {
  console.log("Server started on port", PORT);
});

function authMiddleware(req, res, next) {
  const validSessionToken = "12345";

  const authHeader = req.get("Authorization") || "";
  const token = authHeader.replace("Bearer ", "");

  if (validSessionToken === token) {
    return next();
  }

  next(new Error("Unauthorized"));
}

function successMiddleware(req, res) {
  return res.status(200).send("Success");
}

function errMiddleware(err, req, res, next) {
  return res.status(500).send(err.message);
}
