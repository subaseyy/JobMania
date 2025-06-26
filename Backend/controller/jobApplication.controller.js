const JobApplication = require("../models/jobApplication.model");
const Profile = require("../models/profile.model");
const JobPost = require("../models/jobPost.model"); // You need this for updateApplicationStatus

// Get all applications (admin)
exports.getAllApplications = async (req, res) => {
  try {
    const applications = await JobApplication.find()
      .populate("job")
      .populate({
        path: "applicant",
        select: "full_name email role",
      })
      .populate({
        path: "profile",
        model: "Profile",
      });

    return res.status(200).json({
      status: 200,
      message: "All applications fetched",
      data: applications,
    });
  } catch (err) {
    console.error("Error fetching applications:", err);
    res.status(500).json({ status: 500, message: "Server error" });
  }
};

// Get single application by ID (admin)
exports.getApplicationById = async (req, res) => {
  try {
    const application = await JobApplication.findById(req.params.id)
      .populate("job")
      .populate({
        path: "applicant",
        select: "full_name email role",
      })
      .populate({
        path: "profile",
        model: "Profile",
      });
    if (!application)
      return res
        .status(404)
        .json({ status: 404, message: "Application not found" });

    res
      .status(200)
      .json({ status: 200, message: "Application fetched", data: application });
  } catch (err) {
    console.error("Error fetching application:", err);
    res.status(500).json({ status: 500, message: "Server error" });
  }
};

// Update application by ID (admin)
exports.updateApplicationById = async (req, res) => {
  try {
    const application = await JobApplication.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!application)
      return res
        .status(404)
        .json({ status: 404, message: "Application not found" });

    res
      .status(200)
      .json({ status: 200, message: "Application updated", data: application });
  } catch (err) {
    console.error("Error updating application:", err);
    res.status(500).json({ status: 500, message: "Server error" });
  }
};

// Delete application by ID (admin)
exports.deleteApplicationById = async (req, res) => {
  try {
    const application = await JobApplication.findByIdAndDelete(req.params.id);
    if (!application)
      return res
        .status(404)
        .json({ status: 404, message: "Application not found" });

    res
      .status(200)
      .json({ status: 200, message: "Application deleted successfully" });
  } catch (err) {
    console.error("Error deleting application:", err);
    res.status(500).json({ status: 500, message: "Server error" });
  }
};

// Apply to job (user)
exports.applyToJob = async (req, res) => {
  try {
    const userId = req.user.id;
    const { jobId, coverLetter } = req.body;

    // If file was uploaded, store path
    const resumeUrl = req.file
      ? `/uploads/resumes/${req.file.filename}`
      : "no_resume";

    // ... rest same as before ...
    const profile = await Profile.findOne({ user: userId });
    if (!profile) {
      return res
        .status(404)
        .json({ status: 404, message: "User profile not found" });
    }

    const application = new JobApplication({
      applicant: userId,
      job: jobId,
      profile: profile._id,
      resume: resumeUrl,
      coverLetter,
      status: "applied",
    });

    await application.save();

    return res.status(201).json({
      status: 201,
      message: "Application submitted successfully",
      data: application,
    });
  } catch (err) {
    console.error("Error submitting job application:", err);
    res.status(500).json({ status: 500, message: "Server error" });
  }
};

// Get all applications by logged-in user (user)
exports.getMyApplications = async (req, res) => {
  try {
    const userId = req.user.id;
    const applications = await JobApplication.find({
      applicant: userId,
    }).populate("job");

    return res.status(200).json({
      status: 200,
      message: "Your applications fetched",
      data: applications,
    });
  } catch (err) {
    console.error("Error fetching user applications:", err);
    res.status(500).json({ status: 500, message: "Server error" });
  }
};

// PATCH application status (admin/recruiter)
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = [
      "applied",
      "shortlisted",
      "interview",
      "rejected",
      "hired",
    ];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        status: 400,
        message: "Invalid status value",
      });
    }

    const application = await JobApplication.findById(id).populate("job");
    if (!application) {
      return res.status(404).json({
        status: 404,
        message: "Application not found",
      });
    }

    const job = await JobPost.findById(application.job._id);
    if (!job) {
      return res.status(404).json({
        status: 404,
        message: "Associated job post not found",
      });
    }

    // If recruiter, check job ownership
    if (
      req.user.role === "recruiter" &&
      job.employer.toString() !== req.user.id
    ) {
      return res.status(403).json({
        status: 403,
        message: "You are not authorized to update this application",
      });
    }

    application.status = status;
    await application.save();

    return res.status(200).json({
      status: 200,
      message: "Application status updated successfully",
      data: application,
    });
  } catch (err) {
    console.error("Error updating application status:", err);
    return res.status(500).json({
      status: 500,
      message: "Server error while updating status",
    });
  }
};

exports.checkIfApplied = async (req, res) => {
  try {
    const userId = req.user.id;
    const jobId = req.params.jobId;

    const application = await JobApplication.findOne({
      applicant: userId,
      job: jobId,
      status: "applied",
    });

    res.status(200).json({
      applied: !!application,
    });
  } catch (err) {
    console.error("Error checking applied status:", err);
    res.status(500).json({ applied: false, error: "Server error" });
  }
};
// Get all applications for jobs owned by this company
exports.getApplicationsForCompany = async (req, res) => {
  try {
    // Only for company or admin
    if (!["company", "admin"].includes(req.user.role)) {
      return res.status(403).json({ status: 403, message: "Forbidden" });
    }

    // Find all jobs owned by this company
    const jobs = await JobPost.find({ employer: req.user.id });
    const jobIds = jobs.map((j) => j._id);

    // Find all applications for these jobs
    const applications = await JobApplication.find({ job: { $in: jobIds } })
      .populate("job")
      .populate({
        path: "applicant",
        select: "full_name email role",
      })
      .populate({
        path: "profile",
        model: "Profile",
      });

    return res.status(200).json({
      status: 200,
      message: "Applications for company jobs fetched",
      data: applications,
    });
  } catch (err) {
    console.error("Error fetching company applications:", err);
    res.status(500).json({ status: 500, message: "Server error" });
  }
};
