import { ValidationError } from 'express-validator';

export default class RequestValidationError extends Error {
  constructor(public errors: ValidationError[]) {
    super();

    // only because fo TS and extending build in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
}
