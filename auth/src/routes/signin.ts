import { Request, Response, Router } from 'express';
import { body, validationResult } from 'express-validator';
import RequestValidationError from '../errors/RequestValidatorError';

const router = Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be Valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must provide a Password!'),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    res.send('OK');
  },
);
export { router as signinRouter };
