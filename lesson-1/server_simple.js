const http = require('http');
const PORT = 3000;

http.createServer((req, res) => {
    console.log('req.method', req.method);
    console.log('req.url', req.url);
    console.log('req.headers', req.headers);

    res.setHeader('Content-Type', 'text/plain');
    res.statusCode = 200;
    res.end('Hello world');
})
    .listen(PORT, () => {
        console.log('Server listening on port',PORT);
    });
