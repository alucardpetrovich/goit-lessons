const http = require("http");
const qs = require("querystring");

const server = http.createServer((req, res) => {
  console.log("request received");
  console.log("req.method", req.method);
  console.log("req.method", req.url);
  console.log("req.headers", req.headers);

  console.log(qs.parse(req.url.split("?")[1]));

  res.end("hello world");
});

server.listen(3000, () => {
  console.log("Server successfully started");
});
