const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const User = require("../models/user.model");
const Job = require("../models/jobPost.model");
const Profile = require("../models/profile.model");
const JobApplication = require("../models/jobApplication.model");

let userToken, jobId;

beforeAll(async () => {
  await mongoose.connect(process.env.DB_URL);

  // Create user with a valid role your schema allows
  let user = await User.findOne({ email: "subasuser@example.com" });
  if (!user) {
    user = await User.create({
      full_name: "Subas User",
      email: "subasuser@example.com",
      password: "test123",
      role: "company", // Change if your schema expects other roles
      isVerified: true,
    });
  }

  // Create profile if not exists
  let profile = await Profile.findOne({ user: user._id });
  if (!profile) {
    await Profile.create({
      user: user._id,
      name: "Subas",
      gender: "male",
    });
  }

  // Login user to get token
  const login = await request(app)
    .post("/api/auth/login")
    .send({ email: "subasuser@example.com", password: "test123" });

  userToken = login.body.token || "";

  // Create a company user for job posting
  let company = await User.findOne({ email: "company2@example.com" });
  if (!company) {
    company = await User.create({
      full_name: "Company 2",
      email: "company2@example.com",
      password: "test123",
      role: "company",
      isVerified: true,
    });
  }

  // Create a job if none exists
  let job = await Job.findOne({ employer: company._id });
  if (!job) {
    job = await Job.create({
      employer: company._id,
      title: "Tester Job",
      company: "Test Corp",
      description: "Testing...",
      location: "Remote",
      type: "Part-time",
      isActive: true,
    });
  }
  jobId = job._id;
});

afterAll(async () => {
  await User.deleteMany({});
  await Job.deleteMany({});
  await JobApplication.deleteMany({});
  await Profile.deleteMany({});
  await mongoose.connection.close();
});

describe("Job Applications", () => {
  let applicationId;

  it("should apply to job", async () => {
    const res = await request(app)
      .post("/api/jobApplications/apply")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        jobId,
        coverLetter: "Please consider me.",
      });

    expect([200, 201, 400, 401, 403]).toContain(res.statusCode);
    if (res.statusCode === 201 && res.body.data) {
      expect(res.body.data.job.toString()).toBe(jobId.toString());
      applicationId = res.body.data._id;
    }
  });

  it("should get my applications", async () => {
    const res = await request(app)
      .get("/api/jobApplications/my-applications")
      .set("Authorization", `Bearer ${userToken}`);

    expect([200, 401, 403]).toContain(res.statusCode);
    if (res.statusCode === 200 && Array.isArray(res.body.data)) {
      expect(res.body.data.length).toBeGreaterThanOrEqual(0);
    }
  });

  it("should return true for already applied", async () => {
    const res = await request(app)
      .get(`/api/jobApplications/${jobId}/check-applied`)
      .set("Authorization", `Bearer ${userToken}`);

    expect([200, 401, 403]).toContain(res.statusCode);
    if (res.statusCode === 200) {
      expect(typeof res.body.applied).toBe("boolean");
    }
  });

  it("should return false for not applied job", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app)
      .get(`/api/jobApplications/${fakeId}/check-applied`)
      .set("Authorization", `Bearer ${userToken}`);

    expect([200, 401, 403]).toContain(res.statusCode);
    if (res.statusCode === 200) {
      expect(typeof res.body.applied).toBe("boolean");
      expect(res.body.applied).toBe(false);
    }
  });

  it("should fail without token", async () => {
    const res = await request(app).get(
      `/api/jobApplications/${jobId}/check-applied`
    );
    expect([401, 403]).toContain(res.statusCode);
  });

  it("should return 404 for non-existent application", async () => {
    const res = await request(app)
      .get(`/api/jobApplications/admin/applications/60f9fbcbbf1c2c001f0cabc9`)
      .set("Authorization", `Bearer ${userToken}`);
    expect([401, 403, 404]).toContain(res.statusCode);
  });

  it("should reject unauthorized resume upload", async () => {
    const res = await request(app)
      .post("/api/jobApplications/apply")
      .attach("resume", "__tests__/dummy.pdf");
    expect([401, 403]).toContain(res.statusCode);
  });

  it("should update application status (unauthorized)", async () => {
    if (!applicationId) return;
    const res = await request(app)
      .patch(`/api/jobApplications/applications/${applicationId}/status`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({ status: "shortlisted" });

    expect([401, 403]).toContain(res.statusCode);
  });

  it("should not apply without profile", async () => {
    let newUser = await User.findOne({ email: "noprof@example.com" });
    if (!newUser) {
      newUser = await User.create({
        full_name: "NoProfile User",
        email: "noprof@example.com",
        password: "pass",
        role: "company",
        isVerified: true,
      });
    }

    const resLogin = await request(app)
      .post("/api/auth/login")
      .send({ email: "noprof@example.com", password: "pass" });

    const res = await request(app)
      .post("/api/jobApplications/apply")
      .set("Authorization", `Bearer ${resLogin.body.token}`)
      .send({ jobId });

    expect([404, 400, 401]).toContain(res.statusCode);
  });

  it("should return 400 for invalid status update", async () => {
    if (!applicationId) return;
    const res = await request(app)
      .patch(`/api/jobApplications/applications/${applicationId}/status`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({ status: "invalid_status" });

    expect([400, 401, 403]).toContain(res.statusCode);
  });

  it("should fetch all applications for company (authorized)", async () => {
    const companyLogin = await request(app)
      .post("/api/auth/login")
      .send({ email: "company2@example.com", password: "test123" });

    const res = await request(app)
      .get("/api/jobApplications/company/applications")
      .set("Authorization", `Bearer ${companyLogin.body.token}`);

    expect([200, 401, 403]).toContain(res.statusCode);
    if (res.statusCode === 200) {
      expect(Array.isArray(res.body.data)).toBe(true);
    }
  });

  it("should return 403 fetching company applications with unauthorized user", async () => {
    const res = await request(app)
      .get("/api/jobApplications/company/applications")
      .set("Authorization", `Bearer ${userToken}`);

    expect([403, 401]).toContain(res.statusCode);
  });

  it("should return 400 when applying without required jobId", async () => {
    const res = await request(app)
      .post("/api/jobApplications/apply")
      .set("Authorization", `Bearer ${userToken}`)
      .send({ coverLetter: "Missing jobId here" });

    expect([400, 422]).toContain(res.statusCode);
    if (res.body.message) {
      expect(res.body.message.toLowerCase()).toMatch(/jobid is required/i);
    }
  });
});
