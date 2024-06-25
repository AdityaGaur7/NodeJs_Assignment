const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/userModel');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('User API', () => {
  it('should create a new user', async () => {
    const res = await request(app).post('/api/worko/user').send({
      email: 'test@example.com',
      name: 'Test User',
      age: 30,
      city: 'Test City',
      zipCode: '12345',
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('email', 'test@example.com');
});

it('should fetch all users', async () => {
  const res = await request(app).get('/api/worko/user');
  expect(res.statusCode).toEqual(200);
  expect(res.body).toBeInstanceOf(Array);
});

it('should fetch a user by ID', async () => {
  const user = new User({
    email: 'fetch@example.com',
    name: 'Fetch User',
    age: 25,
    city: 'Fetch City',
    zipCode: '54321',
  });
  await user.save();

  const res = await request(app).get(`/api/worko/user/${user._id}`);
  expect(res.statusCode).toEqual(200);
  expect(res.body).toHaveProperty('email', 'fetch@example.com');
});

it('should update a user', async () => {
  const user = new User({
    email: 'update@example.com',
    name: 'Update User',
    age: 28,
    city: 'Update City',
    zipCode: '67890',
  });
  await user.save();

  const res = await request(app).put(`/api/worko/user/${user._id}`).send({
    name: 'Updated User',
    age: 29,
  });
  expect(res.statusCode).toEqual(200);
  expect(res.body).toHaveProperty('name', 'Updated User');
});

it('should delete a user (soft delete)', async () => {
  const user = new User({
    email: 'delete@example.com',
    name: 'Delete User',
    age: 32,
    city: 'Delete City',
    zipCode: '09876',
  });
  await user.save();

  const res = await request(app).delete(`/api/worko/user/${user._id}`);
  expect(res.statusCode).toEqual(204);

  const deletedUser = await User.findById(user._id);
  expect(deletedUser.isDeleted).toBe(true);
});
});
