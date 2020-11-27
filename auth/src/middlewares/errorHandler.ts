import { NextFunction, Response, Request } from 'express';
import DatabaseConnectionError from '../errors/DatabaseConnectionError';
import RequestValidationError from '../errors/RequestValidatorError';

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof RequestValidationError) {
    return res.status(err.statusCode).json({ errors: err.serializeErrors() });
  }

  if (err instanceof DatabaseConnectionError) {
    return res.status(err.statusCode).json({ errors: err.serializeErrors() });
  }

  res.status(400).json({
    errors: [{ message: err.message || 'Something went Wrong' }],
  });
};

export default errorHandler;
