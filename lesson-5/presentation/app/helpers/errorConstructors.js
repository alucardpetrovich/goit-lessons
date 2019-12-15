
class ServerError extends Error {
  constructor(name, status, message) {
    super();
    this.name = name;
    this.status = status;
    this.message = message;
    delete this.stack;
  }
}

class NotFoundError extends ServerError {
  constructor(message) {
    super('NotFoundError', 404, message);
  }
}

class ConflictError extends ServerError {
  constructor(message) {
    super('ConflictError', 409, message);
  }
}

class UnauthorizedError extends ServerError {
  constructor(message) {
    super('UnauthorizedError', 401, message);
  }
}

module.exports = {
  NotFoundError,
  ConflictError,
  UnauthorizedError,
};
