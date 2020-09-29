import express, { Request, Response } from 'express';
import { Ticket } from '../models/ticket';
import { NotFoundError } from '@znuta-tickets/common';
const router = express.Router();

router.get('/api/tickets', async (req: Request, res: Response) => {
  const ticket = await Ticket.find({});
  if (!ticket) {
    return new NotFoundError();
  }

  res.send(ticket);
});

export { router as indexTicketRouter };
