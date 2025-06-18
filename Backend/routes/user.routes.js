const express = require("express");
const router = express.Router();
const {
  getProfile,
  updateProfile,
  getAllProfiles,
  getProfileById,
  updateProfileById,
  deleteProfileById,
} = require("../controller/users.controller");

const { protect, authorize } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");

// === USER ROUTES ===
router.get("/profile", protect, getProfile);

router.put(
  "/profile",
  protect,
  upload.fields([
    { name: "profile_picture", maxCount: 1 },
    { name: "bg_image", maxCount: 1 },
    { name: "logo", maxCount: 1 },
  ]),
  updateProfile
);


router.get("/admin/profiles", protect, authorize("admin"), getAllProfiles);

router.get("/admin/profile/:id", protect, authorize("admin"), getProfileById);

router.put(
  "/admin/profile/:id",
  protect,
  authorize("admin"),
  upload.fields([
    { name: "profile_picture", maxCount: 1 },
    { name: "bg_image", maxCount: 1 },
    { name: "logo", maxCount: 1 },
  ]),
  updateProfileById
);

router.delete("/admin/profile/:id", protect, authorize("admin"), deleteProfileById);

module.exports = router;
