import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';
import mongoose from 'mongoose';

it('returns a 404 if the provided id does not exist', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets${id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'sun moon',
      price: 20,
    })
    .expect(404);
});

it('returns a 401 if the is not authenticated', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets${id}`)

    .send({
      title: 'sun moon',
      price: 20,
    })
    .expect(401);
});

it('returns a 401 if the user does not own a ticket', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  const response = await request(app)
    .post(`/api/tickets`)
    .set('Cookie', global.signin())
    .send({
      title: 'sun moon',
      price: 20,
    });
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'sun moon',
      price: 20,
    })
    .expect(401);
});

it('returns a 404 if the user provide an invalid title or price', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  const cookie = global.signin();
  const response = await request(app)
    .post(`/api/tickets`)
    .set('Cookie', cookie)
    .send({
      title: 'sun moon',
      price: 20,
    });
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: '',
      price: 20,
    })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'pikpl;k;',
      price: -20,
    })
    .expect(400);
});

it('update the ticket provided valid inputs', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  const cookie = global.signin();
  const response = await request(app)
    .post(`/api/tickets`)
    .set('Cookie', cookie)
    .send({
      title: 'sun moon',
      price: 20,
    });
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'new Title',
      price: 200,
    })
    .expect(200);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send();

  expect(ticketResponse.body.title).toEqual('new Title');
  expect(ticketResponse.body.price).toEqual(200);
});
