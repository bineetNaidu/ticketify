import { Publisher, Subjects, TicketCreatedEvent } from '@bnticketify/commons';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
