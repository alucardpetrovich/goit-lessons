const Validator = require('node-validator');
const ValidatorHelper = require('../helpers/validator.helper');

class ChatValidator {
  constructor() {}

  joinChat(targetObj) {
    const joinChatRules = Validator.isObject()
      .withRequired('userId', Validator.isNumber())
      .withRequired('chatId', Validator.isNumber())
    ;

    return ValidatorHelper.run(joinChatRules, targetObj);
  }

  sendMessage(targetObj) {
    const sendMessageRules = Validator.isObject()
      .withRequired('userId', Validator.isNumber())
      .withRequired('chatId', Validator.isNumber())
      .withRequired('message', Validator.isString())
    ;

    return ValidatorHelper.run(sendMessageRules, targetObj);
  }

}

module.exports = new ChatValidator();
