import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

declare global {
  namespace NodeJS {
    interface Global {
      signin(id?: string): string[];
    }
  }
}

jest.mock('../NATSWrapper');

let mongo: MongoMemoryServer;

beforeAll(async () => {
  process.env.JWT_KEY = 'qwerty';
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
  // await mongoose.connection.dropDatabase();
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = (id?: string) => {
  //?  Build a JWT payload
  const payload = {
    id: id || mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com',
  };
  //? Create a JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);
  //? Build a session Object { ticketifyJwt: MY_JWT_OBJ }
  const session = { ticketifyJwt: token };
  //? Turn Session into JSON
  const sessJson = JSON.stringify(session);
  //? Take JSON and encode as base64
  const base64 = Buffer.from(sessJson).toString('base64');
  //? return cookie and base64 ecodded data
  return [`express:sess=${base64}`];
};
