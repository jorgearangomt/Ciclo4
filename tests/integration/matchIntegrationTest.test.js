const request = require('supertest');
const server = require('../../src/server');
const mongoose = require('mongoose');
const Match = require('../../src/database/model/match');
const Team = require('../../src/database/model/team');
const User = require('../../src/database/model/user');

afterAll(async () => {
  await mongoose.disconnect();
  await server.close();
});

describe('Match Endpoints', () => {
  let team1;
  let team2;
  let user1;
  let user2;
  let match1;
  let match2;
  beforeEach(async () => {
    team1 = new Team({
      _id: new mongoose.Types.ObjectId(),
      name: 'Team 1',
    });
    team2 = new Team({
      _id: new mongoose.Types.ObjectId(),
      name: 'Team 2',
    });
    user1 = new User({
      _id: new mongoose.Types.ObjectId(),
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password',
    });
    user2 = new User({
      _id: new mongoose.Types.ObjectId(),
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      password: 'password',
    });

    await team1.save();
    await team2.save();
    await user1.save();
    await user2.save();

    match1 = new Match({
      _id: new mongoose.Types.ObjectId(),
      name: 'Match 1',
      date: new Date(),
      home_team: team1._id,
      away_team: team2._id,
      home_score: 1,
      away_score: 0,
      winner: team1._id,
      user: user1._id,
      status: 'completed',
    });
    match2 = new Match({
      _id: new mongoose.Types.ObjectId(),
      name: 'Match 2',
      date: new Date(),
      home_team: team1._id,
      away_team: team2._id,
      home_score: 0,
      away_score: 1,
      winner: team2._id,
      user: user2._id,
      status: 'in progress',
    });

    await match1.save();
    await match2.save();
  });

  afterEach(async () => {
    await Match.deleteMany();
    await Team.deleteMany();
    await User.deleteMany();
  });

  describe('GET /matches', () => {
    it('should return all matches', async () => {
      const res = await request(server).get('/api/v1/matches');
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body[0]).toHaveProperty('name', match1.name);
      expect(res.body[0]).toHaveProperty('home_team.name', team1.name);
      expect(res.body[0]).toHaveProperty('away_team.name', team2.name);
      expect(res.body[0]).toHaveProperty('user.name', user1.name);
      expect(res.body[0]).toHaveProperty('winner.name', team1.name);
      expect(res.body[1]).toHaveProperty('name', match2.name);
      expect(res.body[1]).toHaveProperty('home_team.name', team1.name);
      expect(res.body[1]).toHaveProperty('away_team.name', team2.name);
      expect(res.body[1]).toHaveProperty('user.name', user2.name);
      expect(res.body[1]).toHaveProperty('winner.name', team2.name);
    });
  });

  describe('GET /matches/:matchId', () => {
    it('should return a match by its id', async () => {
      const res = await request(server).get(`/api/v1/matches/${match1._id}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name', match1.name);
      expect(res.body).toHaveProperty('home_team.name', team1.name);
      expect(res.body).toHaveProperty('away_team.name', team2.name);
      expect(res.body).toHaveProperty('user.name', user1.name);
      expect(res.body).toHaveProperty('winner.name', team1.name);
      expect(res.body).toHaveProperty('status', match1.status);
    });

    it('should return a 404 error if match not found', async () => {
      const res = await request(server).get(`/api/v1/matches/${new mongoose.Types.ObjectId()}`);
      expect(res.status).toBe(404);
      expect(res.text).toBe('Match not found');
    });
  });

  describe('POST /matches', () => {
    it('should create a match', async () => {
      const newMatch = {
        name: 'Match 3',
        date: new Date(),
        home_team: team1,
        away_team: team2,
        home_score: 1,
        away_score: 0,
        winner: team1,
        user: user1,
        status: 'scheduled',
      };
      const res = await request(server).post('/api/v1/matches').send(newMatch);
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('name', newMatch.name);
      expect(res.body).toHaveProperty('home_team._id', team1._id.toString());
      expect(res.body).toHaveProperty('away_team._id', team2._id.toString());
      expect(res.body).toHaveProperty('user._id', user1._id.toString());
      expect(res.body).toHaveProperty('winner._id', team1._id.toString());
      expect(res.body).toHaveProperty('status', newMatch.status);
    });
    it('should return a 400 error if match name is invalid', async () => {
      const newMatch = {
        name: 'M3',
        date: new Date(),
        home_team: team1,
        away_team: team2,
        home_score: 1,
        away_score: 0,
        winner: team1,
        user: user1,
        status: 'scheduled',
      };
      const res = await request(server).post('/api/v1/matches').send(newMatch);
      expect(res.status).toBe(400);
      expect(res.text).toBe('Invalid match data');
    });
  });

  describe('PUT /matches/:matchId', () => {
    it('should update a match by its id', async () => {
      const newMatchData = {
        name: 'Match 3',
        date: new Date(),
        home_team: team2,
        away_team: team1,
        home_score: 2,
        away_score: 1,
        winner: team2,
        user: user2,
        status: 'scheduled',
      };
      const res = await request(server).put(`/api/v1/matches/${match1._id}`)
        .send(newMatchData);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name', newMatchData.name);
      expect(res.body).toHaveProperty('home_team._id', team2._id.toString());
      expect(res.body).toHaveProperty('away_team._id', team1._id.toString());
      expect(res.body).toHaveProperty('user._id', user2._id.toString());
      expect(res.body).toHaveProperty('winner._id', team2._id.toString());
      expect(res.body).toHaveProperty('home_score', newMatchData.home_score);
      expect(res.body).toHaveProperty('away_score', newMatchData.away_score);
      expect(res.body).toHaveProperty('status', newMatchData.status);
    });
    it('should return an 404 error if match not found', async () => {
      const newMatchData = {
        name: 'Match 3',
        date: new Date(),
        home_team: team2,
        away_team: team1,
        home_score: 2,
        away_score: 1,
        winner: team2,
        user: user2,
        status: 'scheduled',
      };
      const res = await request(server).put(`/api/v1/matches/${new mongoose.Types.ObjectId()}`)
        .send(newMatchData);
      expect(res.status).toBe(404);
      expect(res.text).toBe('Match not found');
    });
  });

  describe('DELETE /matches/:matchId', () => {
    it('should delete a match', async () => {
      const res = await request(server).delete(`/api/v1/matches/${match1._id}`);
      expect(res.status).toBe(200);
      expect(res.text).toBe('Match deleted');
    });
    it('should return a 404 error if match not found', async () => {
      const res = await request(server).delete(`/api/v1/matches/${new mongoose.Types.ObjectId()}`);
      expect(res.status).toBe(404);
      expect(res.text).toBe('Match not found');
    });
  });
});