const express = require("express");
const router = express.Router();
const { getProfile, updateProfile, updateSocialLinks } = require("../controller/users.controller");
const { protect } = require("../middlewares/auth.middleware"); // assumes JWT middleware
const upload = require("../middlewares/upload.middleware");


router.get("/profile", protect, getProfile);

router.put("/profile", protect, upload.fields([
    {
        name: "profile_picture",
        maxCount: 1
    },
    {
        name: "bg_image",
        maxCount: 1
    },
    {
        name: "logo",
        maxCount: 1
    }
]), updateProfile);


module.exports = router;
