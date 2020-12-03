import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import request from 'supertest';
import app from '../app';

declare global {
  namespace NodeJS {
    interface Global {
      signin(): string[];
    }
  }
}

let mongo: MongoMemoryServer;

beforeAll(async () => {
  process.env.JWT_KEY = 'fadfsvs';
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = () => {
  //?  Build a JWT payload
  const payload = {
    id: 'dasdaeacsv544645',
    email: 'test@test.com',
  };
  //? Create a JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);
  //? Build a session Object { ticketifyJwt: MY_JWT_OBJ }
  const session = { ticketifyJwt: token };
  //? Turn Session into JSON
  const sessJson = JSON.stringify(session);
  //? Take JSON and encode as base64
  const base64 = Buffer.from(sessJson).toString('hex');
  //? return cookie and base64 ecodded data
  return [`express:sess=${base64}`];
};
