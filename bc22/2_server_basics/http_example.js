const http = require("http");

const server = http.createServer((req, res) => {
  console.log("Method", req.method);
  console.log("URN", req.url);
  console.log("headers", req.headers);

  res.setHeader('Content-Type', 'text/html');

  res.statusCode = 201;
  res.end("<b>Hello</b>");
});

server.listen(3000, () => {
  console.log("Started server");
});
