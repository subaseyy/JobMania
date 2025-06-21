const User = require("../models/user.model");
const Profile = require("../models/profile.model");
const bcrypt = require('bcryptjs');
const profileModel = require("../models/profile.model");



exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }

    const profile = user.profile;

    return res.status(200).json({
      status: 200,
      message: "Profile fetched successfully",
      data: {
        user: {
          full_name: user.full_name,
          email: user.email,
          role: user.role,
        },
        profile,
      },
    });
  } catch (err) {
    console.error("Error fetching profile:", err);
    return res.status(500).json({
      status: 500,
      message: "Server error while fetching profile",
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      full_name,
      contact_number,
      resume_url,
      experience,
      education,
      title,
      company,
      location,
      bg_image,
      about,
      additional_details,
      social_links,
      skills,
      portfolios,
      experiences,
      educations,
    } = req.body;

    const profile_picture = req.file ? `/uploads/${req.file.filename}` : undefined;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }

    let profile = await Profile.findOne({ user: userId });
    if (!profile) {
      profile = new Profile({ user: userId });
    }

    // === Core Field Updates ===
    profile.full_name = full_name || profile.full_name || user.full_name;
    profile.contact_number = contact_number || profile.contact_number;
    profile.resume_url = resume_url || profile.resume_url;
    profile.profile_picture = profile_picture || profile.profile_picture;
    profile.experience = experience || profile.experience;
    profile.education = education || profile.education;
    profile.title = title || profile.title;
    profile.company = company || profile.company;
    profile.location = location || profile.location;
    profile.bg_image = bg_image || profile.bg_image;
    profile.about = about || profile.about;


    if (Array.isArray(skills)) profile.skills = skills;
    if (Array.isArray(portfolios)) profile.portfolios = portfolios;
    if (Array.isArray(experiences)) profile.experiences = experiences;
    if (Array.isArray(educations)) profile.educations = educations;


    if (additional_details) {
      profile.additional_details = {
        ...profile.additional_details,
        ...additional_details,
      };
    }

    if (social_links) {
      profile.social_links = {
        ...profile.social_links,
        ...social_links,
      };
    }


    if (full_name) {
      user.full_name = full_name;
      await user.save();
    }

    await profile.save();

    if (!user.profile) {
      user.profile = profile._id;
      await user.save();
    }

    return res.status(200).json({
      status: 200,
      message: "Profile updated successfully",
      data: { profile },
    });
  } catch (err) {
    console.error("Profile update error:", err);
    return res.status(500).json({
      status: 500,
      message: "Server error during profile update",
    });
  }
};

exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", "full_name email role");
    return res.status(200).json({
      status: 200,
      message: "All profiles fetched successfully",
      data: profiles,
    });
  } catch (err) {
    console.error("Error fetching all profiles:", err);
    return res.status(500).json({
      status: 500,
      message: "Server error while fetching all profiles",
    });
  }
};

exports.getProfileById = async (req, res) => {
  try {
    console.log("hitted getprofile")
    const userId = req.params.id;
    const user = await User.findById(userId).populate("profile");

    if (!user) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }

    return res.status(200).json({
      status: 200,
      message: "Profile fetched successfully",
      data: {
        user: {
          full_name: user.full_name,
          email: user.email,
          role: user.role,
        },
        profile: user.profile,
      },
    });
  } catch (err) {
    console.error("Error fetching profile by ID:", err);
    return res.status(500).json({
      status: 500,
      message: "Server error while fetching profile",
    });
  }
};


exports.updateProfileById = async (req, res) => {
  try {
    const userId = req.params.id;

    const {
      full_name,
      contact_number,
      resume_url,
      experience,
      education,
      title,
      company,
      location,
      bg_image,
      about,
      additional_details,
      social_links,
      skills,
      portfolios,
      experiences,
      educations,
    } = req.body;

    const profile_picture = req.file ? `/uploads/${req.file.filename}` : undefined;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }

    let profile = await Profile.findOne({ user: userId });
    if (!profile) {
      profile = new Profile({ user: userId });
    }

    profile.full_name = full_name || profile.full_name || user.name;
    profile.contact_number = contact_number || profile.contact_number;
    profile.resume_url = resume_url || profile.resume_url;
    profile.profile_picture = profile_picture || profile.profile_picture;
    profile.experience = experience || profile.experience;
    profile.education = education || profile.education;
    profile.title = title || profile.title;
    profile.company = company || profile.company;
    profile.location = location || profile.location;
    profile.bg_image = bg_image || profile.bg_image;
    profile.about = about || profile.about;

    if (Array.isArray(skills)) profile.skills = skills;
    if (Array.isArray(portfolios)) profile.portfolios = portfolios;
    if (Array.isArray(experiences)) profile.experiences = experiences;
    if (Array.isArray(educations)) profile.educations = educations;

    if (additional_details) {
      profile.additional_details = {
        ...profile.additional_details,
        ...additional_details,
      };
    }

    if (social_links) {
      profile.social_links = {
        ...profile.social_links,
        ...social_links,
      };
    }

    if (full_name) {
      user.full_name = full_name;
      await user.save();
    }

    await profile.save();

    if (!user.profile) {
      user.profile = profile._id;
      await user.save();
    }

    return res.status(200).json({
      status: 200,
      message: "Profile updated successfully",
      data: { profile },
    });
  } catch (err) {
    console.error("Admin profile update error:", err);
    return res.status(500).json({
      status: 500,
      message: "Server error during profile update",
    });
  }
};

exports.deleteProfileById = async (req, res) => {
  try {
    const profileId = req.params.id;

    const profile = await Profile.findByIdAndDelete(profileId);
    if (!profile) {
      return res.status(404).json({ status: 404, message: "Profile not found" });
    }

    await User.findOneAndDelete({ profile: profileId });

    return res.status(200).json({
      status: 200,
      message: "User and profile deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting profile:", err);
    return res.status(500).json({
      status: 500,
      message: "Server error while deleting profile",
    });
  }
};


exports.updateUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const { full_name, email, role } = req.body;


    if (!full_name && !email && !role) {
      return res.status(400).json({
        status: 400,
        message: "At least one field (name, email, or role) must be provided",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }

    // Check if the new email is already taken by another user
    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(409).json({
          status: 409,
          message: "Email is already in use by another user",
        });
      }
      user.email = email;
    }

    if (full_name) user.full_name = full_name;
    if (role) user.role = role;

    await user.save();

    return res.status(200).json({
      status: 200,
      message: "User updated successfully",
      data: {
        id: user._id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Error updating user by admin:", err);
    return res.status(500).json({
      status: 500,
      message: "Server error while updating user",
    });
  }
};


exports.createUserByAdmin = async (req, res) => {
  try {
    const { full_name, email, password, role } = req.body;

    if (!full_name || !email || !password) {
      return res.status(400).json({
        status: 400,
        message: "Full name, email, and password are required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        status: 409,
        message: "User with this email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      full_name,
      email,
      password: hashedPassword,
      role: role || "user",
      isVerified: true  // ✅ Mark email as verified automatically
    });

    await user.save();


    const profile = new Profile({ user: user._id, full_name });
    await profile.save();

    user.profile = profile._id;
    await user.save();

    return res.status(201).json({
      status: 201,
      message: "User created successfully",
      data: {
        id: user._id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified
      },
    });
  } catch (err) {
    console.error("Error creating user by admin:", err);
    return res.status(500).json({
      status: 500,
      message: "Server error while creating user",
    });
  }
};
