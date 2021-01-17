import http from "http";

const server = http.createServer((req, res) => {
  // req - Request
  // res - Response

  res.setHeader("Test", "Test");
  res.end("hello world");
});

server.listen(80);
