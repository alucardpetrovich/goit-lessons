const http = require("http");

const PORT = 3000;

const server = http.createServer((req, res) => {
  // req - all info about client request (method, path -> url, headers, req body, protocol, protocol version)
  // res - all info & methods for building and sending response to client
  // logic about request handing
  console.log("req.method", req.method);
  console.log("req.url", req.url);
  console.log("req.headers", req.headers);
  console.log("req.httpVersion", req.httpVersion);

  let body = "";
  req.on("data", (chunk) => (body += chunk.toString()));
  req.on("end", () => console.log(body));

  res.statusCode = 202;
  res.setHeader("test", "hello");
  res.end("hello world");
});

server.listen(PORT, () => {
  console.log("Server started listening on port", PORT);
});
