const request = require("supertest");
const server = require("../../src/server");
const mongoose = require("mongoose");
const Team = require("../../src/database/model/team");
const Sport = require("../../src/database/model/sport");

afterAll(async () => {
  await mongoose.disconnect();
  await server.close();
});

describe("Team Endpoints", () => {
  let sport;
  let team1;
  let team2;
  beforeEach(async () => {
    sport = new Sport({
      _id: new mongoose.Types.ObjectId(),
      name: "Football"
    });
    await sport.save();

    team1 = new Team({
      _id: new mongoose.Types.ObjectId(),
      name: "Barcelona",
      sport: sport
    });

    team2 = new Team({
      _id: new mongoose.Types.ObjectId(),
      name: "Real Madrid",
      sport: sport
    });

    await team1.save();
    await team2.save();
  });

  afterEach(async () => {
    await Team.deleteMany();
    await Sport.deleteMany();
  });

  describe("GET /teams", () => {
    it("should return all teams", async () => {
      const res = await request(server).get("/api/v1/teams");
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body[0].name).toBe(team1.name);
      expect(res.body[0].sport.name).toBe(sport.name);
      expect(res.body[1].name).toBe(team2.name);
      expect(res.body[1].sport.name).toBe(sport.name);
    });
  });
  describe("GET /teams/:teamId", () => {
    it("should return a team by its id", async () => {
      const res = await request(server).get(`/api/v1/teams/${team1._id}`);
      expect(res.status).toBe(200);
      expect(res.body.name).toBe(team1.name);
      expect(res.body.sport.name).toBe(sport.name);
    });

    it("should return a 404 error if team not found", async () => {
      const res = await request(server).get(`/api/v1/teams/${new mongoose.Types.ObjectId()}`);
      expect(res.status).toBe(404);
      expect(res.text).toBe("Team not found");
    });
  });

  describe("POST /teams", () => {
    it("should create a team", async () => {
      const newTeam = {
        name: "Juventus",
        sport: sport
      };
      const res = await request(server).post("/api/v1/teams").send(newTeam);
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('name',newTeam.name);
      expect(res.body).toHaveProperty('sport._id',sport._id.toString());
    });

    it("should return a 404 error if sport not found", async () => {
      const newTeam = {
        name: "Juventus",
        sport: {_id: new mongoose.Types.ObjectId()}
      };
      const res = await request(server).post("/api/v1/teams").send(newTeam);
      expect(res.status).toBe(404);
      expect(res.text).toBe("Sport not found");
    });
    it("should return a 400 error if data is invalid", async () => {
      const newTeam = {
        name: "J3",
        sport: sport
      };
      const res = await request(server).post("/api/v1/teams").send(newTeam);
      expect(res.status).toBe(400);
      expect(res.text).toBe("Invalid team data");
    });
  });

  describe("PUT /teams/:teamId", () => {
    it("should update a team", async () => {
      const updatedTeam = {
        name: "Paris Saint Germain",
        sport: sport
      };
      const res = await request(server).put(`/api/v1/teams/${team1._id}`).send(updatedTeam);
      expect(res.status).toBe(200);
      expect(res.body.name).toBe(updatedTeam.name);
      expect(res.body.sport._id).toBe(sport._id.toString());
      expect(res.body.sport.name).toBe(updatedTeam.sport.name);
    });

    it("should return a 404 error if team not found", async () => {
      const updatedTeam = {
        name: "Paris Saint Germain",
        sport: sport
      };
      const res = await request(server).put(`/api/v1/teams/${new mongoose.Types.ObjectId()}`).send(updatedTeam);
      expect(res.status).toBe(404);
      expect(res.text).toBe("Team not found");
    });
    it("should return a 404 error if sport not found", async () => {
      const updatedTeam = {
        name: "Paris Saint Germain",
        sport: {_id: new mongoose.Types.ObjectId()}
      };
      const res = await request(server).put(`/api/v1/teams/${team1._id}`).send(updatedTeam);
      expect(res.status).toBe(404);
      expect(res.text).toBe("Sport not found");
    });
    it("should return a 400 error if data is invalid", async () => {
      const newTeam = {
        name: "J3",
        sport: sport
      };
      const res = await request(server).put(`/api/v1/teams/${team1._id}`).send(newTeam);
      expect(res.status).toBe(400);
      expect(res.text).toBe("Invalid team data");
    });
  });

  describe("DELETE /teams/:teamId", () => {
    it("should delete a team", async () => {
      const res = await request(server).delete(`/api/v1/teams/${team1._id}`);
      expect(res.status).toBe(204);
      const deletedTeam = await Team.findById(team1._id);
      expect(deletedTeam).toBe(null);
    });

    it("should return a 404 error if team not found", async () => {
      const res = await request(server).delete(`/api/v1/teams/${new mongoose.Types.ObjectId()}`);
      expect(res.status).toBe(404);
      expect(res.text).toBe("Team not found");
    });
  });

});