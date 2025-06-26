const Job = require("../models/jobPost.model");

// Get all jobs (admin)
exports.getAllJobs = async (req, res) => {
  try {
    let filter = {};
    if (req.user.role === "company") {
      filter.employer = req.user.id;
    }
    const jobs = await Job.find(filter);
    return res
      .status(200)
      .json({ status: 200, message: "All jobs fetched", data: jobs });
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).json({ status: 500, message: "Server error" });
  }
};

// Get single job by ID (admin)
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job)
      return res.status(404).json({ status: 404, message: "Job not found" });

    res.status(200).json({ status: 200, message: "Job fetched", data: job });
  } catch (err) {
    console.error("Error fetching job:", err);
    res.status(500).json({ status: 500, message: "Server error" });
  }
};

exports.updateJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job)
      return res.status(404).json({ status: 404, message: "Job not found" });

    // Only allow if admin, or if company and owns the job
    if (
      req.user.role !== "admin" &&
      !(req.user.role === "company" && job.employer.toString() === req.user.id)
    ) {
      return res.status(403).json({ status: 403, message: "Forbidden" });
    }

    const updated = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res
      .status(200)
      .json({ status: 200, message: "Job updated", data: updated });
  } catch (err) {
    res.status(500).json({ status: 500, message: "Server error" });
  }
};

exports.deleteJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job)
      return res.status(404).json({ status: 404, message: "Job not found" });

    // Only allow if admin, or if company and owns the job
    if (
      req.user.role !== "admin" &&
      !(req.user.role === "company" && job.employer.toString() === req.user.id)
    ) {
      return res.status(403).json({ status: 403, message: "Forbidden" });
    }

    await Job.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: 200, message: "Job deleted" });
  } catch (err) {
    res.status(500).json({ status: 500, message: "Server error" });
  }
};

exports.createJobByAdmin = async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      type,
      description,
      salaryMin,
      salaryMax,
      currency,
      requirements,
      employer,
    } = req.body;

    if (!title || !company || !location || !type || !description || !employer) {
      return res.status(400).json({
        status: 400,
        message: "Missing required fields",
      });
    }

    const newJob = await Job.create({
      employer,
      title,
      company,
      location,
      type,
      description,
      salaryMin,
      salaryMax,
      currency,
      requirements,
    });

    res.status(201).json({
      status: 201,
      message: "Job created successfully",
      data: newJob,
    });
  } catch (err) {
    console.error("Error creating job:", err);
    res.status(500).json({ status: 500, message: "Server error" });
  }
};

exports.updateJobStatus = async (req, res) => {
  const { id } = req.params;
  const { isActive } = req.body;

  const job = await Job.findById(id);
  if (!job) return res.status(404).json({ message: "Job not found" });

  job.isActive = isActive;
  await job.save();

  res.status(200).json({ message: `Job status updated`, data: job });
};

// Get all active jobs (for users)
exports.getPublicJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ isActive: true });
    return res.status(200).json({
      status: 200,
      message: "Available jobs fetched successfully",
      data: jobs,
    });
  } catch (err) {
    console.error("Error fetching jobs for users:", err);
    res.status(500).json({ status: 500, message: "Server error" });
  }
};

// Get one job details (public)
exports.getJobDetails = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job || !job.isActive) {
      return res
        .status(404)
        .json({ status: 404, message: "Job not available" });
    }

    return res.status(200).json({
      status: 200,
      message: "Job details fetched",
      data: job,
    });
  } catch (err) {
    console.error("Error fetching job details:", err);
    res.status(500).json({ status: 500, message: "Server error" });
  }
};

exports.createJobPost = async (req, res) => {
  try {
    const {
      title,
      company,
      description,
      location,
      type,
      salaryMin,
      salaryMax,
      currency,
      requirements,
    } = req.body;

    if (!title || !company || !description || !location || !type) {
      return res.status(400).json({
        status: 400,
        message: "Title, company, description, location, and type are required",
      });
    }

    const job = new Job({
      employer: req.user.id, // ✅ Link job to company account
      title,
      company,
      description,
      location,
      type,
      salaryMin,
      salaryMax,
      currency,
      requirements,
    });

    await job.save();

    return res.status(201).json({
      status: 201,
      message: "Job posted successfully",
      data: job,
    });
  } catch (err) {
    console.error("Error posting job:", err);
    res.status(500).json({ status: 500, message: "Server error" });
  }
};
