import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from '@bnticketify/commons';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
