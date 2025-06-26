const mongoose = require('mongoose');

const jobPostSchema = new mongoose.Schema({
  employer: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },

  title: { 
    type: String, 
    required: true 
  },

  company: { 
    type: String, 
    required: true 
  },
  isActive :{
    type: Boolean,
    default: true, 
    required: true
},

  description: { 
    type: String, 
    required: true 
  },

  location: { 
    type: String, 
    required: true 
  },

  type: { 
    type: String, 
    enum: ['full-time', 'part-time', 'internship', 'contract', 'remote'], 
    required: true 
  },

  salaryMin: { 
    type: Number 
  },

  salaryMax: { 
    type: Number 
  },

  currency: { 
    type: String, 
    default: 'NPR' 
  },

  requirements: [String]

}, { 
  timestamps: true 
});

module.exports = mongoose.model('JobPost', jobPostSchema);
