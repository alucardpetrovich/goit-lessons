const http = require("http");
const path = require("path");
const { promises: FsPromises } = require("fs");

const PORT = 3000;
const contentType = {
  ".html": "text/html",
  ".css": "text/css",
  ".jpeg": "image/jpeg",
  ".js": "application/javascript",
};

const server = http.createServer(async (req, res) => {
  // 1. localhost:3000 -> send index.html
  // 2. localhost:3000/js/main.js -> send js/main.js
  // 3. localhost:3000/img/<image>.png -> send image.png

  console.log("req.url", req.url);

  let url = req.url === "/" ? "/index.html" : req.url;
  url = url.replace("/", "");

  const ext = path.extname(url);
  const fileContentType = contentType[ext];
  if (!fileContentType) {
    res.statusCode = 400;
    return res.end("Unsupported file type");
  }

  res.writeHead(200, { "Content-Type": fileContentType });

  if (fileContentType.startsWith("image")) {
    const imageContent = await FsPromises.readFile(url);
    return res.end(imageContent);
  }

  const textFileContent = await FsPromises.readFile(url, "utf-8");
  res.end(textFileContent);
});

server.listen(PORT, () => {
  console.log("Started listening on port", PORT);
});
