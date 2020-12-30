import { Listener, OrderCreatedEvent, Subjects } from '@bnticketify/commons';
import { Message } from 'node-nats-streaming';
import Ticket from '../../models/Ticket';
import { TicketUpdatedPublisher } from '../publishers/ticketUpdatedPublisher';
import { queueGroupName } from './queueGroupName';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    //? Find the ticket that the order is reserving
    const ticket = await Ticket.findById(data.ticket.id);

    //? If no ticket, throw error
    if (!ticket) {
      throw new Error('Ticket not found');
    }

    //? Mark the ticket as being reserved by setting its orderId property
    ticket.set({ orderId: data.id });

    //? Save the ticket
    await ticket.save();

    //? Publish an event
    await new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      price: ticket.price,
      title: ticket.title,
      userId: ticket.userId,
      version: ticket.version,
      orderId: ticket.orderId,
    });

    //? ack the message
    msg.ack();
  }
}
