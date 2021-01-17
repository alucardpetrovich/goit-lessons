import express from "express";

const PORT = 3000;

const server = express();
server.use(express.static("static"));
server.use((req, res, next) => {
  console.log("global middleware");
  req.test = "test custom req param";

  // const err = new Error("Wrong!!!");
  // next(err);
  next();
});

server.get(
  "/hello",
  (req, res, next) => {
    console.log(req.url);
    console.log("req.test", req.test);
    next();
    // res.send("hello world");
  },
  (req, res, next) => {
    res.send("hello world");
  }
);

server.get("/users/:userId", (req, res, next) => {
  console.log(req.params);
  console.log(req.query);
  res.send("Success");
});

server.use((req, res, next) => {
  res.redirect("https://goit.global/nodejs/ru/docs/lesson02/send-data/");
});

server.use((err, req, res, next) => {
  delete err.stack;
  next(err);
});

// server.post();
// server.put();
// server.delete();

server.listen(PORT, () => {
  console.log("Started listening on port", PORT);
});
