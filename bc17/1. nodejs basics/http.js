const http = require("http");

const server = http.createServer((req, res) => {
  console.log("Request received");

  // 1. HTTP method
  // 2. path-params and query
  // 3. request body
  // 4. header
  const method = req.method; // GET, POST, PUT ...
  const pathParamsAndQuery = req.url;
  const headers = req.headers;
  let body = "";

  req.on("data", bodyChunk => {
    console.log("bodyChunk", bodyChunk);
    body += bodyChunk.toString();
  });

  req.on("end", () => {
    // body received

    console.log("req", req);

    res.writeHead(201, {
      "Content-Type": "text/plain"
    });
    res.end(body);
  });
});

server.listen(80, () => {
  console.log("Started listening on port", 80);
});
