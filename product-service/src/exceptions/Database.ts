export class DatabaseException extends Error {
  message: string;
  status = 500;
  constructor(message: string) {
    super(message)
    this.message = message
    Object.setPrototypeOf(this, DatabaseException.prototype)
  }
}