import { Request, Response, Router } from 'express';
import Ticket from '../models/Ticket';

const router = Router();

router.get('/api/tickets', async (req: Request, res: Response) => {
  const tickets = await Ticket.find({});
  res.json(tickets);
});

export { router as indexTicketRoute };
