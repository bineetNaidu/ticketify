import express from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';
import errorHandler from './middlewares/errorHandler';
import NotFoundError from './errors/NotFoundError';

//? Routers
import { currentUserRouter } from './routes/currentUser';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';

const app = express();

app.use(express.json());

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
