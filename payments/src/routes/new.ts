import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  requireAuth,
  validateRequest,
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
  OrderStatus,
} from '@bnticketify/commons';
import Order from '../models/Order';
import stripe from '../stripe';
import Payment from '../models/Payment';
import { PaymentCreatedPublisher } from '../events/publishers/PaymentCreatedPublisher';
import { natsWrapper } from '../NATSWrapper';

const router = express.Router();

router.post(
  '/api/payments',
  requireAuth,
  [body('token').not().isEmpty(), body('orderId').not().isEmpty()],
  validateRequest,
  async (req: Request, res: Response) => {
    const { token, orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      throw new NotFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    if (order.status === OrderStatus.Cancelled) {
      throw new BadRequestError('Cannot pay for an cancelled order');
    }

    const customerCharge = await stripe.charges.create({
      amount: order.price * 100,
      currency: 'inr',
      source: token,
      description: `You purchased a ticket of price ${order.price} USD`,
    });
    const payment = Payment.build({
      orderId,
      stripeId: customerCharge.id,
    });
    await payment.save();

    new PaymentCreatedPublisher(natsWrapper.client).publish({
      id: payment.id,
      orderId: payment.orderId,
      stripeId: payment.stripeId,
    });

    res.status(201).send({ success: true });
  },
);

export { router as createChargeRouter };
