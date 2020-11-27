import { ValidationError } from 'express-validator';

export default class RequestValidationError extends Error {
  statusCode: number = 500;
  constructor(public errors: ValidationError[]) {
    super();

    // only because fo TS and extending build in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
  serializeErrors() {
    return this.errors.map((e) => ({
      message: e.msg,
      field: e.param,
    }));
  }
}
