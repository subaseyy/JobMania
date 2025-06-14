const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  full_name: {
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
    enum: ['jobseeker', 'company', 'admin'],
    default: 'jobseeker',
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
otp: {
  type: String,
},
otpExpires: {
  type: Date,
},
isVerified: {
  type: Boolean,
  default: false,
},
bg_image: {
  type: String,
  trim: true,
},
title: {
  type: String,
  trim: true,
},
company: {
  type: String,
  trim: true,
},
location: {
  type: String,
  trim: true,
},

}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
