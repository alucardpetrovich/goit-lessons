import http from "http";
import { questionRouter } from "./questions/question.router";

export class QuestionsServer {
  constructor(config) {
    this.routes = null;
    this.config = config;
  }

  start() {
    this.initRoutes();
    this.initServer();
    this.startListening();
  }

  initRoutes() {
    this.routes = [...questionRouter];
  }

  initServer() {
    this.server = http.createServer(this.serverCallback.bind(this));
  }

  serverCallback(req, res) {
    // 1. iterate through our routes and find appropriate handler
    // 2. if no handler found - send 404
    // 3. if handler found - call handler with req, res objects
    const { method, url } = req;

    console.log(this.routes);

    const handled = this.routes.some(route => {
      if (route.method === method && route.url === url) {
        route.handler(req, res).catch(() => {
          res.statusCode = 500;
          res.end();
        });

        return true;
      }

      return false;
    });

    if (!handled) {
      res.statusCode = 404;
      res.end();
    }
  }

  startListening() {
    this.server.listen(this.config.port, () => {
      console.log("Server started listening on port", this.config.port);
    });
  }
}
