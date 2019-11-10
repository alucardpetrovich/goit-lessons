const WSS = require("ws").Server;

class WsRouter {
  constructor() {
    this._routes = {};
    this._disconnectHandler = null;
  }

  addRoute(method, handler) {
    if (this._routes.method) {
      throw new Error(`Method ${method} was already declared`);
    }
    this._routes[method] = handler;

    return this;
  }

  addDisconnectHandler(handler) {
    this._disconnectHandler = handler;
  }

  registerRouter(path, server) {
    const wss = new WSS({ path, server });

    wss.on("connection", socket => {
      socket.on("message", data => this._process(data, socket));
      if (this._disconnectHandler) {
        socket.on("close", () => this._disconnectHandler(socket));
      }
    });
  }

  async _process(message, socket) {
    const { data, method } = JSON.parse(message);
    const handler = this._routes[method];

    if (!handler) {
      return socket.send(
        JSON.stringify({
          err: true,
          data: `Method name "${method}" does not have handler`
        })
      );
    }
    if (data && data.userId) {
      if (global.socketsByUserId.has(data.userId)) {
        return socket.send(
          JSON.stringify({
            err: true,
            data: `User ${data.userId} already connected`
          })
        );
      }

      global.socketsByUserId.set(data.userId, socket);
      socket.userId = data.userId;
    }

    try {
      const response = await handler(data);
      socket.send(JSON.stringify({ err: false, data: response }));
    } catch (err) {
      console.log(err);
      delete err.stack;
      socket.send(JSON.stringify({ err: true, message: err.message }));
    }
  }
}

module.exports = WsRouter;
