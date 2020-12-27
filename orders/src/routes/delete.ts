import { Request, Response, Router } from 'express';
import {
  requireAuth,
  OrderStatus,
  NotAuthorizedError,
  NotFoundError,
} from '@bnticketify/commons';
import Order from '../models/Order';
import { OrderCancelledPublisher } from '../events/publishers/OrderCancelledPublisher';
import { natsWrapper } from '../NATSWrapper';

const router = Router();

router.delete(
  '/api/orders/:orderId',
  requireAuth,
  async (req: Request, res: Response) => {
    const { orderId } = req.params;
    const order = await Order.findById(orderId).populate('ticket');
    if (!order) {
      throw new NotFoundError();
    }

    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    order.status = OrderStatus.Cancelled;
    await order.save();

    //! publish an event saying this was cancelled
    new OrderCancelledPublisher(natsWrapper.client).publish({
      id: order.id,
      ticket: {
        id: order.ticket.id,
      },
    });

    res.status(204).json(order);
  },
);

export { router as deleteOrderRoute };
