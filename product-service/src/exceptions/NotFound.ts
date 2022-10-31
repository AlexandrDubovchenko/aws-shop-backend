export class NotFoundException extends Error {
  message = 'Not found';
  status = 404;
  constructor() {
    super('Not found')
    Object.setPrototypeOf(this, NotFoundException.prototype)
  }
}