import express from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';
import errorHandler from './middlewares/errorHandler';
import NotFoundError from './errors/NotFoundError';
import cookieSession from 'cookie-session';

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
    secure: true,
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

const startAuthServiceWithMongoDB = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined!!');
  }
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('>> Auth MONGO DB : Connected');
  } catch (e) {
    console.error(e.message);
  }

  app.listen(3000, () =>
    console.log('>>>> Auth Service Started | PORT: 3000 <<<<'),
  );
};

startAuthServiceWithMongoDB();
