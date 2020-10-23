const express = require("express");

const server = express();

server.use((req, res, next) => {
  console.log("global middleware");
  // req.example = "example";
  next();
});
server.use(express.json());
server.use("/static", express.static("static"));

server.get(
  "/users",
  (req, res, next) => {
    // console.log("req.example", req.example);
    // console.log("req.method", req.method);
    // console.log("req.url", req.url);
    // console.log("req.headers", req.headers);
    // console.log("req.query", req.query);

    // next();
    next(new Error("hello"));

    // res.send({ hello: "world" });
  },
  (req, res, next) => {
    console.log("second middleware");
    res.send({ hello: "world" });
  }
);

server.post("/users", (req, res, next) => {
  console.log("req.body", req.body);

  res.send("Body received");
});

server.use((err, req, res, next) => {
  console.log("err.message", err.message);

  res.set("Content-Type", "text/plain");
  res.status(401).send(err.message || "");
});

server.listen(80, () => {
  console.log("Started listening");
});
