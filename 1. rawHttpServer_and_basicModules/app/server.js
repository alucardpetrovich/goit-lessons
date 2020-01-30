const QuestionsRouter = require('./routers/questions.router');
const http = require('http');

const PORT = 3000;
const paths = Object.entries(QuestionsRouter)
    .map(([ routeStr, handler ]) => {
        const [ method, url ] = routeStr.split(' ');
        return { method, url, handler };
    });

http.createServer((req, res) => {
    const method = req.method;
    const url = req.url;

    const handled = paths.some(pathInfo => {
        if ( method === pathInfo.method && url === pathInfo.url ) {
            console.log(pathInfo);
            pathInfo.handler(req, res);
            return true;
        }
    });

    if ( !handled ) {
        res.statusCode = 404;
        res.end();
    }

})
    .listen(PORT, () => {
        console.log('Server listening on port', PORT);
    });
