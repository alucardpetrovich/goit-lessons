class BaseError extends Error {
  constructor(errorMessage) {
    super();
    this.message = errorMessage;
  }
}

exports.ValidationError = class ValidationError extends BaseError {
  constructor(errorMessage) {
    super(errorMessage);
    this.name = "ValidationError";
    this.status = 400;
  }
};

exports.UnauthorizedError = class UnauthorizedError extends BaseError {
  constructor(errorMessage) {
    super(errorMessage);
    this.name = "UnauthorizedError";
    this.status = 401;
  }
};

exports.ForbiddenError = class ForbiddenError extends BaseError {
  constructor(errorMessage) {
    super(errorMessage);
    this.name = "ForbiddenError";
    this.status = 403;
  }
};

exports.ConflictError = class ConflictError extends BaseError {
  constructor(errorMessage) {
    super(errorMessage);
    this.name = "ConflictError";
    this.status = 409;
  }
};
