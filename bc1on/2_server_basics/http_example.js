const http = require("http");

const server = http.createServer((req, res) => {
  // Request object
  console.log("req.method", req.method);
  console.log("req.url", req.url);
  console.log("req.headers", req.headers);

  res.statusCode = 201;
  res.setHeader("Hello-World", "hello");
  res.setHeader("Content-Type", "text/plain");

  res.end(JSON.stringify({ hello: "world" }));
});

server.listen(3000, () => {
  console.log("started listening on port");
});
