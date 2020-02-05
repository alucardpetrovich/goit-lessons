const express = require("express");
const router = require("./router.example");

const PORT = 3000;

const app = express();

app.use("/router", router);

app.set("view engine", "pug");
app.set("views", "./views");

app.get("/home", (req, res, next) => {
  return res.render("home", {
    title: "Some random stuff"
  });
});

app.get("/cookie", (req, res) => {
  res.cookie("token", "afasdfdsafas", { httpOnly: true, sameSite: true });
  res.send();
});

app.get("/users/:userId/:postId?", (req, res) => {
  res.send(req.params.userId);
});

app.get("/users", (req, res) => {
  res.send(req.query);
});

app.get("/json", (req, res) => {
  res.status(201).json("Hello json");
});

app.get("/headers", (req, res) => {
  res.set({
    "Content-Type": "application/json"
  });

  res.send("headers");
});

app.get("/links", (req, res) => {
  res.links({
    next: "http://api.example.com/users?page=2",
    last: "http://api.example.com/users?page=5"
  });
  res.send("links");
});

app.get("/redirect", (req, res) => {
  res.redirect(301, "http://localhost:3000/json");
});

app.use(express.static("static"));

// app.use((req, res) => {
//   res.send("world");
// });

app.get(
  "/",
  (req, res, next) => {
    // res.send("hello world");
    console.log("1 middleware");
    // next();
    const err = new Error("Error");
    err.status = 401;
    next(err);
    // throw err;
  },
  (req, res) => {
    console.log("2 middleware");
    res.send("hello world");
  },
  (err, req, res, next) => {
    delete err.stack;
    next(err);
    // throw err;
  },
  (err, req, res, next) => {
    console.log("3 middleware");
    res.send("Hello world");
  }
);

app.put("/", (req, res) => {
  res.status(201).send("hello put");
});

app.all("/hello", (req, res) => {
  res.send("hello");
});

app.listen(PORT, () => {
  console.log("Server started listening on port", PORT);
});
