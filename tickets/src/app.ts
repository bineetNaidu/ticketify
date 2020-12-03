import express from 'express';
import { errorHandler, NotFoundError, currentUser } from '@bnticketify/commons';
import cookieSession from 'cookie-session';
import 'express-async-errors';

//? Routers
import { createTicketRoute } from './routes/new';

const app = express();

app.set('trust proxy', true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  }),
);
app.use(currentUser);

app.use(createTicketRoute);

//! Not found page error
app.all('*', () => {
  throw new NotFoundError();
});

// ! Error Handlers
app.use(errorHandler);

export default app;
