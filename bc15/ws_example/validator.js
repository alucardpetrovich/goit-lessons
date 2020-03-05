const Validator = require("node-validator");

class WsValidator {
  static async validateJoinChat(data) {
    const joinChatRules = Validator.isObject().withRequired(
      "chatId",
      Validator.isString()
    );

    return this._run(joinChatRules, data);
  }

  static async validateSendMessage(data) {
    const sendMessageRules = Validator.isObject()
      .withRequired("chatId", Validator.isString())
      .withRequired("message", Validator.isString());

    return this._run(sendMessageRules, data);
  }

  static async _run(validatorObj, objToValidate) {
    return new Promise((res, rej) => {
      Validator.run(validatorObj, objToValidate, (errCount, errors) => {
        if (!errCount) {
          return res(objToValidate);
        }

        const validationError = new Error(JSON.stringify(errors));
        validationError.status = 400;

        rej(validationError);
      });
    });
  }
}

module.exports = WsValidator;
