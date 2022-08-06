const express = require("express");

const app = express();

app.use(express.json());

app.get(
  "/hello/:param1",
  (req, res, next) => {
    // ? Request
    // 1. http method
    // 2. path params
    // 3. query params
    // 4. protocol & it's version
    // 5. headers
    // 6. request body
    console.log("req.method", req.method);
    console.log("req.params", req.params);
    console.log("req.url", req.url);
    console.log("req.query", req.query);
    console.log("req.protocol", req.protocol);
    console.log("req.httpVersion", req.httpVersion);
    console.log("req.headers", req.headers);
    // get value of content-type header
    const contentType = req.get("Content-Type");
    console.log("contentType", contentType);
    console.log("req.body", req.body);

    // ? Response
    // 1. Protocol & version
    // 2. Status code & Status text
    // 3. headers
    // 4. response body

    // res.set("Hello", "world");
    // res.status(201);
    // res.send("world");
    next();
  },
  (req, res, next) => {
    res.set("Hello", "world");
    res.status(201);
    throw new Error("hello, I have a problem");
    res.send("world");
  }
);

app.use((err, req, res, next) => {
  console.log(err);
  delete err.stack;
  res.status(500).send(err.message);
});

app.listen(3000, () => {
  console.log("Server started listening on port", 3000);
});
