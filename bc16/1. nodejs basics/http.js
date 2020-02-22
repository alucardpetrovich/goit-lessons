const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const { url, method, headers } = req;

  if (url.includes("/books") && method === "GET") {
    res.end("no books");
    return;
  }

  if (url === "/file") {
    return fs
      .createReadStream("text.txt", {
        highWaterMark: 2
      })
      .pipe(res);
  }

  // req.on('data', (chunk) => {

  // });

  // req.on('end', () => {

  // });

  res.writeHead(200, {
    "Content-Type": "application/json"
  });

  // res.statusCode = 200;
  // res.setHeader("Content-Type", "application/json");

  // res.write("asdfasdf");

  // res.write("asdfasdf");

  res.end(
    JSON.stringify({
      randomNum: Math.random()
    })
  );
});

server.listen(3000, () => {
  console.log("Server started listening");
});
