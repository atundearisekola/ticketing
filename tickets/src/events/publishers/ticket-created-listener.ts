import { Listener } from '../../../../common/src/event/listener';
import { Message } from 'node-nats-streaming';
import { TicketCreatedEvent } from '../../../../common/src/event/ticket-created-event';
import { Subjects } from '../../../../common/src/event/subjects';

class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  queueGroupName = 'payment-srv';

  onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    console.log('Event data!', data);

    msg.ack();
  }
}
