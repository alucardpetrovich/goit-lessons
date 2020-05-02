const http = require("http");

const server = http.createServer((req, res) => {
  console.log("req.method", req.method);
  console.log("req.url", req.url);
  console.log("req.headers", req.headers);

  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    console.log("req body", body);
  });

  res.setHeader("Content-Type", "application/json");
  res.statusCode = 201;
  res.end("Hello to you too");
});

server.listen(3000, () => {
  console.log("Server started listening");
});
