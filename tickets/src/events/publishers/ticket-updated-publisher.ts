import { Publisher, TicketUpdatedEvent, Subjects } from '@znuta-tickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
