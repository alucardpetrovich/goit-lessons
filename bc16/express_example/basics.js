const express = require("express");
const bodyParser = require("body-parser");
const PORT = 3000;

const server = express();

server.set("view engine", "ejs");
server.set("views", "./views");

server.get("/users/:username", (req, res) => {
  res.render("user", {
    username: req.params.username
  });
});

server.use("/static", express.static("static"));

const router = express.Router();

router.get("/", (req, res) => {
  res.send("users");
});

router.get("/current", (req, res) => {
  res.send("current");
});

server.use("/users", router);

/**
 * 1. Check Content-Type === application/json
 * 2. If json, parse req body and execute next();
 * 3. If not json - just execute next();
 * 4. If parse failed - 400
 */
server.use(bodyParser.json());

server.use("/questions", (req, res, next) => {
  console.log("Questions global middleware");
  next();
});

server.get(
  "/",
  (req, res, next) => {
    // res.send([
    //   1,
    //   2,
    //   3,
    //   {
    //     A: "dsaf"
    //   }
    // ]);
    // next();
    const err = new Error();
    err.status = 403;
    next(err);
    // req.message = "Hello world";
    // console.log("first middleware");
    // next();
  },
  (req, res) => {
    console.log("second middleware");
    res.send(req.message);
  }
);

server.get("/questions", (req, res, next) => {
  console.log("get questions");
  res.send(req.query);
  next();
});

server.post("/questions", (req, res) => {
  console.log("post questions");
  res.send("post questions");
});

server.get("/questions/:questionId", (req, res) => {
  res.send(req.params);
});

server.get("/test-req-res", (req, res) => {});

// server.use((req, res) => {
//   console.log("this middleware will not be called");
//   res.send("asdfasdf");
// });

server.use((err, req, res, next) => {
  delete err.stack;
  next(err);
});

server.listen(PORT, () => {
  console.log("Server started listening on port", PORT);
});
