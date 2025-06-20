// const request = require("supertest");
// const app = require("../app");
// const mongoose = require("mongoose");
// const User = require("../models/user.model");
// const Profile = require("../models/profile.model");
// const jwt = require("jsonwebtoken");

// let token, adminToken, user, admin;

// beforeAll(async () => {
//   await mongoose.connect(process.env.MONGO_URL);

//   // Create a normal user
//   user = await User.create({
//     full_name: "Test User",
//     email: "user@example.com",
//     password: "hashed",
//     role: "jobseeker",
//     isVerified: true,
//   });
//   token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);

//   // Create an admin user
//   admin = await User.create({
//     full_name: "Admin User",
//     email: "admin@example.com",
//     password: "hashed",
//     role: "admin",
//     isVerified: true,
//   });
//   adminToken = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET);

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
// });

// describe("PUT /api/users/profile", () => {
//   it("should update the authenticated user profile", async () => {
//     const res = await request(app)
//       .put("/api/users/profile")
//       .set("Authorization", `Bearer ${token}`)
//       .field("full_name", "Updated Name");

//     expect(res.statusCode).toBe(200);
//     expect(res.body.data.profile.full_name).toBe("Updated Name");
//   });
// });

// describe("GET /api/users/admin/profiles", () => {
//   it("should fetch all profiles as admin", async () => {
//     const res = await request(app)
//       .get("/api/users/admin/profiles")
//       .set("Authorization", `Bearer ${adminToken}`);

//     expect(res.statusCode).toBe(200);
//     expect(Array.isArray(res.body.data)).toBe(true);
//   });
// });

// describe("GET /api/users/admin/profile/:id", () => {
//   it("should fetch a specific profile by user ID", async () => {
//     const res = await request(app)
//       .get(`/api/users/admin/profile/${user._id}`)
//       .set("Authorization", `Bearer ${adminToken}`);

//     expect(res.statusCode).toBe(200);
//     expect(res.body.data.user.email).toBe(user.email);
//   });
// });

// describe("PUT /api/users/admin/profile/:id", () => {
//   it("should update a user’s profile by ID as admin", async () => {
//     const res = await request(app)
//       .put(`/api/users/admin/profile/${user._id}`)
//       .set("Authorization", `Bearer ${adminToken}`)
//       .field("title", "Senior Developer");

//     expect(res.statusCode).toBe(200);
//     expect(res.body.data.profile.title).toBe("Senior Developer");
//   });
// });

// describe("DELETE /api/users/admin/profile/:id", () => {
//   it("should delete user and profile by ID", async () => {
//     const tempUser = await User.create({
//       full_name: "Delete Me",
//       email: "deleteme@example.com",
//       password: "hashed",
//       role: "jobseeker",
//       isVerified: true,
//     });
//     await Profile.create({ user: tempUser._id, full_name: tempUser.full_name });

//     const res = await request(app)
//       .delete(`/api/users/admin/profile/${tempUser._id}`)
//       .set("Authorization", `Bearer ${adminToken}`);

//     expect(res.statusCode).toBe(200);
//     expect(res.body.message).toBe("User and profile deleted successfully");
//   });
// });
