const http = require('http');
const fs = require('fs');

const PORT = 3000;

const server = http.createServer(async (req, res) => {
  console.log('method', req.method);
  console.log('url', req.url);
  console.log('headers', req.headers);

  const body = await getBody(req);

  const fileStream = fs.createReadStream('/Users/punisher/Desktop/goit-lessons/lesson-1/Types-of-SQL-Commands.jpg')

  fileStream.pipe(res);

  // res.statusCode = 201;
  // res.setHeader('Content-Type', 'text/plain');

  // res.end(JSON.stringify({
  //   a: 1
  // }));
});

server.listen(PORT, () => {
  console.log('Server started on port', PORT);
});

async function getBody(req) {
  let body = '';
  
  return new Promise(res => {
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      res(body);
    });
  });
}
