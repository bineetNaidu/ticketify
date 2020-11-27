export default class DatabaseConnectionError extends Error {
  reason: string = 'Error connection on Database';
  statusCode: number = 500;
  constructor() {
    super();

    // only because fo TS and extending build in class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
