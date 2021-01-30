export class NotFound extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFound";
    this.status = 404;
  }
}
