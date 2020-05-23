import Joi from "@hapi/joi";

export class JoinChatHandler {
  constructor(io, socket) {
    this.eventName = "joinChat";
    this.io = io;
    this.socket = socket;

    this.socket.on(this.eventName, this.handler.bind(this));
  }

  handler(data) {
    // 1. validate client data +
    // 2. join user to chat
    // 3. send message to chat room about user joining

    this.validate(data);

    this.socket.join(data.chatId);

    this.io.to(data.chatId).emit("joinChat", {
      message: `User ${data.userId} successfully connected to chat`,
    });
  }

  validate(data) {
    const messageSchema = Joi.object({
      chatId: Joi.string().required(),
      userId: Joi.string().required(),
    });

    const validationResult = messageSchema.validate(data);
    if (validationResult.error) {
      this.socket.emit("errorMessage", {
        eventName: "joinChat",
        message: validationResult.error,
      });
    }
  }
}
