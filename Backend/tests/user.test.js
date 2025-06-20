const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');


beforeAll(async () => {
  // connect to DB
});

afterAll(async () => {
  await mongoose.connection.close();
});


beforeEach(async () => {
  await User.deleteMany({});
});


describe("POST /api/auth/signup", () => {
  test("should return 400 if required fields are missing", async () => {
    const res = await request(app).post("/api/auth/signup").send({
      email: "ram@example.com",
    });

    expect(res.statusCode).toBe(400); // Your controller might need extra handling for this
  });

  test("should return 409 if email already exists", async () => {
    await User.create({
      full_name: "Ram Shyam",
      email: "duplicate@example.com",
      password: "hashed",
      role: "jobseeker",
      isVerified: true,
    });

    const res = await request(app).post("/api/auth/signup").send({
      full_name: "Ram Shyam",
      email: "duplicate@example.com",
      password: "testpass123",
      role: "jobseeker",
    });

    expect(res.statusCode).toBe(409);
    expect(res.body.message).toBe("Email already in use");
  });
});


describe("POST /api/auth/verify-otp", () => {
  test("should return 400 for invalid OTP", async () => {
    const user = await User.create({
      full_name: "John Doe",
      email: "john@example.com",
      password: "hashed",
      otp: "123456",
      otpExpires: Date.now() + 600000,
    });

    const res = await request(app).post("/api/auth/verify-otp").send({
      email: "john@example.com",
      otp: "000000",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Invalid OTP");
  });

  test("should return 410 for expired OTP", async () => {
    const user = await User.create({
      full_name: "Jane Doe",
      email: "jane@example.com",
      password: "hashed",
      otp: "111111",
      otpExpires: Date.now() - 1000,
    });

    const res = await request(app).post("/api/auth/verify-otp").send({
      email: "jane@example.com",
      otp: "111111",
    });

    expect(res.statusCode).toBe(410);
    expect(res.body.message).toBe("OTP has expired");
  });
});


describe("POST /api/auth/login", () => {
  test("should return 404 if user not found", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "nouser@example.com",
      password: "any",
    });

    expect(res.statusCode).toBe(404);
  });

  test("should return 403 if not verified", async () => {
    const user = await User.create({
      email: "unverified@example.com",
      full_name: "Test User",
      password: await bcrypt.hash("pass1234", 10),
      isVerified: false,
    });

    const res = await request(app).post("/api/auth/login").send({
      email: "unverified@example.com",
      password: "pass1234",
    });

    expect(res.statusCode).toBe(403);
  });

  test("should return 401 if password incorrect", async () => {
    const user = await User.create({
      email: "wrongpass@example.com",
      full_name: "Wrong Pass",
      password: await bcrypt.hash("correctpass", 10),
      isVerified: true,
    });

    const res = await request(app).post("/api/auth/login").send({
      email: "wrongpass@example.com",
      password: "wrongpass",
    });

    expect(res.statusCode).toBe(401);
  });
});


describe("POST /api/auth/logout", () => {
  test("should clear cookies and logout", async () => {
    const res = await request(app).post("/api/auth/logout");

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Logged out successfully");
  });
});


describe("POST /api/auth/change-password", () => {
  test("should return 401 for incorrect old password", async () => {
    const user = await User.create({
      email: "changepass@example.com",
      full_name: "Change Me",
      password: await bcrypt.hash("oldpass123", 10),
      isVerified: true,
    });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);

    const res = await request(app)
      .post("/api/auth/change-password")
      .set("Authorization", `Bearer ${token}`)
      .send({
        oldPassword: "wrongpass",
        newPassword: "newpass1234",
      });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Old password is incorrect");
  });
});


