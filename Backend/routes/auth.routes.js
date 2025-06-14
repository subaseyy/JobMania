const express = require('express');
const router = express.Router();
const { signup, login, verifyOtp, logout } = require('../controller/auth.controller');

router.post('/signup', signup);
router.post('/login', login);
router.post('/verify-otp', verifyOtp);
router.post('/logout', logout)

module.exports = router;
