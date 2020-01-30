const http = require("http");
const { port } = require("./config");
const questionRouter = require("./question/question.router");

class QuestionServer {
  constructor() {
    this.server = null;
    this.routes = [];
  }

  start() {
    this.initRoutes();
    this.initServer();
    this.serverListen();
  }

  initRoutes() {
    this.routes = [...questionRouter];
  }

  initServer() {
    this.server = http.createServer(this.serverCallback.bind(this));
  }

  async serverCallback(req, res) {
    const handled = this.routes.some(
      ({ method: routeMethod, path: routePath, handler }) => {
        const { method: clientMethod, url: clientPath } = req;
        if (routeMethod === clientMethod && routePath === clientPath) {
          Promise.resolve()
            .then(() => handler(req, res))
            .catch(() => {
              res.statusCode = 500;
              res.end();
            });

          return true;
        }

        return false;
      }
    );

    if (!handled) {
      res.statusCode = 404;
      res.end("Not Found");
    }
  }

  serverListen() {
    this.server.listen(port, () => {
      console.log("Server started listening on port", port);
    });
  }
}

new QuestionServer().start();
