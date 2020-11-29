import express from 'express';
import errorHandler from './middlewares/errorHandler';
import NotFoundError from './errors/NotFoundError';
import cookieSession from 'cookie-session';
import 'express-async-errors';

//? Routers
import { currentUserRouter } from './routes/currentUser';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';

const app = express();

app.set('trust proxy', true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  }),
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

//! Not found page error
app.all('*', () => {
  throw new NotFoundError();
});

// ! Error Handlers
app.use(errorHandler);

export default app;
