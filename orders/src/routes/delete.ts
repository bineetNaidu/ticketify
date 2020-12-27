import { Request, Response, Router } from 'express';
import {
  requireAuth,
  OrderStatus,
  NotAuthorizedError,
  NotFoundError,
} from '@bnticketify/commons';
import Order from '../models/Order';
const router = Router();

router.delete(
  '/api/orders/:orderId',
  requireAuth,
  async (req: Request, res: Response) => {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    if (!order) {
      throw new NotFoundError();
    }

    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    order.status = OrderStatus.Cancelled;
    await order.save();

    //! publish an event saying this was cancelled

    res.status(204).json(order);
  },
);

export { router as deleteOrderRoute };
