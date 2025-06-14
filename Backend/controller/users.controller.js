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

    const profile = user.profile;

    return res.status(200).json({
      status: 200,
      message: "Profile fetched successfully",
      data: {
        user: {
          name: user.name,
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

    // === Only update arrays if they are provided ===
    if (Array.isArray(skills)) profile.skills = skills;
    if (Array.isArray(portfolios)) profile.portfolios = portfolios;
    if (Array.isArray(experiences)) profile.experiences = experiences;
    if (Array.isArray(educations)) profile.educations = educations;

    // === Nested objects ===
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

    // Update User name if full_name provided
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

