const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobPost',
    required: true
  },

  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  profile: {  // NEW FIELD
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
    required: true
  },

  resume: String,
  coverLetter: String,

  status: {
    type: String,
    enum: ['applied', 'shortlisted', 'interview', 'rejected', 'hired'],
    default: 'applied'
  },

  appliedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('JobApplication', jobApplicationSchema);
