import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

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
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
      }

      const { email, password } = req.body;
      console.log('Creating a user....');
      res.status(201).json({ status: 'OK' });
    } catch (e) {}
  },
);

export { router as signupRouter };
