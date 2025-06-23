const express = require('express');
const router = express.Router();
const { getJobById, getAllJobs, updateJobById, deleteJobById, getJobDetails, getPublicJobs, createJobPost } = require("../controller/jobPost.controller");
const { protect, authorize } = require('../middlewares/auth.middleware');

router.get("/admin/jobs", protect, authorize("admin"), getAllJobs);
router.get("/admin/jobs/:id", protect, authorize("admin"), getJobById);
router.put("/admin/jobs/:id", protect, authorize("admin"), updateJobById);
router.delete("/admin/jobs/:id", protect, authorize("admin"), deleteJobById);
router.post("/create", protect, authorize("company", "admin"), createJobPost);


router.get("/jobs", getPublicJobs);
router.get("/jobs/:id", getJobDetails);

module.exports = router;
