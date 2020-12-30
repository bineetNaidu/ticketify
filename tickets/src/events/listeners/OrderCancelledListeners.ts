import { Subjects, OrderCancelledEvent, Listener } from '@bnticketify/commons';
import { Message } from 'node-nats-streaming';
import Ticket from '../../models/Ticket';
import { TicketUpdatedPublisher } from '../publishers/ticketUpdatedPublisher';
import { queueGroupName } from './queueGroupName';

export class OrderCancelledListeners extends Listener<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
    const ticket = await Ticket.findById(data.ticket.id);
    if (!ticket) {
      throw new Error('Ticket not Found');
    }
    ticket.set({ orderId: undefined });
    await ticket.save();

    new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      price: ticket.price,
      title: ticket.title,
      userId: ticket.userId,
      version: ticket.version,
      orderId: ticket.orderId,
    });

    msg.ack();
  }
}
