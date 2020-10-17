
exports.Conflict = class Conflict extends Error {
  constructor(message) {
    super(message);
    this.status = 409;
  }
}
