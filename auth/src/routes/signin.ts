import { Request, Response, Router } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validateRequest';

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
  validateRequest,
  async (req: Request, res: Response) => {
    res.send('OK');
  },
);
export { router as signinRouter };
