const chatValidator = require("./chat.validator");
const { ForbiddenError, NotFounError } = require('../helpers/errors.helper');

global.usersByChats = new Map();
global.userChats = new Map();

class ChatConroller {
  constructor() {}

  get joinChat() {
    return this._joinChat.bind(this);
  }

  get sendMessage() {
    return this._sendMessage.bind(this);
  }

  get handleDisconnect() {
    return this._handleDisconnect.bind(this);
  }

  async _joinChat(msg) {
    await chatValidator.joinChat(msg);
    const { userId, chatId } = msg;
    this._addUserToChat(userId, chatId);
    this._sendMessageToChat(userId, chatId, `User ${userId} joined chat`, true);

    return `Successfully connected to chat ${chatId}`;
  }

  async _sendMessage(msg) {
    await chatValidator.sendMessage(msg);
    const { userId, message, chatId } = msg;
    this._sendMessageToChat(userId, chatId, message);

    return `Successfully send message to chat ${chatId}`;
  }

  async _handleDisconnect(socket) {
    const userId = socket.userId;
    if (!userId) {
      return;
    }

    const userChats = global.userChats.get(userId);

    global.socketsByUserId.delete(userId);
    if (!userChats) {
      return;
    }

    userChats.forEach(chatId => {
      this._sendMessageToChat(userId, chatId, `User ${userId} left chat`, true);
      global.usersByChats.get(chatId).delete(userId);
    });
    global.userChats.delete(userId);
  }

  _sendMessageToChat(authorId, chatId, message, isSystem) {
    const usersInChat = global.usersByChats.get(chatId);
    if (!usersInChat) {
      throw new NotFounError(`Chat ${chatId} does not exist`);
    }
    if (!usersInChat.has(authorId)) {
      throw new ForbiddenError("You not belong to this chat");
    }

    let userIdsInChat = usersInChat.keys();
    let userId;
    while ((userId = userIdsInChat.next().value)) {
      if (userId === authorId) {
        continue;
      }

      const userSocket = global.socketsByUserId.get(userId);
      const msgToSend = {
        err: false,
        method: "chat.message",
        data: message
      };
      if ( !isSystem ) {
        msgToSend.userId = authorId;
      }
      userSocket.send(JSON.stringify(msgToSend));
    }
  }

  _addUserToChat(userId, chatId) {
    let usersInChat = global.usersByChats.get(chatId);

    if (!usersInChat) {
      global.usersByChats.set(chatId, new Map());
      usersInChat = global.usersByChats.get(chatId);
    }
    if (usersInChat.has(userId)) {
      throw new ForbiddenError(`User ${userId} is already in chat`);
    }
    usersInChat.set(userId, true);

    if (!global.userChats.has(userId)) {
      global.userChats.set(userId, []);
    }
    global.userChats.get(userId).push(chatId);
  }
}

module.exports = new ChatConroller();
