const express = require("express");

const app = express();

app.use(express.json());
app.use("/static", express.static("static"));

app.get(
  "/users/:id",
  (req, res, next) => {
    req.a = 1;
    next();
  },
  (req, res, next) => {
    let a = req.a;
    console.log("req.body", req.body);
    console.log("req.query", req.query);
    console.log("req.headers", req.headers);
    console.log("req.method", req.method);
    console.log("req.url", req.url);
    console.log("req.params", req.params);

    a = 10;

    a = 15;

    // if (req.query.a === "secret") {
    //   return res.send("secret resolved");
    // }

    res.set("X-Content-Type", "application/json");
    res.status(201);
    res.send({ hello: "world" });
  }
);

app.listen(3000, () => {
  console.log("server started");
});
