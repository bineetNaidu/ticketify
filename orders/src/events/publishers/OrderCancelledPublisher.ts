import { Publisher, OrderCancelledEvent, Subjects } from '@bnticketify/commons';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
