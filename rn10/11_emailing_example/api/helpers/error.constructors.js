export class BaseError extends Error {
  constructor(name, message, status) {
    super(message);
    this.name = name;
    this.status = status;
  }
}

export class NotFound extends BaseError {
  constructor(message) {
    super("NotFoundError", message, 404);
  }
}

export class ConflictError extends BaseError {
  constructor(message) {
    super("ConflictError", message, 409);
  }
}

export class UnauthorizedError extends BaseError {
  constructor(message) {
    super("UnauthorizedError", message, 401);
  }
}
