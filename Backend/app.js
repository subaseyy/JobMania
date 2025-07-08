require("dotenv").config(); // Load .env

const express = require("express");
const cors = require("cors"); //
const path = require("path");

const connectDB = require("./configs/db.config");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const jobRoutes = require("./routes/job.routes");
const jobApplicantRoutes = require("./routes/jobApplication.routes");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const allowedOrigins = [
  "http://localhost:3000",
  "https://jobmania.subas.info.np",
  "https://www.jobmania.subas.info.np",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/jobApplications", jobApplicantRoutes);


app.use(
  "/uploads/resumes",
  express.static(path.join(__dirname, "uploads/resumes"))
);

// Root route
app.get("/", (req, res) => {
  res.send("🚀 JobMania API is running");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

module.exports = app;
