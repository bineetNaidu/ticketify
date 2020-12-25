import express from 'express';
import { errorHandler, NotFoundError, currentUser } from '@bnticketify/commons';
import cookieSession from 'cookie-session';
import 'express-async-errors';

//? Routers
import { newOrderRoute } from './routes/new';
import { showOrderRoute } from './routes/show';
import { deleteOrderRoute } from './routes/delete';
import { indexOrderRoute } from './routes';

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

app.use(newOrderRoute);
app.use(showOrderRoute);
app.use(indexOrderRoute);
app.use(deleteOrderRoute);

//! Not found page error
app.all('*', () => {
  throw new NotFoundError();
});

// ! Error Handlers
app.use(errorHandler);

export default app;
