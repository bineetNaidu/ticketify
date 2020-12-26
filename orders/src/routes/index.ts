import { Request, Response, Router } from 'express';
import { requireAuth } from '@bnticketify/commons';
import Order from '../models/Order';

const router = Router();

router.get('/api/orders', requireAuth, async (req: Request, res: Response) => {
  const orders = await Order.find({
    userId: req.currentUser?.id,
  }).populate('ticket');

  res.json(orders);
});

export { router as indexOrderRoute };
