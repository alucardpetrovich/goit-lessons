class ValidationHelper {
  static validateCreateQuestion(body) {
    let bodyObj;
    try {
      bodyObj = JSON.parse(body);
    } catch (err) {
      return null;
    }

    if (
      typeof bodyObj.question !== "string" ||
      typeof bodyObj.answer !== "string"
    ) {
      return null;
    }

    return bodyObj;
  }
}

module.exports = ValidationHelper;
