const express = require('express');
const router = express.Router();
const {
    getAllApplications,
    getApplicationById,
    updateApplicationById,
    deleteApplicationById,
    getMyApplications,
    applyToJob,
    updateApplicationStatus
} = require("../controller/jobApplication.controller");
const { protect, authorize } = require("../middlewares/auth.middleware");


router.get("/admin/applications", protect, authorize("admin"), getAllApplications);
router.get("/admin/applications/:id", protect, authorize("admin"), getApplicationById);
router.put("/admin/applications/:id", protect, authorize("admin"), updateApplicationById);
router.delete("/admin/applications/:id", protect, authorize("admin"), deleteApplicationById);

router.post("/apply", protect, applyToJob);
router.get("/my-applications", protect, getMyApplications);

router.patch(
    "/applications/:id/status",
    protect,
    authorize("admin", "recruiter"),
    updateApplicationStatus
);

module.exports = router;
