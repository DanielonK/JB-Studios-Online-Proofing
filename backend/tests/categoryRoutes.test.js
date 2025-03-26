const request = require("supertest");
const express = require("express");
const categoryRoutes = require("../routes/categoryRoutes");
const Category = require("../models/Category"); // We'll mock this
const app = express();

app.use(express.json());
app.use("/api/categories", categoryRoutes);

// ✅ MOCK the database call
jest.mock("../models/Category");

describe("GET /api/categories", () => {
  it("should return an array of categories", async () => {
    const mockCategories = [
      { id: 1, name: "Portrait", section: "Photography" },
      { id: 2, name: "Editorial", section: "Fashion" },
    ];

    // 👇 Mock the return value of findAll
    Category.findAll.mockResolvedValue(mockCategories);

    const res = await request(app).get("/api/categories");
    
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockCategories);
  });
});
