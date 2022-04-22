// 1. GET /users
// 2. 1st middleware - validate (query params page & page_size)
// 3. 2nd middleware - get users from DB and send back to client
const express = require("express");

const server = express();

server.use(express.json());

server.use((req, res, next) => {
  console.log("req.url", req.url);
  console.log("req.method", req.method);
  console.log("req.headers", req.headers);
  console.log("req.body", req.body);

  next();
});

server.get(
  "/users",
  (req, res, next) => {
    req.hello = "world";
    next();
  },
  (req, res, next) => {
    res.send(req.hello);
  }
);

server.use((err, req, res, next) => {
  delete err.stack;
  next(err);
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log("Server started listening on port", PORT);
});
