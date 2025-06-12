const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ['user', 'company', 'admin'],
    default: 'user',
  },

  companyName: {
    type: String,
    trim: true,
  },

  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
    default: null,
  },

  isVerified: {
    type: Boolean,
    default: false,
  },

}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
