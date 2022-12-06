const request = require("supertest");
const server = require("../../src/server");
const mongoose = require("mongoose");
const User = require("../../src/database/model/user");

afterAll(async () => {
  await mongoose.disconnect();
  await server.close();
});

describe("User Endpoints", () => {
  let user1;
  let user2;
  beforeEach(async () => {
    user1 = new User({
      _id: new mongoose.Types.ObjectId(),
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password"
    });

    user2 = new User({
      _id: new mongoose.Types.ObjectId(),
      name: "Jane Doe",
      email: "jane.doe@example.com",
      password: "password"
    });

    await user1.save();
    await user2.save();
  });

  afterEach(async () => {
    await User.deleteMany();
  });

  describe("GET /users", () => {
    it("should return all users", async () => {
      const res = await request(server).get("/api/v1/users");
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body[0].name).toBe(user1.name);
      expect(res.body[0].email).toBe(user1.email);
      expect(res.body[1].name).toBe(user2.name);
      expect(res.body[1].email).toBe(user2.email);
    });
  });
  describe("GET /users/:userId", () => {
    it("should return a user by its id", async () => {
      const res = await request(server).get(`/api/v1/users/${user1._id}`);
      expect(res.status).toBe(200);
      expect(res.body.name).toBe(user1.name);
      expect(res.body.email).toBe(user1.email);
    });

    it("should return a 404 error if user not found", async () => {
      const res = await request(server).get(`/api/v1/users/${new mongoose.Types.ObjectId()}`);
      expect(res.status).toBe(404);
      expect(res.text).toBe("User not found");
    });
  });

  describe("POST /users", () => {
    it("should create a user", async () => {
      const newUser = {
        name: "Bob Smith",
        email: "bob.smith@example.com",
        password: "password"
      };
      const res = await request(server).post("/api/v1/users").send(newUser);
      expect(res.status).toBe(201);
      expect(res.body.name).toBe(newUser.name);
      expect(res.body.email).toBe(newUser.email);
    });

    it("should return a 400 error if email is invalid", async () => {
      const newUser = {
        name: "Bob Smith",
        email: "invalid.email",
        password: "password"
      };
      const res = await request(server).post("/api/v1/users").send(newUser);
      expect(res.status).toBe(400);
      expect(res.text).toBe("Invalid email");
    });
  });

  describe("PUT /users/:userId", () => {
    it("should update a user", async () => {
      const updatedUser = {
        name: "Bob Smith",
        email: "bob.smith@example.com"
      };
      const res = await request(server).put(`/api/v1/users/${user1._id}`).send(updatedUser);
      expect(res.status).toBe(200);
      expect(res.body.name).toBe(updatedUser.name);
      expect(res.body.email).toBe(updatedUser.email);
    });

    it("should return a 404 error if user not found", async () => {
      const updatedUser = {
        name: "Bob Smith",
        email: "bob.smith@example.com"
      };
      const res = await request(server).put(`/api/v1/users/${new mongoose.Types.ObjectId()}`).send(updatedUser);
      expect(res.status).toBe(404);
      expect(res.text).toBe("User not found");
    });

    it("should return a 400 error if email is invalid", async () => {
      const updatedUser = {
        name: "Bob Smith",
        email: "invalid.email"
      };
      const res = await request(server).put(`/api/v1/users/${user1._id}`).send(updatedUser);
      expect(res.status).toBe(400);
      expect(res.text).toBe("Invalid email");
    });
  });

  describe("DELETE /users/:userId", () => {
    it("should delete a user", async () => {
      const res = await request(server).delete(`/api/v1/users/${user1._id}`);
      expect(res.status).toBe(200);
      expect(res.text).toBe("User deleted");
    });

    it("should return a 404 error if user not found", async () => {
      const res = await request(server).delete(`/api/v1/users/${new mongoose.Types.ObjectId()}`);
      expect(res.status).toBe(404);
      expect(res.text).toBe("User not found");
    });
  });
});