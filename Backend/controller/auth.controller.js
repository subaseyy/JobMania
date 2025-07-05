const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const Profile = require('../models/profile.model');
const { sendOtpEmail } = require('../configs/sendOtpEmail');

const JWT_SECRET = process.env.JWT_SECRET;

// SIGNUP
exports.signup = async (req, res) => {
  try {
    const { full_name, email, password, role, companyName } = req.body;
    const existingUser = await User.findOne({ email });

    if (!full_name || !email || !password || !role) {
      return res.status(400).json({ status: 400, message: 'Missing fields' });
    }



    if (existingUser) {
      return res.status(409).json({ status: 409, message: 'Email already in use' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = Date.now() + 10 * 60 * 1000;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      full_name,
      email,
      password: hashedPassword,
      role,
      companyName: role === 'company' ? companyName : full_name,
      otp,
      otpExpires,
      isVerified: false,
    });

    const profile = await Profile.create({
      user: user._id,
      full_name: full_name,
      contact_number: "",
      resume_url: "",
      profile_picture: "",
      skills: [],
      experience: "",
      education: "",
    });



    user.profile = profile._id;
    await user.save();

    await sendOtpEmail(email, otp);

    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const cookieOptions = {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    };

    res.cookie('token', token, cookieOptions);
    res.cookie('role', user.role, { ...cookieOptions, httpOnly: false });
    res.cookie('user_id', user._id.toString(), { ...cookieOptions, httpOnly: false });
    res.cookie('full_name', user.full_name, { ...cookieOptions, httpOnly: false });


    return res.status(201).json({
      status: 201,
      message: 'User registered successfully. Please verify your email using the OTP sent.',
    });

  } catch (err) {
    console.error('Signup error:', err);
    return res.status(500).json({ status: 500, message: 'Server error during signup' });
  }
};

// VERIFY OTP
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (Date.now() > user.otpExpires) {
      return res.status(410).json({ message: 'OTP has expired' });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    const cookieOptions = {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    };

    res.cookie('token', token, cookieOptions);
    res.cookie('role', user.role, { ...cookieOptions, httpOnly: false });
    res.cookie('user_id', user._id.toString(), { ...cookieOptions, httpOnly: false });
    res.cookie('full_name', user.full_name, { ...cookieOptions, httpOnly: false });

    return res.status(200).json({
      message: 'Email verified successfully',
    });



  } catch (err) {
    console.error('OTP verification error:', err);
    return res.status(500).json({ message: 'Server error during OTP verification' });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ status: 404, message: 'User not found' });
    }

    if (!user.isVerified) {
      return res.status(403).json({ status: 403, message: 'Please verify your email before logging in' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ status: 401, message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    const cookieOptions = {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    // Set token cookie
    res.cookie('token', token, cookieOptions);
    res.cookie('role', user.role, { ...cookieOptions, httpOnly: false });
    res.cookie('user_id', user._id.toString(), { ...cookieOptions, httpOnly: false });
    res.cookie('full_name', user.full_name, { ...cookieOptions, httpOnly: false });
    res.cookie('email', user.email, { ...cookieOptions, httpOnly: false });

    return res.status(200).json({
      status: 200,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.full_name,
        email: user.email,
        role: user.role,
      }
    })

  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ status: 500, message: 'Server error during login' });
  }
};




exports.logout = async (req, res) => {
  res.clearCookie('token');
  res.clearCookie('role');
  res.clearCookie('user_id');
  res.clearCookie('name');

  return res.status(200).json({ status: 200, message: 'Logged out successfully' });
};


exports.changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword || newPassword.length < 8) {
      return res.status(400).json({ status: 400, message: "Invalid input data" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ status: 404, message: "User not found" });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ status: 401, message: "Old password is incorrect" });
    }
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();


    return res.status(200).json({ status: 200, message: "Password updated successfully" });
  } catch (err) {
    console.error("Change password error:", err);
    return res.status(500).json({ message: "Server error while changing password" });
  }
};
