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
    const formattedErrors = err.errors.map((e) => ({
      message: e.msg,
      field: e.param,
    }));
    return res.status(400).json({ errors: formattedErrors });
  }

  if (err instanceof DatabaseConnectionError) {
    return res.status(500).json({ errors: [{ message: err.reason }] });
  }

  res.status(400).json({
    errors: [{ message: err.message || 'Something went Wrong' }],
  });
};

export default errorHandler;
