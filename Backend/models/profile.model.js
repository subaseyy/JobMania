const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
    trim: true,
  },
  contact_number: {
    type: String,
    required: true,
    trim: true,
  },
  resume_url: {
    type: String,
    trim: true,
  },
  profile_picture: {
    type: String,
    trim: true,
  },
  skills: {
    type: [String],
    default: [],
  },
  experience: {
    type: String,
    trim: true,
  },
  education: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Profile', profileSchema);
