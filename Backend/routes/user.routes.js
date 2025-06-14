const express = require("express");
const router = express.Router();
const { getProfile, updateProfile } = require("../controller/users.controller");
const { protect } = require("../middlewares/auth.middleware"); // assumes JWT middleware
const upload = require("../middlewares/upload.middleware");


router.get("/profile", protect, getProfile);

router.put("/profile", protect, upload.single("profile_picture"), updateProfile);

module.exports = router;
