const http = require("http");

const server = http.createServer((req, res) => {
  console.log("headers ->>>", req.headers);
  console.log("url ->>>", req.url);
  console.log("method ->>", req.method);

  // let body = "";
  // req.on("data", (chunk) => {
  //   body += chunk.toString();
  // });
  // req.on("end", () => {
  //   console.log("body ->>>", body);
  // });

  res.setHeader("Hello", "world");
  res.statusCode = 200;

  res.setHeader("Content-Type", "text/html");
  res.end("<b>hello world</b>");
});

server.listen(80);
