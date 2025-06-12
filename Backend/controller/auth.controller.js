const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const JWT_SECRET = process.env.JWT_SECRET;

// ✅ SIGNUP Controller
exports.signup = async (req, res) => {
  try {
    const { name, email, password, role, companyName } = req.body;

    // 409 Conflict - Email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ status: 409, message: 'Email already in use' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      companyName: role === 'company' ? companyName : undefined,
    });

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    // 201 Created
    return res.status(201).json({
      status: 201,
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    console.error('Signup error:', err);
    // 500 Internal Server Error
    return res.status(500).json({ status: 500, message: 'Server error during signup' });
  }
};

// ✅ LOGIN Controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 404 Not Found - User does not exist
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ status: 404, message: 'User not found' });
    }

    // 401 Unauthorized - Password mismatch
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ status: 401, message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    // 200 OK - Successful login
    return res.status(200).json({
      status: 200,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    console.error('Login error:', err);
    // 500 Internal Server Error
    return res.status(500).json({ status: 500, message: 'Server error during login' });
  }
};
