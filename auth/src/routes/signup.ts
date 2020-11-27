import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import User from '../model/User';
import BadRequestError from '../errors/BadRequestError';
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
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log('^^^ Email in use ^^^');
      throw new BadRequestError('Email in Use');
    }

    const user = User.build({ email, password });
    await user.save();

    res.status(201).json(user);
  },
);

export { router as signupRouter };
