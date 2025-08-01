// require("dotenv").config();
// const request = require("supertest");
// const app = require("../app");
// const mongoose = require("mongoose");
// const User = require("../models/user.model");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// beforeAll(async () => {
//   await mongoose.connect(process.env.DB_URL);
// });

// afterAll(async () => {
//   await mongoose.connection.dropDatabase();
//   await mongoose.connection.close();
// });

// beforeEach(async () => {
//   await User.deleteMany({});
// });

// describe("POST /api/auth/signup", () => {
//   test("should return 400 if fields missing", async () => {
//     const res = await request(app).post("/api/auth/signup").send({ email: "a@example.com" });
//     expect(res.statusCode).toBe(400);
//   });

//   test("should return 409 if email already exists", async () => {
//     await User.create({ full_name: "Ram", email: "a@example.com", password: "hashed", role: "jobseeker" });
//     const res = await request(app).post("/api/auth/signup").send({ full_name: "Ram", email: "a@example.com", password: "pass", role: "jobseeker" });
//     expect(res.statusCode).toBe(409);
//   });
// });

// describe("POST /api/auth/verify-otp", () => {
//   test("should return 400 for invalid OTP", async () => {
//     await User.create({ full_name: "John", email: "john@example.com", otp: "123456", otpExpires: Date.now() + 600000 });
//     const res = await request(app).post("/api/auth/verify-otp").send({ email: "john@example.com", otp: "000000" });
//     expect(res.statusCode).toBe(400);
//   });

//   test("should return 410 for expired OTP", async () => {
//     await User.create({ full_name: "Jane", email: "jane@example.com", otp: "111111", otpExpires: Date.now() - 1000 });
//     const res = await request(app).post("/api/auth/verify-otp").send({ email: "jane@example.com", otp: "111111" });
//     expect(res.statusCode).toBe(410);
//   });
// });

// describe("POST /api/auth/login", () => {
//   test("should return 404 if user not found", async () => {
//     const res = await request(app).post("/api/auth/login").send({ email: "nouser@example.com", password: "any" });
//     expect(res.statusCode).toBe(404);
//   });

//   test("should return 403 if not verified", async () => {
//     await User.create({ email: "notverified@example.com", full_name: "Test", password: await bcrypt.hash("pass1234", 10), isVerified: false });
//     const res = await request(app).post("/api/auth/login").send({ email: "notverified@example.com", password: "pass1234" });
//     expect(res.statusCode).toBe(403);
//   });

//   test("should return 401 if password incorrect", async () => {
//     await User.create({ email: "wrongpass@example.com", full_name: "Wrong", password: await bcrypt.hash("correctpass", 10), isVerified: true });
//     const res = await request(app).post("/api/auth/login").send({ email: "wrongpass@example.com", password: "wrong" });
//     expect(res.statusCode).toBe(401);
//   });
// });

// describe("POST /api/auth/logout", () => {
//   test("should logout user and clear cookie", async () => {
//     const res = await request(app).post("/api/auth/logout");
//     expect(res.statusCode).toBe(200);
//     expect(res.body.message).toBe("Logged out successfully");
//   });
// });

// describe("POST /api/auth/change-password", () => {
//   test("should return 401 for incorrect old password", async () => {
//     const user = await User.create({ email: "changepass@example.com", full_name: "Change Me", password: await bcrypt.hash("oldpass", 10), isVerified: true });
//     const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
//     const res = await request(app).post("/api/auth/change-password").set("Authorization", `Bearer ${token}`).send({ oldPassword: "wrongpass", newPassword: "newpass123" });
//     expect(res.statusCode).toBe(401);
//   });

//   describe("POST /api/auth/change-password", () => {
//   test("should change password successfully with correct old password", async () => {
//     const user = await User.create({
//       email: "changepass2@example.com",
//       full_name: "Change Me 2",
//       password: await bcrypt.hash("oldpass2", 10),
//       isVerified: true,
//     });

//     const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);

//     const res = await request(app)
//       .post("/api/auth/change-password")
//       .set("Authorization", `Bearer ${token}`)
//       .send({
//         oldPassword: "oldpass2",
//         newPassword: "newpass456",
//       });

//     expect(res.statusCode).toBe(200);
//     expect(res.body.message).toMatch(/password changed/i);
//   });

//   test("should return 401 if no token provided", async () => {
//     const res = await request(app).post("/api/auth/change-password").send({
//       oldPassword: "any",
//       newPassword: "any",
//     });

//     expect(res.statusCode).toBe(401);
//   });
// });
// });