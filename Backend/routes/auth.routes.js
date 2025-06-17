const express = require('express');
const router = express.Router();
const { signup, login, verifyOtp, logout, changePassword } = require('../controller/auth.controller');
const { changeEmailWithOtp, verifyOtpForEmail } = require("../controller/email.controller");
const { protect } = require('../middlewares/auth.middleware');


router.post('/signup', signup);
router.post('/login', login);
router.post('/verify-otp', verifyOtp);
router.post('/logout', logout)
router.post("/change-password", protect, changePassword);
router.post("/change-email", protect, changeEmailWithOtp);
router.post("/verify-email-otp", protect, verifyOtpForEmail);

module.exports = router;
