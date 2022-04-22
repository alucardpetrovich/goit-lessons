const http = require("http");

const server = http.createServer(async (req, res) => {
  console.log("req.url", req.url);
  console.log("req.method", req.method);
  console.log("req.httpVersion", req.httpVersion);
  console.log("req.headers", req.headers);
  console.log("request body", await getJsonBody(req));

  // res.statusCode = 205;
  // res.setHeader("Test", "hello");
  // res.writeHead(205, { Test: "hello" });
  // res.end("Hello world");
});

function getJsonBody(req) {
  return new Promise((resolve) => {
    let body = "";

    req.on("data", (data) => {
      body += data.toString();
    });

    req.on("end", () => {
      resolve(body);
    });
  });
}

server.listen(80, () => {
  console.log("server started listening on port", 80);
});
