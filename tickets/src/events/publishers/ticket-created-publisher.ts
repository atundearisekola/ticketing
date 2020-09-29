import { Publisher, TicketCreatedEvent, Subjects } from '@znuta-tickets/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
