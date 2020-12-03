import { Request, Response, Router } from 'express';
import { requireAuth } from '@bnticketify/commons';

const router = Router();

router.post(
  '/api/tickets',
  requireAuth,
  async (req: Request, res: Response) => {
    res.sendStatus(201);
  },
);

export { router as createTicketRoute };
