import { Message } from 'node-nats-streaming';
import { Subjects, Listener, TicketCreatedEvent } from '@bnticketify/commons';
import Ticket from '../../models/Ticket';
import { queueGroupName } from './queueGroupName';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    const { id, title, price } = data;
    const ticket = Ticket.build({
      id,
      price,
      title,
    });
    await ticket.save();

    msg.ack();
  }
}
