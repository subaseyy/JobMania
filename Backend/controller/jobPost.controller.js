const Job = require("../models/jobPost.model");


// Get all jobs (admin)
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    return res.status(200).json({ status: 200, message: "All jobs fetched", data: jobs });
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).json({ status: 500, message: "Server error" });
  }
};

// Get single job by ID (admin)
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ status: 404, message: "Job not found" });

    res.status(200).json({ status: 200, message: "Job fetched", data: job });
  } catch (err) {
    console.error("Error fetching job:", err);
    res.status(500).json({ status: 500, message: "Server error" });
  }
};

// Update job by ID (admin)
exports.updateJobById = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!job) return res.status(404).json({ status: 404, message: "Job not found" });

    res.status(200).json({ status: 200, message: "Job updated", data: job });
  } catch (err) {
    console.error("Error updating job:", err);
    res.status(500).json({ status: 500, message: "Server error" });
  }
};

// Delete job by ID (admin)
exports.deleteJobById = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ status: 404, message: "Job not found" });

    res.status(200).json({ status: 200, message: "Job deleted successfully" });
  } catch (err) {
    console.error("Error deleting job:", err);
    res.status(500).json({ status: 500, message: "Server error" });
  }
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
      return res.status(404).json({ status: 404, message: "Job not available" });
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
      requirements
    } = req.body;

    if (!title || !company || !description || !location || !type) {
      return res.status(400).json({
        status: 400,
        message: "Title, company, description, location, and type are required"
      });
    }

    const job = new Job({
      employer: req.user.id,  // ✅ Link job to company account
      title,
      company,
      description,
      location,
      type,
      salaryMin,
      salaryMax,
      currency,
      requirements
    });

    await job.save();

    return res.status(201).json({
      status: 201,
      message: "Job posted successfully",
      data: job
    });
  } catch (err) {
    console.error("Error posting job:", err);
    res.status(500).json({ status: 500, message: "Server error" });
  }
};