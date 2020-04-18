const http = require('http');

const server = http.createServer((req, res) => {
  // console.log('request received');
  // console.log('req.headers', req.headers);
  // console.log('req.url', req.url);
  // console.log('req.method', req.method);

  if (req.url === '/users') {
    res.setHeader('Content-Type', 'application/json');

    res.statusCode = 404;

    res.end(JSON.stringify({
      user: { id: 1 }
    }));

    // res.end('hello');
  }

  let body = '';

  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', () => {
    console.log('req.body', body);
  });

  res.end('Hello');
});

server.listen(80, () => {
  console.log('Server started');
});
