import request from 'supertest';
import app from '../../app';
import mongoose from 'mongoose';

it('return a 404 if the ticket is not found', async () => {
  const id = mongoose.Types.ObjectId().toHexString();
  await request(app).get(`/api/tickets/${id}`).send().expect(404);
});

it('return the ticket if the ticket is found', async () => {
  const title = 'something';
  const price = 20;

  const res = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({ title, price })
    .expect(201);

  const ticketRes = await request(app)
    .get(`/api/tickets/${res.body.id}`)
    .set('Cookie', global.signin())
    .send()
    .expect(200);

  expect(ticketRes.body.title).toEqual(title);
  expect(ticketRes.body.price).toEqual(price);
});
