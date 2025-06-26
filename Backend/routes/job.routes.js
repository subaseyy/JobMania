const express = require("express");
const router = express.Router();
const {
  getJobById,
  getAllJobs,
  updateJobById,
  deleteJobById,
  getJobDetails,
  getPublicJobs,
  createJobPost,
  createJobByAdmin,
  updateJobStatus,
} = require("../controller/jobPost.controller");
const { protect, authorize } = require("../middlewares/auth.middleware");

router.get("/admin/jobs", protect, authorize("company", "admin"), getAllJobs);
router.get(
  "/admin/jobs/:id",
  protect,
  authorize("company", "admin"),
  getJobById
);
router.put(
  "/admin/jobs/:id",
  protect,
  authorize("company", "admin"),
  updateJobById
);
router.delete(
  "/admin/jobs/:id",
  protect,
  authorize("company", "admin"),
  deleteJobById
);
router.post("/create", protect, authorize("company", "admin"), createJobPost);
router.post(
  "/admin/jobs",
  protect,
  authorize("company", "admin"),
  createJobByAdmin
);
// routes/jobRoutes.js
router.patch(
  "/admin/jobs/:id/status",
  protect,
  authorize("company", "admin"),
  updateJobStatus
);

// router.get("/company/jobs", protect, authorize("company"), getCompanyJobs);

router.get("/jobs", getPublicJobs);
router.get("/jobs/:id", getJobDetails);

module.exports = router;
