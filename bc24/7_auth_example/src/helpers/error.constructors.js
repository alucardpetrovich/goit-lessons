export class NotFound extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFound";
    this.status = 404;
  }
}

export class Conflict extends Error {
  constructor(message) {
    super(message);
    this.name = "Conflict";
    this.status = 409;
  }
}

export class Forbidden extends Error {
  constructor(message) {
    super(message);
    this.name = "Forbidden";
    this.status = 403;
  }
}

export class Unauthorized extends Error {
  constructor(message) {
    super(message);
    this.name = "Unauthorized";
    this.status = 401;
  }
}
