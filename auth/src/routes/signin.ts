import { Request, Response, Router } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import BadRequestError from '../errors/BadRequestError';
import { validateRequest } from '../middlewares/validateRequest';
import User from '../model/User';
import Password from '../utils/Password';

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
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw new BadRequestError('Invalid Creadentials');
    }

    const passwordsMatch = await Password.compare(user.password, password);
    if (!passwordsMatch) throw new BadRequestError('Invalid Creadentials');

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
export { router as signinRouter };
