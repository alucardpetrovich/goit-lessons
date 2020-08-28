const express = require("express");

const app = express();

// Global middleware
app.use(express.json());
app.use("/static", express.static("static"));

app.post("*", (req, res, next) => {
  console.log("should be logged");
  console.log("hello");
  next();
});

app.post(
  "/",
  (req, res, next) => {
    next();
  },
  (req, res) => {
    // req.headers
    // req.get('Accept');
    // req.url

    console.log(req.body);

    // console.log(req);

    res.set("Content-Type", "application/json");
    res.status(205).send({ hello: "world" });
  }
);

app.listen(3000, () => {
  console.log("Started listening");
});
