const express = require("express");
const router = express.Router();
const {
  getProfile,
  updateProfile,
  getAllProfiles,
  getProfileById,
  updateProfileById,
  deleteProfileById,
  createUserByAdmin,
  updateUserById,
} = require("../controller/users.controller");

const { protect, authorize } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");


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


router.get("/admin/profiles", protect, authorize("admin","company"), getAllProfiles);

router.get("/admin/profile/:id", protect, authorize("admin","company"), getProfileById);

router.put(
  "/admin/profile/:id",
  protect,
  authorize("admin","company"),
  upload.fields([
    { name: "profile_picture", maxCount: 1 },
    { name: "bg_image", maxCount: 1 },
    { name: "logo", maxCount: 1 },
  ]),
  updateProfileById
);

router.delete("/admin/profile/:id", protect, authorize("admin","company"), deleteProfileById);
router.post("/admin/profile/", protect, authorize("admin","company"), createUserByAdmin);
router.put("/admin/user/:id", protect, authorize("admin","company"), updateUserById);

module.exports = router;
