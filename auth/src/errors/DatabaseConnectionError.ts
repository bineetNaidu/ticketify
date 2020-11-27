export default class DatabaseConnectionError extends Error {
  reason = 'Error connection on Database';
  constructor() {
    super();

    // only because fo TS and extending build in class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
}
