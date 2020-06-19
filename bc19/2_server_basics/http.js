const http = require("http");

const server = http.createServer((req, res) => {
  const { headers, url, method } = req;

  console.log("headers", headers);
  console.log("url", url);
  console.log("method", method);

  res.writeHead(201, {
    "Set-Cookie": "token=token",
  });

  return res.end("Hello");
});

server.listen(3000, () => {
  console.log("Server started listening");
});
