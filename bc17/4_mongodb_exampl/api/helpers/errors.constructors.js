exports.UnauthorizedError = class UnauthorizedError extends Error {
  constructor(message) {
    super(message);

    this.status = 401;
  }
};

exports.NotFoundError = class NotFoundError extends Error {
  constructor(message) {
    super(message);

    this.status = 404;
  }
};
