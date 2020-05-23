import Joi from "@hapi/joi";

export class SendMessageHandler {
  constructor(io, socket) {
    this.eventName = "sendMessage";
    this.io = io;
    this.socket = socket;

    this.socket.on(this.eventName, this.handler.bind(this));
  }

  handler(data) {
    // 1. validate client data +
    // 2. send message to chat room about user joining

    this.validate(data);
    this.io.to(data.chatId).emit("sendMessage", {
      chatId: data.chatId,
      authorId: data.userId,
      message: data.message,
    });
  }

  validate(data) {
    const messageSchema = Joi.object({
      chatId: Joi.string().required(),
      userId: Joi.string().required(),
      message: Joi.string().required(),
    });

    const validationResult = messageSchema.validate(data);
    if (validationResult.error) {
      this.socket.emit("errorMessage", {
        eventName: "sendMessage",
        message: validationResult.error,
      });
    }
  }
}
