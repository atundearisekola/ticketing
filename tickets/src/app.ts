import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

import {
  errorHandler,
  NotFoundError,
  currentUser,
} from '@znuta-tickets/common';
import { createTicketRouter } from './routes/new';

const app = express();
app.set('trust proxy', true);

app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);
app.use(currentUser);
app.use(createTicketRouter);
app.all('*', () => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
