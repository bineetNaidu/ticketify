import { Request, Response, Router } from 'express';
import { requireAuth, validateRequest } from '@bnticketify/commons';
import { body } from 'express-validator';

const router = Router();

router.post(
  '/api/tickets',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price').not().isFloat({ gt: 0 }).withMessage('Price is required'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    res.sendStatus(201);
  },
);

export { router as createTicketRoute };
