const WSS = require('ws').Server;
const WsRouter = require('../helpers/wsRouter.helper');
const chatController = require('./chat.controller');

class ChatRouter extends WsRouter {
  constructor() {
    super();
    
    this.addRoute('chat.joinChat', chatController.joinChat);
    this.addRoute('chat.sendMessage', chatController.sendMessage);

    this.addDisconnectHandler(chatController.handleDisconnect);
  }
}

module.exports = new ChatRouter();
