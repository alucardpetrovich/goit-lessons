const http = require("http");

const server = http.createServer(async (req, res) => {
  console.log("req.method", req.method);
  console.log("req.headers", req.headers);
  console.log("req.url", req.url);
  console.log("req.httpVersion", req.httpVersion);
  console.log("req.body", await getReqBody(req));

  res.setHeader('Test', 'hello');
  res.writeHead(200);
  res.end("Hello world");
});

async function getReqBody(req) {
  let body = "";

  return new Promise((res) => {
    req.on("data", (data) => {
      body += data.toString();
    });
    req.on("end", () => {
      res(body);
    });
  });
}

const PORT = 80;
server.listen(PORT, () => {
  console.log("Server started listening on port", PORT);
});
