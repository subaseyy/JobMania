// require("dotenv").config();
// const request = require("supertest");
// const app = require("../app");
// const mongoose = require("mongoose");
// const User = require("../models/user.model");
// const Profile = require("../models/profile.model");
// const jwt = require("jsonwebtoken");

// let token, adminToken, user, admin;

// beforeAll(async () => {
//   await mongoose.connect(process.env.DB_URL);

//   await User.deleteMany({});
//   await Profile.deleteMany({});

//   user = await User.create({
//     full_name: "Test User",
//     email: "user@example.com",
//     password: "hashed",
//     role: "jobseeker",
//     isVerified: true,
//   });

//   token = jwt.sign(
//     { id: user._id.toString(), role: user.role },
//     process.env.JWT_SECRET,
//     { expiresIn: "1h" }
//   );

//   admin = await User.create({
//     full_name: "Admin User",
//     email: "admin@example.com",
//     password: "hashed",
//     role: "admin",
//     isVerified: true,
//   });

//   adminToken = jwt.sign(
//     { id: admin._id.toString(), role: admin.role },
//     process.env.JWT_SECRET,
//     { expiresIn: "1h" }
//   );

//   await Profile.create({ user: user._id, full_name: user.full_name });
// });

// afterAll(async () => {
//   await mongoose.connection.dropDatabase();
//   await mongoose.disconnect();
// });

// describe("GET /api/users/profile", () => {
//   it("should fetch profile of authenticated user", async () => {
//     const res = await request(app)
//       .get("/api/users/profile")
//       .set("Authorization", `Bearer ${token}`);

//     expect(res.statusCode).toBe(200);
//     expect(res.body.data.user.email).toBe(user.email);
//   });

//   it("should return 401 if not authenticated", async () => {
//     const res = await request(app).get("/api/users/profile");
//     expect(res.statusCode).toBe(401);
//   });
// });

// describe("PUT /api/users/profile", () => {
//   it("should update profile of authenticated user", async () => {
//     const res = await request(app)
//       .put("/api/users/profile")
//       .set("Authorization", `Bearer ${token}`)
//       .send({
//         full_name: "Updated User",
//         phone: "9800000000",
//       });

//     expect(res.statusCode).toBe(200);
//     expect(res.body.data.full_name).toBe("Updated User");
//     expect(res.body.data.phone).toBe("9800000000");
//   });

//   it("should return 400 if invalid data sent", async () => {
//     const res = await request(app)
//       .put("/api/users/profile")
//       .set("Authorization", `Bearer ${token}`)
//       .send({ full_name: "" });

//     expect(res.statusCode).toBe(400);
//   });
// });

// describe("GET /api/users", () => {
//   it("should fetch all users (admin only)", async () => {
//     const res = await request(app)
//       .get("/api/users")
//       .set("Authorization", `Bearer ${adminToken}`);

//     expect(res.statusCode).toBe(200);
//     expect(Array.isArray(res.body.data)).toBe(true);
//   });

//   it("should return 403 for non-admin users", async () => {
//     const res = await request(app)
//       .get("/api/users")
//       .set("Authorization", `Bearer ${token}`);

//     expect(res.statusCode).toBe(403);
//   });
// });

// describe("GET /api/users/:id", () => {
//   it("should return 404 for non-existing user", async () => {
//     const res = await request(app)
//       .get("/api/users/64d8fc97f1b62f7d9d7c1234")
//       .set("Authorization", `Bearer ${adminToken}`);
//     expect(res.statusCode).toBe(404);
//   });

//   it("should fetch user by ID (admin only)", async () => {
//     const res = await request(app)
//       .get(`/api/users/${user._id}`)
//       .set("Authorization", `Bearer ${adminToken}`);

//     expect(res.statusCode).toBe(200);
//     expect(res.body.data.email).toBe(user.email);
//   });

//   describe("DELETE /api/users/:id", () => {
//   it("should delete user by ID (admin only)", async () => {
//     const newUser = await User.create({
//       full_name: "Delete Me",
//       email: "deleteme@example.com",
//       password: "hashed",
//       role: "jobseeker",
//       isVerified: true,
//     });

//     const res = await request(app)
//       .delete(`/api/users/${newUser._id}`)
//       .set("Authorization", `Bearer ${adminToken}`);

//     expect(res.statusCode).toBe(200);
//     expect(res.body.message).toMatch(/deleted/i);
//   });

//   it("should return 403 if non-admin tries to delete", async () => {
//     const res = await request(app)
//       .delete(`/api/users/${user._id}`)
//       .set("Authorization", `Bearer ${token}`);

//     expect(res.statusCode).toBe(403);
//   });

//   it("should return 404 when deleting non-existent user", async () => {
//     const fakeId = "64d8fc97f1b62f7d9d7c9999";
//     const res = await request(app)
//       .delete(`/api/users/${fakeId}`)
//       .set("Authorization", `Bearer ${adminToken}`);

//     expect(res.statusCode).toBe(404);
//   });
// });

// describe("GET /api/users/profile without profile", () => {
//   it("should return 404 if profile not found", async () => {
//     // Create user without profile
//     const noProfileUser = await User.create({
//       full_name: "No Profile",
//       email: "noprofile@example.com",
//       password: "hashed",
//       role: "jobseeker",
//       isVerified: true,
//     });

//     const noProfileToken = jwt.sign(
//       { id: noProfileUser._id.toString(), role: noProfileUser.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" }
//     );

//     const res = await request(app)
//       .get("/api/users/profile")
//       .set("Authorization", `Bearer ${noProfileToken}`);

//     expect(res.statusCode).toBe(404);
//     expect(res.body.message).toMatch(/profile not found/i);
//   });
// });

// });