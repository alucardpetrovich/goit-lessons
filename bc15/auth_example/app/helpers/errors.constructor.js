class AbstractError extends Error {
  constructor(errorName, status, message) {
    super();

    this.name = errorName;
    this.status = status;
    this.message = message;
  }
}

exports.ValidationError = class ValidationError extends AbstractError {
  constructor(message) {
    super("ValidationError", 400, message);
  }
};

exports.ConflictError = class ConflictError extends AbstractError {
  constructor(message) {
    super("ConflictError", 409, message);
  }
};

exports.UnauthorizedError = class UnauthorizedError extends AbstractError {
  constructor(message) {
    super("UnauthorizedError", 401, message);
  }
};
