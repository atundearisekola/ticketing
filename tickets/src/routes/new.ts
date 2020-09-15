import express, { Request, Response } from 'express';
import { requireAuth, validateRequest } from '@znuta-tickets/common';
import { body } from 'express-validator';
const router = express.Router();
router.post(
  '/api/tickets',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is requires'),
    body('price')
      .isFloat({ gt: 0 })
      .not()
      .isEmpty()
      .withMessage('Price must be greater than 0'),
  ],
  validateRequest,
  (req: Request, res: Response) => {
    res.sendStatus(200);
  }
);

export { router as createTicketRouter };
