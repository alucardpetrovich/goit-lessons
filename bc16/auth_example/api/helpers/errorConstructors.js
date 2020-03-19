export class BaseError extends Error {
  constructor(errorMessage) {
    super();
    this.message = errorMessage;
  }
}

export class ValidationError extends BaseError {
  constructor(errorMessage) {
    super(errorMessage);
    this.name = "ValidationError";
    this.status = 400;
  }
}

export class UnauthorizedError extends BaseError {
  constructor(errorMessage) {
    super(errorMessage);
    this.name = "UnauthorizedError";
    this.status = 401;
  }
}

export class ForbiddenError extends BaseError {
  constructor(errorMessage) {
    super(errorMessage);
    this.name = "ForbiddenError";
    this.status = 403;
  }
}

export class ConflictError extends BaseError {
  constructor(errorMessage) {
    super(errorMessage);
    this.name = "ConflictError";
    this.status = 409;
  }
}
