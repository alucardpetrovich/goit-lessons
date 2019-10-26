const QuestionsRouter = require('./routers/questions.router');
// const http = require('http');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');

async function main() {
    const server = express();

    server.use(bodyParser());
    server.use('/questions', QuestionsRouter);

    await mongoose.connect('mongodb+srv://levkiv:1234567890@testcluster-oqqlz.mongodb.net/test?retryWrites=true&w=majority');

    server.listen(config.port, () => {
        console.log('Server listening on port', config.port);
    });
}

main();

// const paths = Object.entries(QuestionsRouter)
//     .map(([ routeStr, handler ]) => {
//         const [ method, url ] = routeStr.split(' ');
//         return { method, url, handler };
//     });

// http.createServer((req, res) => {
//     const method = req.method;
//     const url = req.url;

//     const handled = paths.some(pathInfo => {
//         if ( method === pathInfo.method && url === pathInfo.url ) {
//             console.log(pathInfo);
//             pathInfo.handler(req, res);
//             return true;
//         }
//     });

//     if ( !handled ) {
//         res.statusCode = 404;
//         res.end();
//     }

// })
    // .listen(PORT, () => {
    //     console.log('Server listening on port', PORT);
    // });
