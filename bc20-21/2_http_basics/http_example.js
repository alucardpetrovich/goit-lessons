const http = require("http");

const server = http.createServer((req, res) => {
  // req - get all request data of client
  // res - send response data to client

  console.log("HTTP Method", req.method);
  console.log("HTTP URN", req.url);
  console.log("HTTP Headers", req.headers);

  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    console.log(body);
  });

  res.statusCode = 202;
  res.setHeader("Content-Type", "application/json");
  res.end('{"hello": "world"}');
});

server.listen(3000, () => {
  console.log("Server started listening");
});
