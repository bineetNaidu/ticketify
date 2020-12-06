import { Request, Response, Router } from 'express';
import { NotFoundError } from '@bnticketify/commons';
import Ticket from '../models/Ticket';

const router = Router();

router.get('/api/tickets/:id', async (req: Request, res: Response) => {
  const ticket = await Ticket.findOne({ _id: req.params.id });
  if (!ticket) {
    throw new NotFoundError();
  }
  res.json(ticket);
});

export { router as showTicketsRouter };
