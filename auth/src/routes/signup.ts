import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import User from '../model/User';
import BadRequestError from '../errors/BadRequestError';
import { validateRequest } from '../middlewares/validateRequest';

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
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email in Use');
    }

    const user = User.build({ email, password });
    await user.save();

    const userJwt = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_KEY!,
    );
    req.session = {
      ticketifyJwt: userJwt,
    };

    res.status(201).json(user);
  },
);

export { router as signupRouter };
