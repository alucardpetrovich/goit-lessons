class BaseError extends Error {
  constructor(errorMessage) {
    super();
    this.message = errorMessage;
  }
}

class ValidationError extends BaseError {
  constructor(errorMessage) {
    super(errorMessage);
    this.name = 'ValidationError';
    this.status = 400;
  }
}

class UnauthorizedError extends BaseError {
  constructor(errorMessage) {
    super(errorMessage);
    this.name = 'UnauthorizedError';
    this.status = 401;
  }
}

class ForbiddenError extends BaseError {
  constructor(errorMessage) {
    super(errorMessage);
    this.name = 'ForbiddenError';
    this.status = 403;
  }
}

class NotFoundError extends BaseError {
  constructor(errorMessage) {
    super(errorMessage);
    this.name = 'NotFoundError';
    this.status = 404;
  }
}

module.exports = {
  ValidationError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
};
