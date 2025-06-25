const express = require("express");
const router = express.Router();
const {
  getAllApplications,
  getApplicationById,
  updateApplicationById,
  deleteApplicationById,
  getMyApplications,
  applyToJob,
  updateApplicationStatus,
  checkIfApplied, // <<-- NEW
} = require("../controller/jobApplication.controller");
const { protect, authorize } = require("../middlewares/auth.middleware");

// Admin
router.get(
  "/admin/applications",
  protect,
  authorize("admin"),
  getAllApplications
);
router.get(
  "/admin/applications/:id",
  protect,
  authorize("admin"),
  getApplicationById
);
router.put(
  "/admin/applications/:id",
  protect,
  authorize("admin"),
  updateApplicationById
);
router.delete(
  "/admin/applications/:id",
  protect,
  authorize("admin"),
  deleteApplicationById
);

// User
router.post("/apply", protect, applyToJob);
router.get("/my-applications", protect, getMyApplications);

// Admin/Recruiter
router.patch(
  "/applications/:id/status",
  protect,
  authorize("admin", "recruiter"),
  updateApplicationStatus
);

// ===== NEW: Check if current user applied to a job =====
router.get("/:jobId/check-applied", protect, checkIfApplied);

module.exports = router;
