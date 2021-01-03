import { Subjects, PaymentCreatedEvent, Publisher } from '@bnticketify/commons';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
