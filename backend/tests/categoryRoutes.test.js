const request = require("supertest");
const express = require("express");
const categoryRoutes = require("../routes/categoryRoutes");
const sequelize = require("../utils/db");

const app = express();
app.use(express.json());
app.use("/api/categories", categoryRoutes);

beforeAll(async () => {
  // Ensure DB is connected before tests run
  await sequelize.sync();
});

afterAll(async () => {
  // Close DB connection to avoid open handles
  await sequelize.close();
});

describe("GET /api/categories", () => {
  it("should return an array of categories", async () => {
    const res = await request(app).get("/api/categories");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
