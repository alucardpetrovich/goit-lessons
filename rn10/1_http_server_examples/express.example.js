const express = require('express');

const server = express();

// server.use(express.json());
// server.use(express.urlencoded());
server.use(express.static('static'))
// server.use('/static', express.static('static', {
//   cacheControl: false,
//   redirect: true
// }));

server.all('/', baseGet, secondMiddleware);

server.use(errorMiddleware);

server.listen(3000, () => {
  console.log('Started listening');
});

function baseGet(req, res, next) {
  console.log('first middleware');

  let body = '';

  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', () => {
    req.body = body;
    next();
  });

  // return res
  //   .status(200)
  //   .set('Content-Type', 'application/json')
  //   .send({
  //     hello: 'world'
  //   })
}

async function secondMiddleware(req, res, next) {
  try {
    console.log('second middleware');
    console.log('req.body', req.body);

    throw new Error();

    return res
      .status(200)
      .set('Content-Type', 'application/json')
      .send({
        hello: 'world'
      })
  } catch (err) {
    err.status = 502;

    next(err);
  }
}

function errorMiddleware(err, req, res, next) {
  delete err.stack;

  next(err);
}
