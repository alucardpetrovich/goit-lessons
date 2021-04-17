const http = require("http");

const server = http.createServer(async (req, res) => {
  // ! HTTP Request parts
  // 1. HTTP method
  // 2. url (path & query params)
  // 3. protocol & version
  // 4. headers
  // 5. request body

  // ! HTTP Response parts
  // 1. protocol & version
  // 2. status code & status message
  // 3. http headers
  // 4. response body

  console.log("HTTP method", req.method);
  console.log("URL", req.url);
  console.log("Headers", req.headers);
  const body = await getBody(req);
  console.log("body", body);

  res.statusCode = 205;
  res.setHeader("Example", "test");
  res.end("Hello world");
});

async function getBody(req) {
  let body = "";

  return new Promise((res, rej) => {
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => res(body));
    req.on("error", rej);
  });
}

server.listen(3000);
