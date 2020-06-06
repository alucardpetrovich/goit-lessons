class BaseError extends Error {
  constructor(name, status, message) {
    super(message);
    this.name = name;
    this.status = status;
  }
}

export class NotFound extends BaseError {
  constructor(message) {
    super("NotFound", 404, message);
  }
}

export class Conflict extends BaseError {
  constructor(message) {
    super("Conflict", 409, message);
  }
}

export class Unauthorized extends BaseError {
  constructor(message) {
    super("Unauthorized", 401, message);
  }
}
