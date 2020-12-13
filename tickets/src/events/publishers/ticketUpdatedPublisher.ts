import { Publisher, Subjects, TicketUpdatedEvent } from '@bnticketify/commons';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
