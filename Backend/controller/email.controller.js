const User = require("../models/user.model");
const { sendOtpEmail } = require("../configs/sendOtpEmail");

exports.changeEmailWithOtp = async (req, res) => {
  const { email } = req.body;
  const userId = req.user.id;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpires = Date.now() + 10 * 60 * 1000;

  user.otp = otp;
  console.log(otp)
  user.otpExpires = otpExpires;
  user.tempEmail = email; // store temporarily
  await user.save();

  await sendOtpEmail(email, otp);

  res.status(200).json({staus: 200, message: "OTP sent to new email" });
};


exports.verifyOtpForEmail = async (req, res) => {
  try {
    const { otp } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user || user.otp !== otp) {
      return res.status(400).json({ status: 400, message: "Invalid OTP" });
    }

    if (Date.now() > user.otpExpires) {
      return res.status(410).json({ status: 410, message: "OTP expired" });
    }

    if (!user.tempEmail) {
      return res.status(422).json({ status: 422, message: "No email to verify" });
    }


    user.email = user.tempEmail;
    user.tempEmail = undefined;
    user.otp = undefined;
    user.otpExpires = undefined;

    await user.save();


    const cookieOptions = {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    res.cookie('email', user.email, cookieOptions);

    return res.status(200).json({ status: 200, message: "Email updated successfully" });

  } catch (err) {
    console.error("OTP verification error:", err);
    return res.status(500).json({ status: 500, message: "Server error during email verification" });
  }
};

