const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  full_name: {
    type: String,
    required: true,
    trim: true,
  },
  contact_number: {
    type: String,
    // required: true,
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
  image: {
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
  bg_image: {
    type: String,
    trim: true,
  },
  about: {
    type: String,
    trim: true,
  },
  additional_details: {
    email: { type: String, trim: true },
    phone: { type: String, trim: true },
    languages: { type: String, trim: true },
  },
  social_links: {
    instagram: { type: String, trim: true },
    twitter: { type: String, trim: true },
    website: { type: String, trim: true },
  },
  portfolios: [
    {
      title: { type: String, trim: true },
      image: { type: String, trim: true },
    }
  ],
  experiences: [
    {
      company: { type: String, trim: true },
      logo: { type: String, trim: true },
      role: { type: String, trim: true },
      type: { type: String, trim: true },
      location: { type: String, trim: true },
      duration: { type: String, trim: true },
      period: { type: String, trim: true },
      description: { type: String, trim: true },
    }
  ],
  educations: [
    {
      university: { type: String, trim: true },
      logo: { type: String, trim: true },
      degree: { type: String, trim: true },
      duration: { type: String, trim: true },
      description: { type: String, trim: true },
    }
  ]
}, {
  timestamps: true,
});

// Auto-populate full_name from User before save (if needed)
profileSchema.pre('validate', async function (next) {
  if (!this.full_name && this.user) {
    const User = mongoose.model('User');
    const user = await User.findById(this.user);
    if (user && user.name) {
      this.full_name = user.name;
    }
  }
  next();
});

module.exports = mongoose.model('Profile', profileSchema);
