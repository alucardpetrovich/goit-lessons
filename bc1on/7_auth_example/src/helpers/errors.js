exports.Conflict = class extends Error {
  constructor(message) {
    super(message);
    this.status = 409;
  }
};

exports.NotFound = class extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
  }
};

exports.Forbidden = class extends Error {
  constructor(message) {
    super(message);
    this.status = 403;
  }
};
