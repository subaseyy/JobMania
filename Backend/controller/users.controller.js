const User = require("../models/user.model");
const Profile = require("../models/profile.model");

exports.getProfile = async (req, res) => {

try {
    const user = await User.findById(req.user.id).populate("profile");

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }

    const profileData = user.profile ? {
      full_name: user.profile.full_name,
      contact_number: user.profile.contact_number,
      resume_url: user.profile.resume_url,
      profile_picture: user.profile.profile_picture,
      image: user.profile.image,
      skills: user.profile.skills,
      experience: user.profile.experience,
      education: user.profile.education,
      createdAt: user.profile.createdAt,
      updatedAt: user.profile.updatedAt,
    } : null;

    return res.status(200).json({
      status: 200,
      message: "Profile fetched successfully",
      data: {
        user: {
          name: user.name,
          email: user.email,
          role: user.role,
        },
        profile: profileData,
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
    } = req.body;

    const skills = req.body.skills || []; // Array from formData

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }

    let profile = await Profile.findById(user.profile);
    const profile_picture = req.file ? `/uploads/${req.file.filename}` : undefined;

    if (!profile) {
      profile = await Profile.create({
        full_name: full_name || user.name,
        contact_number,
        resume_url,
        profile_picture,
        skills: Array.isArray(skills) ? skills : [skills],
        experience,
        education,
      });
      user.profile = profile._id;
      await user.save();
    } else {
      profile.full_name = full_name || profile.full_name;
      profile.contact_number = contact_number || profile.contact_number;
      profile.resume_url = resume_url || profile.resume_url;
      profile.profile_picture = profile_picture || profile.profile_picture;
      profile.skills = Array.isArray(skills) ? skills : [skills];
      profile.experience = experience || profile.experience;
      profile.education = education || profile.education;

      await profile.save();
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
