import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import DatabaseConnectionError from '../errors/DatabaseConnectionError';
import RequestValidationError from '../errors/RequestValidatorError';

const router = Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 6, max: 24 })
      .withMessage('Password must be between 6 and 20 Characters'),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;
    console.log('Creating a user....');
    throw new DatabaseConnectionError();

    res.status(201).json({ status: 'OK' });
  },
);

export { router as signupRouter };
