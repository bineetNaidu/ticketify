import express from 'express';
import { errorHandler, NotFoundError } from '@bnticketify/commons';
import cookieSession from 'cookie-session';
import 'express-async-errors';

//? Routers

const app = express();

app.set('trust proxy', true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  }),
);

//! Not found page error
app.all('*', () => {
  throw new NotFoundError();
});

// ! Error Handlers
app.use(errorHandler);

export default app;
