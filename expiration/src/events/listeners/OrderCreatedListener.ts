import { Listener, OrderCreatedEvent, Subjects } from '@bnticketify/commons';
import { Message } from 'node-nats-streaming';
import expirationQueue from '../../queues/expirationQueue';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = 'expiration-service';

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    await expirationQueue.add({
      orderId: data.id,
    });

    msg.ack();
  }
}
