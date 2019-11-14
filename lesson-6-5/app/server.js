const express = require("express");
const bodyParser = require("body-parser");
const http = require('http');
const chatRouter = require('./chat/chat.router');
const config = require("./config");

global.socketsByUserId = new Map();

main();

async function main() {
  const app = express();
  const server = http.createServer(app);

  console.log('port', config.port);

  initMiddlewares(app);
  initRoutes(app);
  initWsRoutes(server);

  server.listen(config.port, () => {
    console.log("Server listening on port", config.port);
  });
}

function initMiddlewares(app) {
  app.use(bodyParser());
}

function initRoutes(app) {
  app.use((err, req, res, next) => {
    delete err.stack;
    next(err);
  });
}

function initWsRoutes(server) {
  chatRouter.registerRouter('/chats', server);
}
