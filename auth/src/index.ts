import mongoose from 'mongoose';
import app from './app';

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
