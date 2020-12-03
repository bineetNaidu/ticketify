import mongoose from 'mongoose';
import app from './app';

const startTicketsServiceWithMongoDB = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined!!');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined!!');
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('>> Tickets MONGO DB : Connected');
  } catch (e) {
    console.error(e.message);
  }

  app.listen(3000, () =>
    console.log('>>>> Tickets Service Started | PORT: 3000 <<<<'),
  );
};

startTicketsServiceWithMongoDB();
