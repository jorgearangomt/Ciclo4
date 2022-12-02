const request = require('supertest');
const app = require('../../src/server.js');
const mongoose = require('../../src/server.js');
let id;

beforeEach(async () => {
  // Create a new sport to test with
  const res = await request(app)
    .post('/api/v1/sports')
    .send({ name: 'Tennis' });
  id = res.body._id;
  console.log(id);
});

afterEach(async () => {
  // Delete the sport after the test
  await request(app).delete(`/api/v1/sports/${id}`);
});

describe('GET /api/v1/sports', () => {
  it('should return a list of sports', async () => {
    const res = await request(app).get('/api/v1/sports');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});

describe('GET /api/v1/sports/:id', () => {
  it('should return a single sport by id', async () => {
    const res = await request(app).get(`/api/v1/sports/${id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body._id).toEqual(`${id}`);
  });
});

describe('POST /api/v1/sports', () => {
  it('should create a new sport and return it', async () => {
    const res = await request(app)
      .post('/api/v1/sports')
      .send({ name: 'Tennis' });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.name).toEqual('Tennis');
  });
});

describe('PUT /api/v1/sports/:id', () => {
  it('should update an existing sport and return it', async () => {
    const res = await request(app)
      .put(`/api/v1/sports/${id}`)
      .send({ name: 'Updated Sport' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.name).toEqual('Updated Sport');
  });
});

describe('DELETE /api/v1/sports/:id', () => {
  it('should delete an existing sport', async () => {
    const res = await request(app).delete(`/api/v1/sports/${id}`);
    expect(res.statusCode).toEqual(204);
  });
});

//close the app and database connection after all tests are done
afterAll(() => {
  app.close();
});