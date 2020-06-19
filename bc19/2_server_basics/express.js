const express = require("express");

const app = express();

//
app.use(express.json());
app.use("/static", express.static("static"));

// app.use('/hello', () => {})
// app.get(() => {});

app.get(
  "/",
  (req, res, next) => {
    res.set("Foo", "Hello");

    next();
  },
  (req, res) => {
    return res.status(200).send("hello");
  }
);

app.get("/world", (req, res) => {
  return res.status(200).send("world");
});

app.post("/", (req, res) => {
  console.log(req.body);

  return res.send();
});

app.listen(3000, () => {
  console.log("Server started listening");
});
