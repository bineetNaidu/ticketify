import { Request, Response, Router } from 'express';

const router = Router();

router.post('/api/tickets', async (req: Request, res: Response) => {
  res.sendStatus(201);
});

export { router as createTicketRoute };
